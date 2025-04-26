'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/auth/authClient'
import { useAuth } from '@/auth/useAuth'

export default function LogoutButton() {
  const router = useRouter()
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (loading || !user) return null

  return (
    <button
      onClick={handleLogout}
      className="bg-[#FFDDAB] text-[#5F8B4C] font-semibold text-sm px-4 py-2 rounded-md hover:bg-[#f0cfa1] transition"
    >
      로그아웃
    </button>
  )
}