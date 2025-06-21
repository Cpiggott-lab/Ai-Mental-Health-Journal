"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className=" text-black   px-3 py-2 rounded hover:bg-red-500"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push("/sign-in")}
      className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500"
    >
      Sign In
    </button>
  );
}
