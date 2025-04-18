'use client'

import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <p className="text-center mt-20">로그인 상태 확인 중...</p>
  }

  if (!user) {
    // router.push는 useEffect 안에서 실행되고 있음
    return null
  }

  return <>{children}</>
}
