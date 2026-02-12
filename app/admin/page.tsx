"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Feedback } from "../../types/feedback";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [adminMsg, setAdminMsg] = useState<string>("");

  const API_BASE = "http://localhost:8080/api/feedback"; // Khớp với context-path /api

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get<Feedback[]>(`${API_BASE}/admin/all`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Lỗi fetch dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleRespond = async (id: number) => {
    if (!adminMsg.trim()) return;
    try {
      // Gọi API PUT đã cấu hình ở Backend
      await axios.put(`${API_BASE}/admin/respond/${id}`, adminMsg, {
        headers: { "Content-Type": "text/plain" },
      });
      alert("Đã gửi phản hồi!");
      setAdminMsg("");
      setSelectedFeedback(null);
      fetchFeedbacks(); 
    } catch (err) {
      alert("Lỗi phản hồi!");
    }
  };

  if (loading) return <div className="p-10 text-center text-white">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">Hệ thống Quản trị Góp ý</h1>
      
      <div className="grid gap-4">
        {feedbacks.map((item) => (
          <div key={item.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase">{item.trackingCode}</span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-400">Người gửi: {item.citizenName} - {item.phoneNumber}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs ${item.status === 'PENDING' ? 'bg-amber-900 text-amber-200' : 'bg-emerald-900 text-emerald-200'}`}>
                {item.status === 'PENDING' ? 'Chờ xử lý' : 'Đã xong'}
              </span>
              <button 
                onClick={() => setSelectedFeedback(item)}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition"
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal chi tiết & Phản hồi */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Nội dung góp ý</h2>
            <div className="space-y-4 mb-6">
              <p className="text-slate-300 bg-slate-900 p-4 rounded border border-slate-700 italic">
                &quot;{selectedFeedback.content}&quot;
              </p>
              {selectedFeedback.suggestion && (
                <p className="text-sm text-blue-300">Kiến nghị: {selectedFeedback.suggestion}</p>
              )}
            </div>

            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-100 focus:border-blue-500 outline-none h-32"
              placeholder="Nhập nội dung phản hồi cán bộ..."
              value={adminMsg}
              onChange={(e) => setAdminMsg(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelectedFeedback(null)} className="px-4 py-2 text-slate-400 hover:text-white">Đóng</button>
              <button 
                onClick={() => handleRespond(selectedFeedback.id)}
                className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-md font-bold"
              >
                Xác nhận phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}