export default function About() {
  return (
    <main style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <h1>ℹ️ 关于本项目</h1>
      
      <div style={{ marginTop: 30, lineHeight: 1.8, color: '#333' }}>
        <h3>项目介绍</h3>
        <p>这是一个 AI 辅助编程实训项目——待办事项管理系统。</p>
        
        <h3>技术栈</h3>
        <ul>
          <li>前端：Next.js + React</li>
          <li>后端：Flask + SQLite</li>
          <li>部署：Vercel（前端） + 任意平台（后端）</li>
        </ul>
        
        <h3>功能列表</h3>
        <ul>
          <li>查看所有待办事项</li>
          <li>添加新的待办</li>
          <li>删除待办事项</li>
        </ul>
      </div>

      <div style={{ marginTop: 30 }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← 返回首页
        </a>
      </div>
    </main>
  )
}