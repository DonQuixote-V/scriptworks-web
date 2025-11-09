// pages/works.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function WorksPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomImage, setZoomImage] = useState(null); // ✅ สำหรับเปิดรูปขยาย

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
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded mb-4 hover:opacity-80 transition"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center rounded text-gray-500">
                  ไม่มีรูป
                </div>
              )}
              <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                {p.title}
              </h2>
              <p className="text-gray-400 line-clamp-2">{p.description}</p>
              <p className="text-sm text-gray-500 mt-1">หมวดหมู่: {p.category || "ทั่วไป"}</p>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Modal รายละเอียดผลงาน */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                    className="rounded-lg object-cover hover:scale-105 transition-transform cursor-zoom-in"
                    onClick={() => setZoomImage(url)} // ✅ กดเพื่อขยาย
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔍 Modal แสดงรูปขยายใหญ่ */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
          >
            <motion.img
              src={zoomImage}
              alt="Zoomed"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
