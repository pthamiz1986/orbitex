'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const workerApi = process.env.NEXT_PUBLIC_WORKER_API || 'https://orbitex-api.pthamiz.workers.dev'
      
      console.log('[v0] Login attempt with:', { username, workerApi })
      
      const response = await fetch(`${workerApi}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log('[v0] Login response:', { status: response.ok, data })

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials')
      }

      // Store token in localStorage
      console.log('[v0] Storing token:', data.token)
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_username', data.username)
      
      // Verify storage
      const storedToken = localStorage.getItem('admin_token')
      console.log('[v0] Verified token stored:', !!storedToken)

      // Redirect to dashboard
      console.log('[v0] Redirecting to /admin/dashboard')
      router.push('/admin/dashboard')
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed'
      console.log('[v0] Login error:', errorMsg)
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ORBITEX Admin</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-destructive bg-destructive/10">
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Back to website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
