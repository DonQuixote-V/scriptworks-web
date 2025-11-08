// pages/admin/projects.js
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function AdminProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [projects, setProjects] = useState([]);

  // โหลดข้อมูลเรียลไทม์
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(list);
    });
    return () => unsub();
  }, []);

  const addProject = async () => {
    if (!title || !description) {
      alert("กรอกข้อมูลให้ครบก่อนเพิ่มผลงาน!");
      return;
    }

    await addDoc(collection(db, "projects"), {
      title,
      description,
      image,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setImage("");
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">จัดการผลงาน</h1>

      <div className="bg-gray-800 p-6 rounded-xl space-y-4 mb-8">
        <input
          type="text"
          placeholder="ชื่อผลงาน"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <textarea
          placeholder="รายละเอียดผลงาน"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="ลิงก์รูปภาพ (ถ้ามี)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={addProject}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded"
        >
          เพิ่มผลงาน
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded-lg shadow-md relative">
            <h2 className="text-lg font-semibold text-cyan-300">{p.title}</h2>
            <p className="text-gray-400 mt-2">{p.description}</p>
            {p.image && <img src={p.image} alt={p.title} className="rounded mt-3" />}
            <button
              onClick={() => deleteProject(p.id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
