// src/app/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-semibold">Welcome to the Journal</h1>
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <p className="text-xl">
        Welcome, <span className="font-bold">{session.user?.name}</span>!
      </p>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Sign out
      </button>
    </div>
  );
}
