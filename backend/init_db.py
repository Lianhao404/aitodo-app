import sqlite3

conn = sqlite3.connect('todo.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS todos
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              completed INTEGER DEFAULT 0)''')
conn.commit()
conn.close()
print("数据库创建成功！")