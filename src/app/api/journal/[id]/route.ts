// src/app/api/journal/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const entry = await prisma.journalEntry.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.journalEntry.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Entry deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
