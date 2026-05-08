'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { isAuthenticated } from '@/lib/admin-auth'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login')
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) return null

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Homepage Content */}
          <Card>
            <CardHeader>
              <CardTitle>Homepage</CardTitle>
              <CardDescription>Edit hero section and CTAs</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/homepage">
                <Button className="w-full">Edit Homepage</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Manage service offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/services">
                <Button className="w-full">Manage Services</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Upload and manage projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/gallery">
                <Button className="w-full">Manage Gallery</Button>
              </Link>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Edit company information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/about">
                <Button className="w-full">Edit About</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Training */}
          <Card>
            <CardHeader>
              <CardTitle>Training</CardTitle>
              <CardDescription>Manage courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/training">
                <Button className="w-full">Manage Training</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>Edit contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/contact">
                <Button className="w-full">Edit Contact</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
