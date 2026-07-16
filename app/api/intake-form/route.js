import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email";
import { intakeFormSchema } from "@/lib/validators/intakeForm";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = intakeFormSchema.parse(body);

    const saved = await prisma.intakeForm.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });

    await sendNotificationEmail({
      subject: `New Intake Form Submitted — ${data.fullName}`,
      html: `<p>A new client intake form was submitted by <strong>${data.fullName}</strong>. Log in to the admin dashboard to view full details.</p>`,
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