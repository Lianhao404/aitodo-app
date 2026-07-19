'use client'
import { useEffect, useState } from 'react'
import { apiGet, apiDelete } from '@/lib/api'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  // 检查后端状态（复用 apiGet，和加载待办走同一通道）
  const checkBackend = () => {
    apiGet('/api/todos')
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'))
  }

  // 页面加载时获取待办列表 + 检查后端状态
  useEffect(() => {
    apiGet('/api/todos')
      .then((data: Todo[]) => {
        setTodos(data)
        setBackendStatus('online')
      })
      .catch(() => {
        setTodos([])
        setBackendStatus('offline')
      })
    const timer = setInterval(checkBackend, 5000)
    return () => clearInterval(timer)
  }, [])

  // 删除待办
  const deleteTodo = (id: number) => {
    apiDelete(`/api/todos/${id}`).then(() => {
      setTodos(todos.filter(t => t.id !== id))
    })
  }

  return (
    <main style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <h1>📝 待办事项</h1>
      <p style={{ color: '#666' }}>共 {todos.length} 条待办</p>

      <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#888' }}>后端状态：</span>
        {backendStatus === 'checking' && <span style={{ fontSize: 12, color: '#999' }}>检测中...</span>}
        {backendStatus === 'online' && (
          <span style={{ fontSize: 12, color: '#52c41a', background: '#f6ffed', padding: '2px 8px', borderRadius: 4, border: '1px solid #b7eb8f' }}>
            ✅ Flask 后端在线 (localhost:5000)
          </span>
        )}
        {backendStatus === 'offline' && (
          <span style={{ fontSize: 12, color: '#ff4d4f', background: '#fff2f0', padding: '2px 8px', borderRadius: 4, border: '1px solid #ffccc7' }}>
            ❌ 后端未启动，请先运行 backend/app.py
          </span>
        )}
      </div>

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
                <span style={{ color: '#1a1a1a', fontWeight: 500, fontSize: 16 }}>{todo.title}</span>
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