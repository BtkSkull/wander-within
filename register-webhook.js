require("dotenv").config();

async function main() {
  const ngrokUrl = process.argv[2];

  if (!ngrokUrl) {
    console.log("Usage: node register-webhook.js https://your-ngrok-url.ngrok-free.app");
    return;
  }

  const response = await fetch("https://api.calendly.com/webhook_subscriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: `${ngrokUrl}/api/booking`,
      events: ["invitee.created", "invitee.canceled"],
      organization: process.env.CALENDLY_ORG_URI,
      scope: "organization",
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();