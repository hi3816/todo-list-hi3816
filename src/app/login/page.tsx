'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/auth/authClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await signIn(email, password)
    if (error) {
      setError('로그인 실패: ' + error.message)
    } else {
      router.push('/todos')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFDDAB] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-[#5F8B4C] text-center mb-6">🌿 로그인 🌿</h1>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-[#c0aa8a] rounded-full px-4 py-2 mb-3 text-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-[#c0aa8a] rounded-full px-4 py-2 mb-4 text-sm focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-[#5F8B4C] text-white font-semibold rounded-full px-4 py-2 hover:bg-[#4d733f] transition"
        >
          로그인
        </button>
      </div>
    </div>
  )
}