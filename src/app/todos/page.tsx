'use client'

import { useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { useAddTodo } from '@/hooks/useAddTodo'
import { useDeleteTodo } from '@/hooks/useDeleteTodo'
import { useToggleTodo } from '@/hooks/useToggleTodo'

//Unity에서 MonoBehaviour의 Start() + Update() 느낌. 페이지 자체를 구성하는 컴포넌트
export default function TodoListPage(){
    const {data : todos, isLoading, isError } = useTodos()
    const { mutate: addTodo } = useAddTodo() // useAddTodo훅으로 부터 mutation 실행 함수 받아옴
    const { mutate: deleteTodo } = useDeleteTodo();
    const { mutate: toggleTodo } = useToggleTodo();
    const [ input, setInput ] = useState('') //입력 필드의 상태 관리 (C#의 private string title 변수 느낌)
    const [ filter, setFilter ] = useState<'all' | 'done' | 'todo'>('all')

    const handleAdd = () => {
        if (!input.trim()) return
        addTodo(input) // 실제 추가 요청 수행
        setInput('') // 입력 필드 초기화
    }
    if(isLoading) return <p>불러오는 중...</p>
    if(isError) return<p>에러 발생!</p>

    const filterTodos = todos?.filter((todo) => {
        if (filter === 'all') return true
        if (filter === 'done' ) return todo.completed
        if (filter === 'todo' ) return !todo.completed
    })

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">할 일 목록 (Todos)</h1>
            <div className="flex gap-2 mb-4">
                {(['all', 'done', 'todo'] as const).map((key) => (
                    <button
                        key={key}
                        onClick={()=>setFilter(key)}
                        className={`px-3 py-1 border rounded
                            ${filter === key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}
                            `}
                    >
                        {key === 'all' && '전체'}
                        {key === 'done' && '완료'}
                        {key === 'todo' && '미완료'}
                    </button>
                ))}
            </div>

            {/* todos 목록 출력 */}
            <ul className="space-y-2">
                {filterTodos?.map((todo) => (
                <li key={todo.id} className="min-h-14 p-2 border rounded flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            checked={todo.completed}
                            className="mr-2" 
                            onChange={() => toggleTodo(todo)}
                        />
                        <span className = {todo.completed ? 'line-through text-gray-400' : ''}>
                            {todo.title}
                        </span>
                    </div>
                    <button
                            onClick={()=>deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                            >
                                ❌
                    </button>
                </li>
                ))}
            </ul>
        </div>

    )
}