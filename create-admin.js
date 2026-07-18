require("dotenv").config();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("./generated/prisma");
const { PrismaNeon } = require("@prisma/adapter-neon");

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log("Usage: node create-admin.js youremail@example.com yourpassword");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Admin created:", admin.email);
  process.exit(0);
}

main();