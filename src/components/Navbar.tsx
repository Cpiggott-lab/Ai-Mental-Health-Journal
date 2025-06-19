import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm px-6 py-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Journal
        </Link>

        <ul className="flex space-x-6">
          <li>
            <Link href="/about" className="text-gray-700 hover:text-black">
              About
            </Link>
          </li>
          <li>
            <Link href="/journal" className="text-gray-700 hover:text-black">
              Journal
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-black">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
