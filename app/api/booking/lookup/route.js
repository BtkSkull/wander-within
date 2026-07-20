import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const since = searchParams.get("since");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const booking = await prisma.booking.findFirst({
    where: {
      email,
      ...(since ? { createdAt: { gte: new Date(Number(since)) } } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { payment: true },
  });

  if (!booking) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({ found: true, booking });
}
