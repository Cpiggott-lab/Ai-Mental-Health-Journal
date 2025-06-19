export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10 px-6 py-4">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Mental Health Journal. All rights reserved.
      </div>
    </footer>
  );
}
