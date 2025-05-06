'use client'

import { useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { useAddTodo } from '@/hooks/useAddTodo'
import { useDeleteTodo } from '@/hooks/useDeleteTodo'
import { useToggleTodo } from '@/hooks/useToggleTodo'
import ProtectedRoute from '@/auth/ProtectedRoute'

export default function TodoListPage() {
  const { data: todos, isLoading, isError } = useTodos()
  const { mutate: addTodo } = useAddTodo()
  const { mutate: deleteTodo } = useDeleteTodo()
  const { mutate: toggleTodo } = useToggleTodo()
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'done' | 'todo'>('all')

  const handleAdd = () => {
    if (!input.trim()) return
    addTodo(input)
    setInput('')
  }

  const filterTodos = todos?.filter((todo) => {
    if (filter === 'all') return true
    if (filter === 'done') return todo.completed
    if (filter === 'todo') return !todo.completed
  })

  const formatDate = (isoString: string | null) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: '2-digit',    // 연도 2자리
      month: '2-digit',   // 월 2자리
      day: '2-digit',     // 일 2자리
      hour: '2-digit',    // 시 2자리
      minute: '2-digit',  // 분 2자리
    });
  };

  if (isLoading) return <p className="text-center mt-20">불러오는 중...</p>
  if (isError) return <p className="text-center mt-20 text-red-500">에러 발생!</p>

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FFDDAB] flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl font-bold text-[#5F8B4C] mb-6">🌿 My Todo List 🌿</h1>

        {/* 필터 & 입력 영역 */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-2 mb-6">
          <div className="flex gap-2">
            {(['all', 'done', 'todo'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition whitespace-nowrap  ${
                  filter === key
                    ? 'bg-[#5F8B4C] text-white'
                    : 'bg-white text-[#5F8B4C]'   
                }`}
              >
                {key === 'all' && '전체'}
                {key === 'done' && '완료'}
                {key === 'todo' && '미완료'}
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 rounded-full bg-white px-4 py-2 text-sm border-2 border-[#c0aa8a] focus:outline-none"
              placeholder="할 일을 입력하세요"
            />
            <button
              onClick={handleAdd}
              className="bg-[#FF9A9A] text-white rounded-full px-4 py-2 hover:bg-[#e98686] transition whitespace-nowrap"
            >
              추가
            </button>
          </div>
        </div>

        {/* 리스트 */}
        <ul className="w-full max-w-xl space-y-2">
          {filterTodos?.map((todo) => (
            <li
              key={todo.id}
              className="bg-white rounded-xl px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="w-5 h-5 accent-[#5F8B4C]"
                />
                <span
                  className={`text-sm ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </span>
              </div>

              <div className = "flex flex-row sm:flex-col-reverse items-center gap-2 sm:items-end mt-2 sm:mt-0 w-full sm:w-auto justify-between">
                <div className="flex flex-col text-[10px] text-gray-500 whitespace-nowrap">
                  <p>등록: {formatDate(todo.create_at)}</p>
                  {todo.completed && <p>완료: {formatDate(todo.completed_at)}</p>}
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-[#945034] text-lg hover:scale-110 transition"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  )
}