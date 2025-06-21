"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    // Handle registration
    if (isRegistering) {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        return setError(msg);
      }
    }

    // Then sign in
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/journal");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-amber-800 mb-4">
        {isRegistering ? "Create your account" : "Sign in to Journal"}
      </h1>

      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => signIn("github")}
          className="w-full bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-white text-black border px-4 py-2 rounded hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        <hr className="my-4 border-gray-600" />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500"
        >
          {isRegistering ? "Register" : "Sign In with Credentials"}
        </button>

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-blue-500 underline mt-2"
        >
          {isRegistering
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
