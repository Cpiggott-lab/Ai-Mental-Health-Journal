import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const content = formData.get("content");

  if (typeof content !== "string") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const entry = await prisma.journalEntry.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!entry || entry.user.email !== session.user.email) {
    return NextResponse.json(
      { error: "Not found or unauthorized" },
      { status: 404 }
    );
  }

  await prisma.journalEntry.update({
    where: { id: params.id },
    data: { content },
  });

  return NextResponse.redirect(new URL(`/journal/${params.id}`, req.url)); // ✅ FIXED
}
