import { Flag } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900">
        <header className="bg-red-700 text-white py-3 shadow-md">
          <div className="container mx-auto px-4 flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-full">
              <Flag className="text-red-700" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-bold uppercase leading-tight">Cổng thông tin tiếp nhận góp ý</h1>
              <p className="text-xs opacity-90">ỦY BAN NHÂN DÂN CẤP XÃ - TRỰC TUYẾN</p>
            </div>
          </div>
        </header>
        {children}
        <footer className="bg-slate-800 text-slate-300 py-8 mt-20 text-center text-sm">
          <p>© 2026 Hệ thống tiếp nhận ý kiến Nhân dân - Phát triển bởi Gemini</p>
        </div>
      </body>
    </html>
  );
}