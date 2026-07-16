import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validators/newsletter";

export async function POST(request) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Already subscribed" },
        { status: 409 }
      );
    }

    const saved = await prisma.newsletterSubscriber.create({ data });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}