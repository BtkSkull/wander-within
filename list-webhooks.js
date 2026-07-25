require("dotenv").config();

async function main() {
  const response = await fetch(
    `https://api.calendly.com/webhook_subscriptions?organization=${process.env.CALENDLY_ORG_URI}&scope=organization`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();