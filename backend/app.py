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
    todos = [{'id': row[0], 'title': row[1], 'completed': bool(row[2])} for row in c.fetchall()]
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

# 启动时自动建表（放在最后，函数都定义完了再调用）
init_db()

if __name__ == '__main__':
    app.run(debug=True, port=5000)