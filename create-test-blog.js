require("dotenv").config();
const { PrismaClient } = require("./generated/prisma");
const { PrismaNeon } = require("@prisma/adapter-neon");

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const post = await prisma.blogPost.create({
    data: {
      title: "5 Ways to Manage Everyday Anxiety",
      slug: "5-ways-to-manage-everyday-anxiety",
      content: "This is a placeholder blog post content for testing purposes.",
      coverImage: "/images/blog/anxiety-tips.jpg",
      published: true,
    },
  });

  console.log("Blog post created:", post.slug);
  process.exit(0);
}

main();