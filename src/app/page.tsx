"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Top Banner */}
      <div className="w-full bg-amber-200  py-2 text-sm text-amber-700 text-center font-medium">
        AI-powered mental health journaling, built for clarity and growth.
      </div>

      {/* Hero Section */}
      <section className="flex flex-col h-[50vh] items-center justify-center px-4 text-center bg-amber-50">
        <h1 className="text-5xl font-bold text-amber-800 mb-4">
          Reflect. Understand. Grow.
        </h1>
        <p className="max-w-xl text-lg text-gray-700 mb-6">
          This journal isn’t just for writing - it helps you understand
          yourself. Get instant summaries, affirmations, and suggestions to
          improve your mental well-being.
        </p>
        {session?.user ? (
          <Link
            href="/journal"
            className="px-6 py-3 bg-amber-600 text-white rounded-full text-lg hover:bg-amber-500 transition"
          >
            Start Journaling
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-amber-600 text-white rounded-full text-lg hover:bg-amber-500 transition"
          >
            To Start Journaling, Register in Seconds
          </Link>
        )}
      </section>

      {/* Why It Works Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Why Use This Journal
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Clarity Through Writing
            </h3>
            <p className="text-gray-700">
              Write freely and reflect on your thoughts. Your entries are
              analyzed with care, not judgment.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insight</h3>
            <p className="text-gray-700">
              Get a meaningful summary of your emotional tone, affirmations to
              lift your mindset, and suggestions to improve your day.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Track Emotional Trends
            </h3>
            <p className="text-gray-700">
              See how your thoughts evolve. Spot patterns, moods, and personal
              progress over time.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
            <p className="text-gray-700">
              Your data stays with you. No ads. No tracking. Just peace of mind
              and personal growth.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
