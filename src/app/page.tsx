"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  // LOADING STATE
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-amber-50">
        <p className="text-amber-600 text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  // UNAUTHENTICATED STATE
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 px-6 py-10 space-y-8 text-center">
        <h1 className="text-4xl font-bold text-amber-800 drop-shadow-sm">
          Welcome to the Journal
        </h1>
        <p className="text-amber-700 text-lg max-w-xl">
          Start your mental wellness journey. Sign in to begin journaling and
          receive AI-powered insights tailored to your mood.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => signIn("github")}
            className="px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-all shadow"
          >
            Sign in with GitHub
          </button>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-all shadow"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // AUTHENTICATED STATE
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 px-6 py-10 space-y-8 text-center">
      <h2 className="text-3xl font-semibold text-amber-800 drop-shadow-sm">
        Welcome back, <span className="font-bold">{session.user?.name}</span>!
      </h2>
      <p className="text-amber-700 max-w-xl text-lg">
        Ready to reflect? Add a new journal entry or explore your past insights.
      </p>
      <button
        onClick={() => signOut()}
        className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow"
      >
        Sign out
      </button>
    </div>
  );
}
