import Link from "next/link";

export default function HeaderAdmin() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur border-b border-cyan-700 text-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* ✅ โลโก้หรือชื่อระบบ กดกลับหน้า /admin */}
        <Link href="/admin" className="text-cyan-400 font-bold text-xl hover:text-cyan-300 transition">
          Admin Panel
        </Link>

        <nav className="flex gap-6">
          <Link href="/admin/queue" className="hover:text-cyan-400 transition">
            จัดการคิว
          </Link>
          <Link href="/admin/projects" className="hover:text-cyan-400 transition">
            โปรเจกต์
          </Link>
          <Link href="/" className="text-red-400 hover:text-red-500 transition">
            ← กลับหน้าหลัก
          </Link>
        </nav>
      </div>
    </header>
  );
}
