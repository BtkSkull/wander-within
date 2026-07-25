import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookingId } = await request.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking || booking.status !== "CANCELLATION_REQUESTED") {
      return NextResponse.json({ error: "Booking not eligible for this action" }, { status: 400 });
    }

    if (booking.payment) {
      await prisma.payment.update({
        where: { id: booking.payment.id },
        data: { status: "REFUNDED" },
      });
    }

    if (booking.calendlyEventId) {
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
          body: JSON.stringify({ reason: "Refunded manually by admin" }),
        });
      }
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "REFUNDED", notes: "Refunded manually outside the system" },
    });

    await sendNotificationEmail({
      subject: `Refund Marked Complete (Manual) — ${booking.name}`,
      html: `<p>Refund for ${booking.name}'s session on ${new Date(booking.date).toLocaleString()} was marked as manually completed.</p>`,
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Manual refund error:", error);
    return NextResponse.json({ error: "Failed to mark as refunded" }, { status: 500 });
  }
}