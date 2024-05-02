import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import NavBar from '@/app/NavBar'
import AuthContext from '@/app/api/auth/AuthContext'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Freezer ID',
  description: 'Website to keep track of your frozen meals by tagging them with an ID.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <AuthContext>
          <NavBar />
          <br /><br /><br />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
