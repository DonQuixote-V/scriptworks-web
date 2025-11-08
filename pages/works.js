// pages/works.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function WorksPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(list);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen relative">
      <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">
        ผลงานของเรา
      </h1>

      {projects.length === 0 ? (
        <p className="text-gray-400 text-center">ยังไม่มีผลงานในระบบ</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-cyan-500/30 transition cursor-pointer"
            >
              {/* 🔹 รูปตัวอย่าง */}
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center rounded text-gray-500">
                  ไม่มีรูป
                </div>
              )}

              {/* 🔹 ชื่อผลงาน */}
              <h2 className="text-xl font-semibold text-cyan-300 mb-1">
                {p.title}
              </h2>

              {/* 🔹 หมวดหมู่ */}
              <p className="text-sm text-cyan-400 mb-2">
                หมวดหมู่: {p.category || "ไม่ระบุ"}
              </p>

              {/* 🔹 รายละเอียดสั้น */}
              <p className="text-gray-400 line-clamp-2">
                {p.description || "ไม่มีรายละเอียด"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Modal แสดงรายละเอียด */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gray-800 p-6 rounded-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ปุ่มปิด */}
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-400 text-xl"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            {/* ชื่อผลงาน */}
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">
              {selectedProject.title}
            </h2>

            {/* หมวดหมู่ */}
            <p className="text-sm text-cyan-400 mb-4">
              หมวดหมู่: {selectedProject.category || "ไม่ระบุ"}
            </p>

            {/* รายละเอียด */}
            <p className="text-gray-300 mb-6">
              {selectedProject.description || "ไม่มีรายละเอียดเพิ่มเติม"}
            </p>

            {/* แสดงรูปทั้งหมด */}
            <div className="grid md:grid-cols-2 gap-4">
              {selectedProject.images?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`รูป ${i + 1}`}
                  className="rounded-lg object-cover hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
