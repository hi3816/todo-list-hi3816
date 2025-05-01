'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LogoutButton from './LogoutButton'

export default function Header() {
    const [key, setKey] = useState(0)

    useEffect(()=> {
        const { data : listener} = supabase.auth.onAuthStateChange(() => {
            setKey((k) => k + 1)
        })
        return () => listener.subscription.unsubscribe()
    }, [])
    
    return(
        <header
            key={key}
            className="bg-[#5F8B4C] text-white py-5 px-6 text-2xl font-bold shadow-md text-center tracking-wide"
        >
            🌿 hi3816의 Todo List 🌿
            <LogoutButton />
        </header>
    )
}