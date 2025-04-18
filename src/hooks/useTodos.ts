// import { useQuery } from '@tanstack/react-query'
// import { Todo } from '@/types/todo'

// export function useTodos() {
//   return useQuery<Todo[]>({
//     queryKey: ['todos'],
//     queryFn: async () => {
//       const res = await fetch('http://localhost:3001/todos')
//       if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.')
//       return res.json()
//     }
//   })
// }

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('todos').select('*')
      if (error) throw new Error(error.message)
      return data
    },
  })
}