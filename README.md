#  AI Todo App - AI辅助编程实训项目 

一个基于 Next.js + Flask 的待办事项管理系统，用于 AI 辅助编程与工程化实训课程作业。 

## 功能特性 

✅ 查看待办事项列表

➕ 添加新的待办事项

🗑️ 删除待办事项

📱 响应式页面设计 

## 技术栈 

### 前端

Next.js 14（App Router） 

React 18 

TypeScript

 ### 后端

Flask 3.0

SQLite 数据库

Flask-CORS（跨域支持） 

## 项目结构 

aitodo-app/

 ├── frontend/          # 前端项目（Next.js）

 │   ├── app/

 │   │   ├── page.tsx       # 首页 - 待办列表

 │   │   ├── add/page.tsx   # 添加待办页面

 │   │   └── about/page.tsx # 关于页面

 │   └── ...

 ├── backend/           # 后端项目（Flask）

 │   ├── app.py             # 主程序 + API 接口

 │   ├── init_db.py         # 数据库初始化脚本

 │   ├── requirements.txt   # Python 依赖

 │   └── todo.db            # SQLite 数据库文件

 └── README.md

## API 接口文档 

### 1. 获取所有待办 

 返回所有待办事项列表。 

**响应示例：** 

json [

  {   

​	 "id": 1,   

​	 "title": "学习 Next.js",    

​	"completed": false  

} 

]

### 2.新增代办

  POST /api/todos 

  Content-Type: application/json 

### 请求体：

 {  

"title": "待办内容" 

} 

### 3.删除代办

 DELETE /api/todos/:id 

## 本地运行指南

#### 后端启动

 cd backend 

pip install -r requirements.txt 

python init_db.py 

flask run --debug 

 后端运行在 [http://localhost:5000](https://link.wtturl.cn/?target=http%3A%2F%2Flocalhost%3A5000&scene=im&aid=497858&lang=zh) 

#### 前端启动

 cd frontend 

npm install 

npm run dev 

 前端运行在 [http://localhost:3000](https://link.wtturl.cn/?target=http%3A%2F%2Flocalhost%3A3000&scene=im&aid=497858&lang=zh) 

## 部署地址

​	前端 Demo：[待补充]

​	后端 API：[待补充]

## 开发者

​	姓名：吕吴昊

​	学号：122512023050