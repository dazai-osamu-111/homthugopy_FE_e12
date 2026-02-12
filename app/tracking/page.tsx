"use client";
import { useState } from "react";
import axios from "axios";
import { Feedback } from "../../types/feedback"; // Sử dụng đường dẫn tương đối

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Gọi API tra cứu đã khớp với context-path /api
      const res = await axios.get<Feedback>(`http://localhost:8080/api/feedback/track/${code}`);
      setResult(res.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Không tìm thấy mã tra cứu này. Vui lòng kiểm tra lại.");
      } else {
        setError("Có lỗi xảy ra khi kết nối máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Tra cứu kết quả góp ý</h1>
        
        <form onSubmit={handleTrack} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Nhập mã tra cứu (VD: HTGY1234)..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-slate-400"
          >
            {loading ? "Đang tìm..." : "Tra cứu"}
          </button>
        </form>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-6">{error}</div>}

        {result && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-slate-500">Trạng thái:</span>
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${result.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {result.status === 'PENDING' ? 'ĐANG CHỜ XỬ LÝ' : 'ĐÃ PHẢN HỒI'}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">Nội dung góp ý của bạn:</p>
              <h3 className="font-bold text-slate-800 mb-2">{result.title}</h3>
              <p className="text-slate-600 italic">"{result.content}"</p>
            </div>

            {result.adminResponse ? (
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <p className="text-xs text-blue-500 uppercase font-bold mb-2">Trả lời từ cơ quan chức năng:</p>
                <p className="text-slate-800 leading-relaxed">{result.adminResponse}</p>
              </div>
            ) : (
              <p className="text-center text-slate-400 text-sm py-4 italic border-t border-dashed">
                Phản hồi sẽ xuất hiện tại đây sau khi cán bộ xử lý xong.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}