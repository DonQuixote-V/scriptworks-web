// pages/queue.js
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function QueuePage() {
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "queue"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQueueList(data);
    });
    return () => unsub();
  }, []);

  // 🟢 ฟังก์ชันเลือกสีตามสถานะ
  const getStatusColor = (status) => {
    switch (status) {
      case "กำลังทำ":
        return "text-yellow-400 bg-yellow-900/30";
      case "รอติดต่อ":
        return "text-red-400 bg-red-900/30";
      case "เสร็จแล้ว":
        return "text-green-400 bg-green-900/30";
      case "ส่งมอบแล้ว":
        return "text-blue-400 bg-blue-900/30";
      default:
        return "text-gray-300 bg-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">
        คิวงานของลูกค้า
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-700 text-cyan-400">
            <tr>
              <th className="p-3 text-left">ชื่อลูกค้า</th>
              <th className="p-3 text-left">รายละเอียด</th>
              <th className="p-3 text-left">วันรับงาน</th>
              <th className="p-3 text-left">กำหนดส่ง</th>
              <th className="p-3 text-left">สถานะ</th>
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      q.status
                    )}`}
                  >
                    {q.status}
                  </span>
                </td>
              </tr>
            ))}

            {queueList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  ยังไม่มีคิวในระบบ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
