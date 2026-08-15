import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { intakeFormSchema } from "@/lib/validators/intakeForm";

export async function POST(request) {
  try {
    const body = await request.json();

    // Separate Turnstile token from the actual form data
    const { turnstileToken, ...formData } = body;

    // Check that Turnstile token exists
    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification required",
        },
        { status: 400 }
      );
    }

    // Verify Turnstile token with Cloudflare
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const verifyData = await verifyRes.json();

    // Reject request if Cloudflare verification fails
    if (!verifyData.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification failed. Please try again.",
        },
        { status: 400 }
      );
    }

    // Validate only the actual form data
    const data = intakeFormSchema.parse(formData);

    // Prevent duplicate submissions within 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recent = await prisma.intakeForm.findFirst({
      where: {
        email: data.email,
        submittedAt: {
          gte: fiveMinutesAgo,
        },
      },
    });

    if (recent) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You've already submitted recently. Please wait a few minutes.",
        },
        { status: 429 }
      );
    }

    // Save intake form
    const saved = await prisma.intakeForm.create({
      data,
    });

    return NextResponse.json({
      success: true,
      id: saved.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 400 }
    );
  }
}