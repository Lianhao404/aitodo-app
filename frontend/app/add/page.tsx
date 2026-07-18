'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost } from '@/lib/api'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    apiPost('/api/todos', { title })
      .then(() => {
        router.push('/')  // 添加成功跳回首页
      })
  }

  return (
    <main style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <h1>➕ 添加新待办</h1>
      
      <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入待办内容..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: 16,
            border: '1px solid #ddd',
            borderRadius: 8,
            boxSizing: 'border-box'
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: 20,
            width: '100%',
            padding: '12px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          添加
        </button>
      </form>

      <div style={{ marginTop: 30 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← 返回列表
        </a>
      </div>
    </main>
  )
}