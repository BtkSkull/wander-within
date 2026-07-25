import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const post = await prisma.blogPost.create({
    data: { ...body, slug },
  });

  return NextResponse.json(post);
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...updates } = await request.json();
  const post = await prisma.blogPost.update({
    where: { id },
    data: updates,
  });
  return NextResponse.json(post);
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}