# AI Todo App - AI辅助编程实训项目

一个基于 Next.js + Flask 的待办事项管理系统，用于 AI 辅助编程与工程化实训课程作业。

## 线上体验

| 服务 | 地址 |
|------|------|
| 🌐 前端 Demo | **[待部署后更新]** |
| 🔗 后端 API | **[待部署后更新]** |

> 前端部署至 Cloudflare Pages，后端部署至 Render.com

## 功能特性

- ✅ 查看待办事项列表
- ➕ 添加新的待办事项
- 🗑️ 删除待办事项
- 📱 响应式页面设计

## 技术栈

### 前端
- Next.js 15（App Router）
- React 19
- TypeScript

### 后端
- Flask 3
- SQLite 数据库
- Flask-CORS（跨域支持）
- Gunicorn（生产环境服务器）

## 项目结构

```
aitodo-app/
├── frontend/              # 前端项目（Next.js）
│   ├── app/
│   │   ├── page.tsx           # 首页 - 待办列表
│   │   ├── add/page.tsx       # 添加待办页面
│   │   └── about/page.tsx     # 关于页面
│   ├── lib/
│   │   └── api.ts             # API 统一配置
│   └── ...
├── backend/              # 后端项目（Flask）
│   ├── app.py                 # 主程序 + API 接口
│   ├── requirements.txt       # Python 依赖
│   ├── Procfile               # 部署配置
│   └── todo.db                # SQLite 数据库文件
├── code-review/          # AI 代码审查截图与报告
├── prompt_log.md         # AI Prompt 使用日志
├── 个人实训总结报告.md    # 实训总结
└── README.md
```

## API 接口文档

### 1. 获取所有待办

```
GET /api/todos
```

**响应示例：**

```json
[
  {
    "id": 1,
    "title": "学习 Next.js",
    "completed": false
  }
]
```

### 2. 新增待办

```
POST /api/todos
Content-Type: application/json
```

**请求体：**
```json
{
  "title": "待办内容"
}
```

**响应（201）：**
```json
{
  "id": 2,
  "title": "待办内容",
  "completed": false
}
```

### 3. 删除待办

```
DELETE /api/todos/:id
```

**响应：**
```json
{
  "message": "删除成功"
}
```

## 本地运行指南

### 后端启动

```bash
cd backend
pip install -r requirements.txt
python app.py
# 后端运行在 http://localhost:5000
```

### 前端启动

```bash
cd frontend
npm install
npm run dev
# 前端运行在 http://localhost:3000
```

## 部署指南

### 前端部署（Cloudflare Pages）

1. 将代码推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Workers & Pages → 创建应用程序 → Pages → 连接 Git
4. 选择仓库，构建配置：
   - **构建目录：** `frontend`
   - **构建命令：** `npx @cloudflare/next-on-pages`
   - **输出目录：** `.vercel/output/static`
5. 部署后修改 `frontend/lib/api.ts` 中的 `API_BASE_URL` 为后端实际地址

### 后端部署（Render.com）

1. 登录 [Render.com](https://render.com/)（GitHub 登录即可）
2. 新建 Web Service → 连接仓库
3. 配置：
   - **根目录：** `backend`
   - **运行环境：** Python 3
   - **构建命令：** `pip install -r requirements.txt`
   - **启动命令：** `gunicorn app:app --bind 0.0.0.0:$PORT`
4. 免费版有休眠机制，首次访问可能需要等待30秒

## 开发者

- 姓名：吕吴昊
- 学号：122512023050
