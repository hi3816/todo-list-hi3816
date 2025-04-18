// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { Todo } from '@/types/todo'

// export function useAddTodo() {
    
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: async (newTitle : string) => {
//             const res = await fetch('http://localhost:3001/todos', {
//                 method : 'POST',
//                 headers: { 'Content-Type' : 'application/json' },
//                 body : JSON.stringify({
//                     title : newTitle,
//                     completed : false,
//                 }),
//             })

//             if (!res.ok) throw new Error('추가 실패')
//                 return res.json() as Promise<Todo> 
//         },

//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey : ['todos']})
//         },
//     })
// }


import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useAddTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase.from('todos').insert({ title, completed: false }).select().single()
      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
