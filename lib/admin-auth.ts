export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') return false
  
  const cookies = document.cookie.split(';')
  return cookies.some(cookie => 
    cookie.trim().startsWith('admin_token=') && cookie.includes('authenticated')
  )
}

export function logout() {
  document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
}
