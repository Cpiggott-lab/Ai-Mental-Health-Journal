import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "@/lib/prisma";
import ClientJournal from "@/components/ClientJournal";

export default async function JournalPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="text-center mt-10 text-red-600">
        You must be signed in to view your journal.
      </div>
    );
  }

  const entries = await prisma.journalEntry.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  return <ClientJournal entries={entries} />;
}
