import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DeleteClientWrapper from "@/components/DeleteClientWrapper";

type PageProps = {
  params: {
    id: string;
  };
};

//SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const entry = await prisma.journalEntry.findUnique({
    where: { id: props.params.id },
  });

  if (!entry) return {};

  return {
    title: `Journal Entry – ${new Date(entry.createdAt).toDateString()}`,
    description: entry.summary || entry.content.slice(0, 100),
  };
}

//SSR
export default async function JournalEntryPage({ params }: PageProps) {
  const entry = await prisma.journalEntry.findUnique({
    where: { id: params.id },
  });

  if (!entry) return notFound();

  const affirmations = entry.affirmations ? JSON.parse(entry.affirmations) : [];
  const suggestions = entry.suggestions ? JSON.parse(entry.suggestions) : [];
  const followUps = entry.followUps ? JSON.parse(entry.followUps) : [];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <p className="text-sm text-gray-400">
        {new Date(entry.createdAt).toLocaleString()}
      </p>
      <p className="text-xl mt-4 whitespace-pre-line">{entry.content}</p>

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

          <h3 className="text-md font-semibold text-purple-700 mt-4">
            Follow-Up Questions
          </h3>
          <ul className="list-disc list-inside">
            {followUps.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Link
          href={`/journal/${params.id}/edit`}
          className="inline-block text-sm text-blue-600 hover:underline"
        >
          Edit this entry
        </Link>

        <DeleteClientWrapper id={params.id} />

        <Link
          href="/journal"
          className="inline-block text-sm text-gray-600 hover:underline"
        >
          ← Back to Journal
        </Link>
      </div>
    </div>
  );
}
