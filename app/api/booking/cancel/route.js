import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export async function POST(request) {
  try {
    const { bookingId } = await request.json();

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
          body: JSON.stringify({ reason: "Cancelled by client" }),
        });
      }
    }

    let refunded = false;

    if (booking.payment && booking.payment.status === "PAID" && booking.payment.razorpayPaymentId) {
      try {
        await razorpay.payments.refund(booking.payment.razorpayPaymentId, {
          amount: booking.payment.amount,
        });

        await prisma.payment.update({
          where: { id: booking.payment.id },
          data: { status: "REFUNDED" },
        });

        refunded = true;
      } catch (refundError) {
        console.error("Refund failed:", refundError);
      }
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ success: true, refunded });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
  }
}