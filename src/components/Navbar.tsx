"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AuthButtons from "./AuthButtons";
import { useSession } from "next-auth/react";
import HeartImage from "../../public/journal-Image-logo.png";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="bg-amber-100 border-b border-amber-200 shadow-md px-5 py-1">
      <nav className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl text-amber-800 tracking-wide">
          <strong>Reflectly</strong> AI
        </Link>
        <div className="hidden md:block">
          <Link href="/">
            <img
              src={HeartImage.src}
              alt="Reflectly Logo"
              className="h-10 w-10 rounded-full"
            />
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex items-center space-x-2">
            {session?.user && (
              <li>
                <Link
                  href="/journal"
                  className="text-amber-700 font-medium hover:bg-amber-200 px-4 py-1 rounded-full transition"
                >
                  Journal
                </Link>
              </li>
            )}
          </ul>
          <AuthButtons />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-1 text-amber-700 hover:text-amber-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Nav */}
      {isOpen && (
        <div className="flex justify-center px-1 pb-1 flex-col items-center">
          {session?.user && (
            <Link
              href="/journal"
              onClick={() => setIsOpen(false)}
              className="block text-amber-700 font-medium bg-amber-100 hover:bg-amber-200 px-1 py-1 rounded-md transition"
            >
              Journal
            </Link>
          )}
          <div className="mt-2">
            <AuthButtons />
          </div>
        </div>
      )}
    </header>
  );
}
