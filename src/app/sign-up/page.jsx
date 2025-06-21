"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      router.push("/sign-in"); // Redirect to login page
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-amber-50 px-4">
      <h1 className="text-3xl font-bold mb-4 text-amber-800">Create Account</h1>

      <input
        type="text"
        placeholder="Name"
        className="mb-3 p-2 border rounded w-80"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="mb-3 p-2 border rounded w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-4 p-2 border rounded w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-500"
      >
        Sign Up
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
