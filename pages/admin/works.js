import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminWorks() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("กรุณากรอกชื่อผลงาน");
    try {
      await addDoc(collection(db, "works"), {
        title,
        desc,
        createdAt: new Date(),
      });
      setTitle("");
      setDesc("");
      alert("เพิ่มผลงานสำเร็จ!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 pt-28">
      <h1 className="text-2xl text-cyan-400 font-bold mb-4">เพิ่มผลงานใหม่</h1>
      <form onSubmit={handleAdd} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="ชื่อผลงาน"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400"
        />
        <textarea
          placeholder="รายละเอียด"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400"
          rows="4"
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded transition-colors"
        >
          เพิ่มผลงาน
        </button>
      </form>
    </div>
  );
}
