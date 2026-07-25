import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validators/contact";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recent = await prisma.contactMessage.findFirst({
      where: {
        email: data.email,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (recent) {
      return NextResponse.json(
        { success: false, error: "You've already submitted recently. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const saved = await prisma.contactMessage.create({ data });

    await sendNotificationEmail({
      subject: `New Contact Message from ${data.name}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "N/A"}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}