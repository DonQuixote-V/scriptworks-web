// pages/admin/queue.js
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminQueue() {
  const [customer, setCustomer] = useState("");
  const [detail, setDetail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("กำลังทำ");
  const [queueList, setQueueList] = useState([]);

  // ดึงข้อมูลจาก Firestore
  useEffect(() => {
    const q = query(collection(db, "queue"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQueueList(data);
    });
    return () => unsub();
  }, []);

  // เพิ่มคิวใหม่
  const addQueue = async () => {
    if (!customer || !detail || !startDate || !endDate) {
      alert("กรุณากรอกข้อมูลให้ครบก่อนเพิ่มคิว!");
      return;
    }

    await addDoc(collection(db, "queue"), {
      customer,
      detail,
      startDate,
      endDate,
      status,
      createdAt: serverTimestamp(),
    });

    setCustomer("");
    setDetail("");
    setStartDate("");
    setEndDate("");
    setStatus("กำลังทำ");
  };

  // ลบคิว
  const deleteQueue = async (id) => {
    if (confirm("แน่ใจหรือไม่ว่าต้องการลบคิวนี้?")) {
      await deleteDoc(doc(db, "queue", id));
    }
  };

  // 🔹 อัปเดตสถานะใน Firestore
  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "queue", id), { status: newStatus });
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">จัดการคิวงาน</h1>

      {/* ฟอร์มเพิ่มคิว */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4 mb-10">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ชื่อลูกค้า"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="รายละเอียดงาน"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-1">วันรับงาน</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">วันกำหนดส่ง</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option>กำลังทำ</option>
          <option>รอติดต่อ</option>
          <option>เสร็จแล้ว</option>
          <option>ส่งมอบแล้ว</option>
        </select>

        <button
          onClick={addQueue}
          className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded text-black font-semibold"
        >
          เพิ่มคิว
        </button>
      </div>

      {/* ตารางข้อมูล */}
      <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden">
        <thead className="bg-gray-700 text-cyan-400">
          <tr>
            <th className="p-3 text-left">ชื่อลูกค้า</th>
            <th className="p-3 text-left">รายละเอียด</th>
            <th className="p-3 text-left">วันรับงาน</th>
            <th className="p-3 text-left">กำหนดส่ง</th>
            <th className="p-3 text-left">สถานะ</th>
            <th className="p-3 text-center">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {queueList.map((q) => (
            <tr key={q.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="p-3">{q.customer}</td>
              <td className="p-3">{q.detail}</td>
              <td className="p-3">{q.startDate}</td>
              <td className="p-3">{q.endDate}</td>
              <td className="p-3">
                <select
                  value={q.status}
                  onChange={(e) => updateStatus(q.id, e.target.value)}
                  className="bg-gray-700 rounded p-2 focus:ring-2 focus:ring-cyan-500"
                >
                  <option>กำลังทำ</option>
                  <option>รอติดต่อ</option>
                  <option>เสร็จแล้ว</option>
                  <option>ส่งมอบแล้ว</option>
                </select>
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => deleteQueue(q.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}

          {queueList.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-400">
                ยังไม่มีข้อมูลคิว
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
