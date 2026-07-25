import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request) {
  const { bookingId } = await request.json();

  if (!bookingId) {
    return NextResponse.json({ error: "bookingId required" }, { status: 400 });
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { notes: "Client chose to pay in person (cash)" },
  });

  await sendNotificationEmail({
    subject: `New Booking (Cash on Arrival) — ${booking.name}`,
    html: `
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Service:</strong> ${booking.service}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleString()}</p>
      <p><strong>Payment:</strong> Client will pay in cash at the session.</p>
      <p>Log in to the admin dashboard to view full intake details.</p>
    `,
  });

  return NextResponse.json({ success: true, booking });
}