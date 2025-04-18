'use client'

import { useAuth } from './useAuth'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) return <p className="text-center mt-20">로그인 상태 확인 중...</p>

  if (!user) {
    router.push('/login')
    return null
  }

  return <>{children}</>
}
