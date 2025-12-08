'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">Food Court</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Pilih stand favoritmu!</span>
          </div>
        </div>
      </div>
    </header>
  )
}