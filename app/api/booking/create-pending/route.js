import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const { name, email, phone, service } = await request.json();

    if (!name || !email || !service) {
      return NextResponse.json({ error: "name, email, and service required" }, { status: 400 });
    }

    const user = session?.user?.email
      ? await prisma.user.findUnique({ where: { email: session.user.email } })
      : null;

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        service,
        requestedService: service,
        date: new Date(),
        status: "PENDING",
        userId: user?.id || null,
      },
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}