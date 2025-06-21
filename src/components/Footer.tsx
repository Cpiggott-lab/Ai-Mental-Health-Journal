export default function Footer() {
  return (
    <footer className="bg-amber-100 border-t border-amber-200  px-6 py-4">
      <div className="max-w-7xl mx-auto text-center text-sm text-amber-800">
        © {new Date().getFullYear()} Mental Health Journal. All rights reserved.
      </div>
    </footer>
  );
}
