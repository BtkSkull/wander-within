import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    if (!booking || booking.payment?.status === "PAID") {
      return NextResponse.json({ success: true });
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
          body: JSON.stringify({ reason: "Payment not completed" }),
        });
      }
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED", notes: "Payment popup closed without completing payment" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("cancel-pending error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}