"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import dashboardImage from "../../public/Journal-Dashboard.png";
import newEntryImage from "../../public/New-Entry-Transparent background.png";
import journalSummaryImage from "../../public/Journal-Summary-Transparent.png";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Top Banner */}
      <div className="w-full bg-amber-200 py-2 text-sm text-amber-700 text-center font-medium">
        AI-powered mental health journaling, built for clarity and growth.
      </div>

      {/* Hero Section */}
      <section className="flex flex-col h-[70vh] items-center justify-center px-4 text-center bg-amber-50">
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

      {/* Why It Works */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-semibold mb-8 text-center">
          Why Use This Journal
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 text-left mb-8">
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
        </div>
        <div className="grid sm:grid-cols-2 gap-8 text-left">
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

      {/* App Screenshots Showcase */}
      <div className="w-full  py-24 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {/* New Entry */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-5xl font-semibold text-amber-800 mb-4">
                New Entry
              </h3>
              <p className="text-2xl text-gray-700">
                Create a new journal entry using voice or text input. Seamless
                and fast.
              </p>
            </div>
            <img
              src={newEntryImage.src}
              alt="New Entry mobile view"
              className="w-full max-w-lg r"
            />
          </div>

          {/* Journal Dashboard */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2 text-center md:text-right">
              <h3 className="text-5xl font-semibold text-amber-800 mb-4">
                Journal Dashboard
              </h3>
              <p className="text-2xl text-gray-700">
                View your entire journal history, mood trends, and AI insights
                all in one place.
              </p>
            </div>
            <img
              src={dashboardImage.src}
              alt="Dashboard mobile view"
              className="w-full max-w-lg"
            />
          </div>

          {/* Journal Summary */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-5xl font-semibold text-amber-800 mb-4">
                Journal Summary
              </h3>
              <p className="text-2xl text-gray-700">
                After each entry, get an AI-generated summary with affirmations
                and self-care ideas.
              </p>
            </div>
            <img
              src={journalSummaryImage.src}
              alt="Journal Summary mobile view"
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-amber-100 py-12 text-center">
          <h2 className="text-4xl font-semibold mb-4 text-amber-800">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Join our community and take the first step towards better mental
            health.
          </p>
          {session?.user ? (
            <Link
              href="/journal"
              className="px-6 py-3 bg-amber-600 text-white rounded-full text-lg hover:bg-amber-500 transition"
            >
              Go to Journal
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="px-6 py-3 bg-amber-600 text-white rounded-full text-lg hover:bg-amber-500 transition"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
