import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      email,
      status: { in: ["CONFIRMED", "PENDING"] },
    },
    orderBy: { date: "desc" },
    include: { payment: true },
  });

  return NextResponse.json({ bookings });
}