import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consentFormSchema } from "@/lib/validators/consentForm";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = consentFormSchema.parse(body);

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recent = await prisma.consentForm.findFirst({
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

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    const saved = await prisma.consentForm.create({
      data: { ...data, ipAddress },
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