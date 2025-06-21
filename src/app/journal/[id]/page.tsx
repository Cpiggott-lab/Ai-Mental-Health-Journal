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
    include: { user: true },
  });

  if (!entry || entry.user.email !== session.user.email) {
    return notFound();
  }

  const affirmations = entry.affirmations ? JSON.parse(entry.affirmations) : [];
  const suggestions = entry.suggestions ? JSON.parse(entry.suggestions) : [];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <p className="text-sm text-gray-400">
        {new Date(entry.createdAt).toLocaleString()}
      </p>

      <p className="text-xl mt-4 whitespace-pre-line">{entry.content}</p>

      {/* AI Analysis Section */}
      {entry.summary && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold text-amber-700 mb-2">
            Mental Health Summary
          </h2>
          <p className="mb-4">{entry.summary}</p>

          <h3 className="text-md font-semibold text-green-700 mb-1">
            Positive Affirmations
          </h3>
          <ul className="list-disc list-inside mb-4">
            {affirmations.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

          <h3 className="text-md font-semibold text-blue-700 mb-1">
            Suggestions to Improve Your Day
          </h3>
          <ul className="list-disc list-inside">
            {suggestions.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={`/journal/${params.id}/edit`}
        className="mt-6 inline-block text-sm text-blue-600 hover:underline"
      >
        Edit this entry
      </Link>
    </div>
  );
}
