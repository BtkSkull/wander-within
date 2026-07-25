import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { intakeFormSchema } from "@/lib/validators/intakeForm";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = intakeFormSchema.parse(body);

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recent = await prisma.intakeForm.findFirst({
      where: {
        email: data.email,
        submittedAt: { gte: fiveMinutesAgo },
      },
    });

    if (recent) {
      return NextResponse.json(
        { success: false, error: "You've already submitted recently. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const saved = await prisma.intakeForm.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
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