# AI 辅助编程 Prompt 日志 

本文件记录项目开发过程中使用 AI 工具的所有 Prompt 及对应输出，用于验证 AI 辅助编程的实际使用过程。 

## 使用工具 

豆包 AI（代码生成、问题排查） 

Cursor / IDE AI 补全 

---

## Prompt 1：后端 Flask 项目初始化 

**时间： 2026-07-14** 

**对应文件：** backend/app.py 

**功能：** 创建 Flask 后端项目，实现待办事项的增删查接口 

### **Prompt** 

帮我写一个 Flask 后端，实现待办事项管理，需要三个接口：

1. GET /api/todos 获取所有待办

2. POST /api/todos 新增待办

3. DELETE /api/todos/<id> 删除待办

	 用 SQLite 数据库，支持跨域。

### AI 输出（关键代码） 



from flask import Flask, jsonify, request 

from flask_cors import CORS 

import sqlite3 

app = Flask(__name__) 

CORS(app) 

def init_db():    

​		conn = sqlite3.connect('todo.db')    

​		c = conn.cursor()    

​		c.execute('''CREATE TABLE IF NOT EXISTS todos

​		                 (id INTEGER PRIMARY KEY AUTOINCREMENT,                  

​						 title TEXT NOT NULL,                  

​						 completed INTEGER DEFAULT 0)''')    

​		conn.commit()    

​		conn.close() 

@app.route('/api/todos', methods=['GET']) 

def get_todos():    

​		获取所有待办... 

## Prompt 2：前端 Next.js 待办列表页面

**时间：** 2026-07-14**对应文件：**

**功能：** 实现待办列表首页，调用后端 API 展示数据

 **Prompt** 

 帮我写一个 Next.js 的首页，展示待办事项列表，调用 http://localhost:5000/api/todos 接口获取数据，每个条目有删除按钮。用 App Router 模式，use client。 

 **AI 输出（关键代码）** 

'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])
  // ...

## Prompt 3：解决数据库表不存在的报错

**时间：** 2026-07-14**对应文件：**

**功能：** 排查 sqlite3.OperationalError: no such table: todos 错误

报错 sqlite3.OperationalError: no such table: todos，用 flask run 启动时不会执行 if __name__ == '__main__' 里的 init_db()，怎么解决？

 **AI 输出** 

 把 init_db() 调用移到 if __name__ 外面，放在 CORS(app) 后面， 这样 flask run 启动时也会自动执行建表。 

## Prompt 4：添加待办页面实现

**时间：** 2026-07-14**对应文件：**

**功能：** 实现添加待办页面，提交表单后调用 POST 接口

 写一个 Next.js 添加待办页面，有一个输入框和提交按钮，提交后 POST 到后端 /api/todos 接口，成功后跳回首页。 

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const router = useRouter()
  // 提交表单调用 POST 接口...

## **总结**

项目开发过程中，主要使用 AI 辅助完成以下工作：

1. 后端 API 接口代码生成
2. 前端页面组件代码生成
3. 开发过程中的 Bug 排查与解决
4. 项目结构与文档编写建议

通过 AI 辅助，大幅提升了开发效率，同时也加深了对前后端联调、RESTful API 设计的理解。