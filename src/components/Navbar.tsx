"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = ["about", "journal", "contact"];

  return (
    <header className="bg-amber-100 border-b border-amber-200 shadow-md px-6 py-4">
      <nav className="max-w-10xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-amber-800 tracking-wide"
        >
          Journal
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-2">
          {navLinks.map((path) => (
            <li key={path}>
              <Link
                href={`/${path}`}
                className="text-amber-700 font-medium hover:bg-amber-100 px-4 py-2 rounded-full transition-all duration-200"
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-amber-700 hover:text-amber-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
          {navLinks.map((path) => (
            <Link
              key={path}
              href={`/${path}`}
              onClick={() => setIsOpen(false)}
              className="block text-amber-700 font-medium bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-md transition"
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
