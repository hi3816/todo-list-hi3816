import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from '@/components/QueryProvider'
import Header from '@/components/Header';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFDDAB]`}>
        <QueryProvider>
          
          {/* 헤더 */}
          <Header/>

          {/* 메인 */}
          <main className="">
            {children}
          </main>

          {/* 푸터 */}
          <footer className="text-center py-4 text-sm text-[#945034]">
            © 2025 hi3816. All rights reserved.
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}