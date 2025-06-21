import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure the entry belongs to the logged-in user
    const entry = await prisma.journalEntry.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!entry || entry.user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Not found or not authorized" },
        { status: 404 }
      );
    }

    await prisma.journalEntry.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Entry deleted" });
  } catch (error) {
    console.error("DELETE /api/journal/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
