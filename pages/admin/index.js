import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 pt-28">
      <h1 className="text-3xl text-cyan-400 font-bold mb-6 fade-in">
        แผงควบคุม (Admin Panel)
      </h1>

      <p className="text-gray-400 fade-in-delay-1 mb-8">
        จากที่นี่คุณสามารถจัดการผลงานและคิวลูกค้าได้ทั้งหมด
      </p>

      <div className="grid md:grid-cols-2 gap-6 fade-in-delay-2">
        <Link href="/admin/works" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <h2 className="text-cyan-300 text-xl font-semibold">จัดการผลงาน</h2>
          <p className="text-gray-400 text-sm mt-2">เพิ่ม ลบ หรือแก้ไขผลงานที่จะแสดงหน้าเว็บ</p>
        </Link>

        <Link href="/admin/queue" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <h2 className="text-cyan-300 text-xl font-semibold">จัดการคิวงาน</h2>
          <p className="text-gray-400 text-sm mt-2">ดู เพิ่ม หรือลบคิวงานของลูกค้า</p>
        </Link>
      </div>
    </div>
  );
}
