# AI 辅助编程 Prompt 日志

本文件记录项目开发过程中使用 AI 工具的所有 Prompt 及对应输出，用于验证 AI 辅助编程的实际使用过程。

## 使用工具

- 豆包 AI（代码生成、问题排查）
- Cursor / IDE AI 补全

---

## Prompt 1：后端 Flask 项目初始化

- **时间：** 2026-07-14
- **对应文件：** `backend/app.py`
- **功能：** 创建 Flask 后端项目，实现待办事项的增删查接口

### Prompt

```
帮我写一个 Flask 后端，实现待办事项管理，需要三个接口：
1. GET /api/todos 获取所有待办
2. POST /api/todos 新增待办
3. DELETE /api/todos/<id> 删除待办

用 SQLite 数据库，支持跨域。
```

### AI 输出（原始代码）

```python
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# 初始化数据库
def init_db():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS todos
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  completed INTEGER DEFAULT 0)''')
    conn.commit()
    conn.close()

# 获取所有待办
@app.route('/api/todos', methods=['GET'])
def get_todos():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute('SELECT * FROM todos')
    todos = [{'id': row[0], 'title': row[1], 'completed': bool(row[2])} 
             for row in c.fetchall()]
    conn.close()
    return jsonify(todos)

# 新增待办
@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    title = data.get('title', '')
    if not title:
        return jsonify({'error': '标题不能为空'}), 400
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute('INSERT INTO todos (title) VALUES (?)', (title,))
    conn.commit()
    todo_id = c.lastrowid
    conn.close()
    return jsonify({'id': todo_id, 'title': title, 'completed': False}), 201

# 删除待办
@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': '删除成功'})

# 启动时自动建表
init_db()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## Prompt 2：前端 Next.js 待办列表页面

- **时间：** 2026-07-16
- **对应文件：** `frontend/app/page.tsx`
- **功能：** 实现待办列表首页，调用后端 API 展示数据

### Prompt

```
帮我写一个 Next.js 的首页，展示待办事项列表，
调用 http://localhost:5000/api/todos 接口获取数据，
每个条目有删除按钮。用 App Router 模式，use client。
```

### AI 输出（原始代码）

```tsx
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
                >删除</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
```

---

## Prompt 3：解决数据库表不存在的报错

- **时间：** 2026-07-14
- **对应文件：** `backend/app.py`（修复 `init_db()` 调用位置）
- **功能：** 排查 sqlite3.OperationalError: no such table: todos 错误

### Prompt

```
报错 sqlite3.OperationalError: no such table: todos，
用 flask run 启动时不会执行 if __name__ == '__main__' 里的 init_db()，怎么解决？
```

### AI 输出

```
把 init_db() 调用移到 if __name__ 外面，放在 CORS(app) 后面。
这样 flask run 启动时也会自动执行建表。

具体做法：
将 app.py 末尾的 init_db() 从 if __name__ == '__main__': 块中移出，
紧跟 CORS(app) 之后调用即可。

原因是：flask run 命令通过 Flask CLI 加载应用，不会执行
if __name__ == '__main__' 代码块，所以需要把初始化逻辑
放在模块级别。
```

---

## Prompt 4：添加待办页面实现

- **时间：** 2026-07-16
- **对应文件：** `frontend/app/add/page.tsx`
- **功能：** 实现添加待办页面，提交表单后调用 POST 接口

### Prompt

```
写一个 Next.js 添加待办页面，有一个输入框和提交按钮，
提交后 POST 到后端 /api/todos 接口，成功后跳回首页。
```

### AI 输出（原始代码）

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
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
        >添加</button>
      </form>

      <div style={{ marginTop: 30 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← 返回列表
        </a>
      </div>
    </main>
  )
}
```

---

## Prompt 5：关于页面实现

- **时间：** 2026-07-16
- **对应文件：** `frontend/app/about/page.tsx`
- **功能：** 创建项目介绍页面

### Prompt

```
写一个 Next.js 的关于页面，介绍这个 Todo 项目的技术栈和功能。
用 App Router + TypeScript，简洁美观。
```

### AI 输出（原始代码）

```tsx
export default function About() {
  return (
    <main style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <h1>ℹ️ 关于本项目</h1>
      
      <section style={{ marginTop: 30 }}>
        <h2>📋 项目简介</h2>
        <p>
          这是一个使用 AI 辅助开发的待办事项管理应用，
          作为《AI辅助编程与工程化实训》课程的实践项目。
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>🛠 技术栈</h2>
        <ul>
          <li><strong>前端：</strong>Next.js 15 + React 19 + TypeScript</li>
          <li><strong>后端：</strong>Flask + SQLite</li>
          <li><strong>部署：</strong>Cloudflare Pages (前端) + Render (后端)</li>
        </ul>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>✨ 功能</h2>
        <ul>
          <li>查看待办事项列表</li>
          <li>添加新的待办事项</li>
          <li>删除已完成的待办</li>
        </ul>
      </section>

      <div style={{ marginTop: 40 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← 返回列表
        </a>
      </div>
    </main>
  )
}
```

---

## 总结

项目开发过程中，主要使用 AI（豆包 AI + Cursor IDE）辅助完成以下工作：

1. **后端 API 接口代码生成** —— Prompt 1 直接生成了完整的 Flask CRUD 代码
2. **前端页面组件代码生成** —— Prompt 2/4/5 分别生成了三个页面的完整代码
3. **开发过程中的 Bug 排查与解决** —— Prompt 3 解决了 flask run 与 init_db 的生命周期问题
4. **项目结构与文档编写** —— AI 协助整理了项目目录结构和 README 文档

通过 AI 辅助，项目在 3 天内完成了前后端完整的增删查功能，大幅提升了开发效率，
同时也加深了对前后端联调、RESTful API 设计以及工程化规范的理解。
