import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function WorkPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(list);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <h1 className="text-3xl font-bold text-cyan-400 text-center mb-10">
        ผลงานของเรา
      </h1>

      {/* 🔹 แสดงรายการผลงาน */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProject(p)} // เมื่อคลิกให้เปิด modal
            className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="object-cover w-full h-full group-hover:opacity-80 transition"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  ไม่มีรูป
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-cyan-300">{p.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                {p.description}
              </p>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-gray-400 text-center col-span-full">
            ยังไม่มีผลงานตอนนี้
          </p>
        )}
      </div>

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
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-400 text-xl"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-cyan-300 mb-3">
              {selectedProject.title}
            </h2>
            <p className="text-gray-300 mb-6">{selectedProject.description}</p>

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
