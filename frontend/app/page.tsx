'use client'
import { useEffect, useState } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  // 页面加载时获取待办列表
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  // 删除待办
  const deleteTodo = (id: number) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setTodos(todos.filter(t => t.id !== id))
    })
  }

  return (
    <main style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <h1>📝 待办事项</h1>
      <p style={{ color: '#666' }}>共 {todos.length} 条待办</p>
      
      <div style={{ marginTop: 30 }}>
        {todos.length === 0 ? (
          <p style={{ color: '#999' }}>暂无待办，去添加一个吧~</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map(todo => (
              <li key={todo.id} style={{
                padding: '12px 16px',
                marginBottom: 8,
                background: '#f5f5f5',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{todo.title}</span>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: 30 }}>
        <a href="/add" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ➕ 添加新待办
        </a>
        <span style={{ margin: '0 15px', color: '#ccc' }}>|</span>
        <a href="/about" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ℹ️ 关于
        </a>
      </div>
    </main>
  )
}