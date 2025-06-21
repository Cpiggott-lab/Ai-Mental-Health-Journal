import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SingleJournalEntry({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return notFound();
  }

  const entry = await prisma.journalEntry.findUnique({
    where: { id: params.id },
    include: { user: true }, // ✅ required for email check
  });

  if (!entry || entry.user.email !== session.user.email) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <p className="text-sm text-gray-400">
        {new Date(entry.createdAt).toLocaleString()}
      </p>

      <p className="text-xl mt-4 whitespace-pre-line">{entry.content}</p>

      <Link
        href={`/journal/${params.id}/edit`}
        className="mt-6 inline-block text-sm text-blue-600 hover:underline"
      >
        Edit this entry
      </Link>
    </div>
  );
}
