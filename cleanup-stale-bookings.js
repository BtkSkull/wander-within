require("dotenv").config();
const { PrismaClient } = require("./generated/prisma");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { Resend } = require("resend");

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendCancellationEmail(booking) {
  try {
    await resend.emails.send({
      from: "Wander Within <onboarding@resend.dev>",
      to: process.env.THERAPIST_EMAIL,
      subject: `Booking Auto-Cancelled (Unpaid) — ${booking.name}`,
      html: `
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleString()}</p>
        <p>This session was automatically cancelled because payment was not completed within 5 minutes of booking. The slot has been freed up on your calendar.</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send cancellation email:", error);
  }
}

async function main() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const staleBookings = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      calendlyEventId: { not: null },
      createdAt: { lt: fiveMinutesAgo },
      OR: [
        { payment: null },
        { payment: { status: { not: "PAID" } } },
      ],
    },
    include: { payment: true },
  });

  console.log(`Found ${staleBookings.length} stale unpaid booking(s).`);

  for (const booking of staleBookings) {
    try {
      const eventUuid = booking.calendlyEventId
        .split("/scheduled_events/")[1]
        ?.split("/invitees/")[0];

      if (eventUuid) {
        await fetch(`https://api.calendly.com/scheduled_events/${eventUuid}/cancellation`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: "Payment not completed in time" }),
        });
      }

      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "CANCELLED", notes: "Auto-cancelled: payment not completed within 5 minutes" },
      });

      await sendCancellationEmail(booking);

      console.log(`Cancelled stale booking + notified: ${booking.id} (${booking.email})`);
    } catch (error) {
      console.error(`Failed to cancel booking ${booking.id}:`, error.message);
    }
  }

  process.exit(0);
}

main();