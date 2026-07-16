import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { bookingId, amount } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing bookingId or amount" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay uses paise, not rupees
      currency: "INR",
      receipt: `booking_${bookingId}`,
    });

    await prisma.payment.upsert({
      where: { bookingId },
      create: {
        bookingId,
        amount: amount * 100,
        currency: "INR",
        status: "CREATED",
        razorpayOrderId: order.id,
      },
      update: {
        amount: amount * 100,
        razorpayOrderId: order.id,
        status: "CREATED",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Payment creation failed" },
      { status: 500 }
    );
  }
}