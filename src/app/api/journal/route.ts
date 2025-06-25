import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "@/lib/prisma";
import { analyzeJournalEntry } from "@/lib/openai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { content } = await req.json();

  const analysis = await analyzeJournalEntry(content);

  const entry = await prisma.journalEntry.create({
    data: {
      content,
      user: { connect: { email: session.user.email } },
      summary: analysis.summary,
      affirmations: JSON.stringify(analysis.affirmations),
      suggestions: JSON.stringify(analysis.suggestions),
      followUps: JSON.stringify(analysis.followUps),
    },
  });

  return Response.json(entry);
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const entries = await prisma.journalEntry.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(entries);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await req.json();

  const entry = await prisma.journalEntry.deleteMany({
    where: {
      id,
      user: {
        email: session.user.email,
      },
    },
  });

  return Response.json(entry);
}
