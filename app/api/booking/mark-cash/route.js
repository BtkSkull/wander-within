import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const { bookingId } = await request.json();

  if (!bookingId) {
    return NextResponse.json({ error: "bookingId required" }, { status: 400 });
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { notes: "Client chose to pay in person (cash)" },
  });

  return NextResponse.json({ success: true, booking });
}
