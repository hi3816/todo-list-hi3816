"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from '@/components/QueryProvider'
import LogoutButton from '@/components/LogoutButton';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const [key, setKey] = useState(0)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      setKey((k) => k + 1)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFDDAB]`}>
        <QueryProvider>
          
          {/* 헤더 */}
          <header key={key} className="bg-[#5F8B4C] text-white py-5 px-6 text-2xl font-bold shadow-md text-center tracking-wide">
            🌿 hi3816의 Todo List 🌿
            <LogoutButton/>
          </header>

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