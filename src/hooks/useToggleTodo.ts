// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { Todo } from '@/types/todo'

// export function useToggleTodo() {
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: async (todo : Todo) => {
//             const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
//                 method : 'PATCH',
//                 headers : {'Content-Type' : 'application/json'},
//                 body : JSON.stringify({ completed: !todo.completed}),
//             })
//             if (!res.ok) throw new Error('상태 변경 실패')
//                 return res.json();
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey : ['todos']})
//         },
//     })
// }

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Todo } from '@/types/todo'

export const useToggleTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const newCompleted = !todo.completed;
      const completedAt = newCompleted ? new Date().toISOString() : null;
      
      const { data, error } = await supabase
        .from('todos')
        .update({ 
          completed: newCompleted ,
          completed_at : completedAt,
        })
        .eq('id', todo.id)
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

