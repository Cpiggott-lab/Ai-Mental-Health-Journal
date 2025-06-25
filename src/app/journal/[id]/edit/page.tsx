import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function EditJournalEntry({ params }: any) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return notFound();

  const entry = await prisma.journalEntry.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!entry || entry.user.email !== session.user.email) return notFound();

  return (
    <form
      className="max-w-2xl mx-auto py-10 px-4"
      action={`/api/journal/${params.id}/edit`}
      method="POST"
    >
      <textarea
        name="content"
        defaultValue={entry.content}
        rows={10}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-500"
      >
        Save Changes
      </button>
    </form>
  );
}
