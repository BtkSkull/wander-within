import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotificationEmail({ subject, html }) {
  try {
    await resend.emails.send({
      from: "Wander Within <onboarding@resend.dev>",
      to: process.env.THERAPIST_EMAIL,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}