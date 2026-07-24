import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { bookingId, reason } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: "bookingId required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (!["CONFIRMED"].includes(booking.status)) {
  return NextResponse.json(
    { error: "This booking cannot be cancelled right now." },
    { status: 400 }
  );
}

if (new Date(booking.date) <= new Date()) {
  return NextResponse.json(
    { error: "This session has already taken place and cannot be cancelled." },
    { status: 400 }
  );
}

    const hoursUntilSession = (new Date(booking.date) - new Date()) / (1000 * 60 * 60);
    const withinWindow = hoursUntilSession >= 24;

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLATION_REQUESTED",
        cancellationReason: reason || null,
        cancellationRequestedAt: new Date(),
      },
    });

    await sendNotificationEmail({
      subject: `Cancellation Requested — ${booking.name}`,
      html: `
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Session Date:</strong> ${new Date(booking.date).toLocaleString()}</p>
        <p><strong>Reason given:</strong> ${reason || "No reason provided"}</p>
        <p><strong>Eligible for refund (24h+ notice):</strong> ${withinWindow ? "Yes" : "No — within 24 hours"}</p>
        <p>Log in to the admin dashboard to approve or reject this refund.</p>
      `,
    });

    return NextResponse.json({ success: true, booking: updated, eligibleForRefund: withinWindow });
  } catch (error) {
    console.error("Cancellation request error:", error);
    return NextResponse.json({ error: "Failed to request cancellation" }, { status: 500 });
  }
}