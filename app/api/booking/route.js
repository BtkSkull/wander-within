import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { date: "desc" },
    include: { payment: true },
  });

  return NextResponse.json(bookings);
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const event = payload.event;

    if (event === "invitee.created") {
      const invitee = payload.payload;
      const email = invitee.email;

      const pending = await prisma.booking.findFirst({
        where: { email, status: "PENDING" },
        orderBy: { createdAt: "desc" },
      });

      if (pending) {
        await prisma.booking.update({
          where: { id: pending.id },
          data: {
            service: invitee.event_type?.name || "General Session",
            date: new Date(invitee.scheduled_event.start_time),
            status: "CONFIRMED",
            calendlyEventId: invitee.uri,
          },
        });
      } else {
        await prisma.booking.create({
          data: {
            name: invitee.name,
            email: invitee.email,
            service: invitee.event_type?.name || "General Session",
            date: new Date(invitee.scheduled_event.start_time),
            status: "CONFIRMED",
            calendlyEventId: invitee.uri,
          },
        });
      }
    }

    if (event === "invitee.canceled") {
      const invitee = payload.payload;
      await prisma.booking.updateMany({
        where: { calendlyEventId: invitee.uri },
        data: { status: "CANCELLED" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Calendly webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}