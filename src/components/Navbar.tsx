"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AuthButtons from "./AuthButtons";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    ...(session?.user ? [{ path: "journal", label: "Journal" }] : []),
    { path: "about", label: "About" },
    { path: "contact", label: "Contact" },
  ];

  return (
    <header className="bg-amber-100 border-b border-amber-200 shadow-md px-5 py-2">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-amber-800 tracking-wide"
        >
          Reflectly AI
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex items-center space-x-2">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={`/${path}`}
                  className="text-amber-700 font-medium hover:bg-amber-200 px-4 py-2 rounded-full transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <AuthButtons />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-amber-700 hover:text-amber-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Nav */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              href={`/${path}`}
              onClick={() => setIsOpen(false)}
              className="block text-amber-700 font-medium bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-md transition"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2">
            <AuthButtons />
          </div>
        </div>
      )}
    </header>
  );
}
