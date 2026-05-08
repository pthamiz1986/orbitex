export function isAuthenticated(): boolean {
  if (typeof localStorage === 'undefined') return false
  
  const token = localStorage.getItem('admin_token')
  return !!token && token.length > 0
}

export function logout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
  }
}
