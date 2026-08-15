import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (email !== session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      email,
      status: { in: ["CONFIRMED", "PENDING", "CANCELLATION_REQUESTED"] },
    },
    orderBy: { date: "desc" },
    include: { payment: true },
  });

  return NextResponse.json({ bookings });
}