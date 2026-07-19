/**
 * API 配置文件
 * 修改 API_BASE_URL 即可切换后端地址
 * - 本地开发：http://localhost:5000
 * - 线上部署：https://你的后端域名（如 render.com）
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`)
  return res.json()
}

export async function apiPost(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function apiDelete(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`, { method: 'DELETE' })
  return res.json()
}
