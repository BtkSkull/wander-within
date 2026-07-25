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
    const { bookingId, reason } = await request.json();

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking || booking.status !== "CANCELLATION_REQUESTED") {
      return NextResponse.json({ error: "Booking not eligible for this action" }, { status: 400 });
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "REFUND_REJECTED", notes: reason || "Refund request rejected" },
    });

    await sendNotificationEmail({
      subject: `Refund Request Declined — ${booking.name}`,
      html: `<p>The cancellation/refund request for ${booking.name}'s session was reviewed and declined.</p><p>Reason: ${reason || "Not specified"}</p>`,
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Reject refund error:", error);
    return NextResponse.json({ error: "Failed to reject refund" }, { status: 500 });
  }
}