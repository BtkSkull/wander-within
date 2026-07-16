import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const payload = await request.json();
    const event = payload.event;

    if (event === "invitee.created") {
      const invitee = payload.payload;

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