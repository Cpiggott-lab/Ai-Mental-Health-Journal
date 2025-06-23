import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-100 border-t border-amber-200 px-2 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col  items-center justify-between">
        <div className="flex gap-6 text-sm text-amber-700">
          <Link
            href="https://www.linkedin.com/in/christopher-piggott-3bbb54351/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-900 transition"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/Cpiggott-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-900 transition"
          >
            GitHub
          </Link>
        </div>
        <div className="text-sm text-amber-800 text-center md:text-right">
          © {new Date().getFullYear()} Mental Health Journal. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
