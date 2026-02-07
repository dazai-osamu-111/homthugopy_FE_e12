"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function FeedbackForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '', title: '', content: '', suggestion: '', name: '', phone: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {num}
            </div>
            {num < 3 && <div className={`h-1 flex-1 mx-2 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
      >
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Send size={24}/> Phân loại nội dung</h2>
            <div>
              <label className="block font-medium mb-2">Lĩnh vực phản ánh *</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-blue-500"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">-- Chọn lĩnh vực --</option>
                <option value="Hành chính">Thủ tục hành chính</option>
                <option value="Đất đai">Đất đai / Xây dựng</option>
                <option value="An ninh">An ninh trật tự</option>
                <option value="Môi trường">Môi trường / Rác thải</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Tiêu đề ngắn gọn</label>
              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg" placeholder="Tóm tắt vấn đề trong 1 câu..." />
            </div>
            <button onClick={nextStep} className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">Tiếp theo <ArrowRight size={20}/></button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Nội dung & Kiến nghị</h2>
            <div>
              <label className="block font-medium mb-2">Mô tả thực trạng sự việc *</label>
              <textarea rows={4} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg" placeholder="Bạn gặp khó khăn gì? Ở đâu? Khi nào?" />
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
              <label className="block font-bold text-blue-900 mb-2">Hiến kế / Đề xuất của bạn</label>
              <p className="text-xs text-blue-700 mb-2">Hãy đóng góp giải pháp để chúng tôi phục vụ tốt hơn.</p>
              <textarea rows={3} className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Tôi đề nghị..." />
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 border border-slate-300 py-3 rounded-lg font-bold flex items-center justify-center gap-2"><ArrowLeft size={20}/> Quay lại</button>
              <button onClick={nextStep} className="flex-1 bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">Tiếp theo <ArrowRight size={20}/></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2"><CheckCircle size={24}/> Xác nhận gửi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Họ và tên</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium">Số điện thoại</label>
                <input type="tel" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg" />
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 italic">
              * Chúng tôi cam kết bảo mật danh tính của bạn theo quy định pháp luật.
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 border border-slate-300 py-3 rounded-lg font-bold">Quay lại</button>
              <button type="submit" className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold uppercase shadow-lg shadow-red-200">Gửi góp ý chính thức</button>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}