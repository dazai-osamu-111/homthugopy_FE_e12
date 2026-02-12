import { Flag } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900">
        <header className="bg-red-700 text-white py-3 shadow-md">
          <div className="container mx-auto px-4 flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-full shadow-inner">
              <Flag className="text-red-700" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-bold uppercase leading-tight tracking-wide">Cổng thông tin tiếp nhận góp ý</h1>
              <p className="text-xs opacity-90 font-medium">ỦY BAN NHÂN DÂN CẤP XÃ - HỆ THỐNG TRỰC TUYẾN</p>
            </div>
          </div>
        </header>

        <main className="min-h-[80vh]">
          {children}
        </main>

        <footer className="bg-slate-800 text-slate-300 py-8 mt-20">
          <div className="container mx-auto px-4 text-center text-sm">
            <p className="mb-2 font-semibold">HỆ THỐNG TIẾP NHẬN Ý KIẾN NHÂN DÂN</p>
            <p className="opacity-70">© 2026 - Phát triển trên nền tảng Next.js & Spring Boot</p>
          </div>
        </footer>
      </body>
    </html>
  );
}