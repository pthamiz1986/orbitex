import React from 'react'

export const metadata = {
  title: 'Admin Dashboard - ORBITEX',
  description: 'Admin panel for managing ORBITEX content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
