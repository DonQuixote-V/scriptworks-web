import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("UI"); // ✅ เพิ่มหมวดหมู่
  const [files, setFiles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 📡 โหลดข้อมูลจาก Firestore
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(list);
    });
    return () => unsub();
  }, []);

  // ☁️ อัปโหลดรูปขึ้น Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", "projects");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url;
  };

  // 🧩 เพิ่มหรืออัปเดตผลงาน
  const handleAddOrUpdateProject = async () => {
    if (!title.trim() || !description.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบก่อน!");
      return;
    }

    setUploading(true);
    try {
      let urls = [];

      // 📷 ถ้ามีการอัปโหลดรูปใหม่
      if (files.length > 0) {
        for (const f of files) {
          const url = await uploadImage(f.file);
          urls.push(url);
        }
      }

      if (editingId) {
        // ✏️ แก้ไขผลงานเดิม
        const ref = doc(db, "projects", editingId);
        const project = projects.find((p) => p.id === editingId);

        await updateDoc(ref, {
          title: title.trim(),
          description: description.trim(),
          category,
          images: urls.length > 0 ? urls : project.images,
        });

        alert("อัปเดตผลงานเรียบร้อยแล้ว!");
      } else {
        // 🆕 เพิ่มผลงานใหม่
        await addDoc(collection(db, "projects"), {
          title: title.trim(),
          description: description.trim(),
          category,
          images: urls,
          createdAt: serverTimestamp(),
        });

        alert("เพิ่มผลงานเรียบร้อยแล้ว!");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("อัปโหลดล้มเหลว: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // 📦 โหลดไฟล์รูป
  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    const previews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(previews);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  // 🧱 แก้ไขข้อมูล
  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setCategory(project.category || "UI"); // โหลดหมวดหมู่เดิม
    setFiles([]);
  };

  const cancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("UI");
    setFiles([]);
    setEditingId(null);
  };

  // ❌ ลบผลงาน
  const handleDelete = async (id) => {
    if (!confirm("ลบผลงานนี้แน่ไหม?")) return;
    await deleteDoc(doc(db, "projects", id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        ✨ จัดการผลงาน ScriptWorks
      </h1>

      {/* --- ฟอร์มเพิ่ม / แก้ไขผลงาน --- */}
      <div className="bg-gray-800 p-6 rounded-xl mb-10 space-y-4">
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
          className="w-full p-3 bg-gray-700 rounded h-28 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* 🔽 เพิ่ม dropdown หมวดหมู่ */}
        <div>
          <label className="block text-cyan-400 mb-2">หมวดหมู่ผลงาน</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="UI">UI</option>
            <option value="สคริปต์">สคริปต์</option>
          </select>
        </div>

        {/* 📤 อัปโหลดรูป */}
        <div className="space-y-3">
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="text-gray-300 file:bg-cyan-500 file:text-black file:px-4 file:py-2 file:rounded file:border-0 hover:file:bg-cyan-400"
          />

          {files.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="relative bg-gray-700 rounded-lg overflow-hidden group"
                >
                  <img
                    src={f.preview}
                    alt="preview"
                    className="aspect-square object-cover"
                  />
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 bg-black/60 text-red-400 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🧭 ปุ่มเพิ่ม / อัปเดต */}
        <div className="flex gap-4">
          <button
            onClick={handleAddOrUpdateProject}
            disabled={uploading}
            className="bg-cyan-500 text-black px-6 py-3 rounded font-semibold hover:bg-cyan-400 disabled:opacity-50"
          >
            {uploading
              ? "กำลังอัปโหลด..."
              : editingId
              ? "อัปเดตผลงาน"
              : "เพิ่มผลงาน"}
          </button>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="bg-gray-600 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500"
            >
              ยกเลิกการแก้ไข
            </button>
          )}
        </div>
      </div>

      {/* --- รายการผลงาน --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-cyan-300">{p.title}</h3>
            <p className="text-gray-400 text-sm">
              หมวดหมู่: <span className="text-cyan-400">{p.category}</span>
            </p>
            <p className="text-gray-400 text-sm mb-3">{p.description}</p>

            <div className="grid grid-cols-3 gap-2">
              {p.images?.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt={p.title}
                  className="rounded-lg object-cover aspect-square"
                />
              ))}
            </div>

            <div className="flex gap-3 mt-3 text-sm">
              <button
                onClick={() => handleEdit(p)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                แก้ไขผลงานนี้
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-400 hover:text-red-300"
              >
                ลบผลงานนี้
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
