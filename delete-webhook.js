require("dotenv").config();

async function main() {
  const webhookId = process.argv[2];

  if (!webhookId) {
    console.log("Usage: node delete-webhook.js WEBHOOK_ID");
    return;
  }

  const response = await fetch(`https://api.calendly.com/webhook_subscriptions/${webhookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
    },
  });

  if (response.status === 204) {
    console.log("Webhook deleted successfully:", webhookId);
  } else {
    const data = await response.json().catch(() => ({}));
    console.log("Delete failed:", response.status, JSON.stringify(data, null, 2));
  }
}

main();