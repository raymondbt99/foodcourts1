'use client'

import { useState } from 'react'
import { ArrowLeft, ChefHat, Coffee, Dessert, Filter, Star } from 'lucide-react'
import Link from 'next/link'
import MenuCard from './MenuCard'

interface Menu {
  id: number
  name: string
  price: number
  description: string | null
  image_url: string | null
  is_available: boolean
  category: string
}

interface StandDetailProps {
  stand: {
    id: number
    name: string
    description: string | null
    image_url: string | null
    seller: {
      name: string
    }
    menus: Menu[]
  }
}

export default function StandDetail({ stand }: StandDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'price' | 'name'>('name')

  const categories = [
    { id: 'all', label: 'Semua', icon: ChefHat },
    { id: 'Makanan', label: 'Makanan', icon: ChefHat },
    { id: 'Minuman', label: 'Minuman', icon: Coffee },
    { id: 'Dessert', label: 'Dessert', icon: Dessert },
  ]

  const filteredMenus = stand.menus
    .filter(menu => selectedCategory === 'all' || menu.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      return a.name.localeCompare(b.name)
    })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-1/3">
              <div className="relative h-64 md:h-48 rounded-xl overflow-hidden shadow-lg">
                {stand.image_url ? (
                  <img
                    src={stand.image_url}
                    alt={stand.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <span className="text-6xl">🍽️</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {stand.name}
                  </h1>
                  <p className="text-gray-600">
                    oleh <span className="font-semibold">{stand.seller.name}</span>
                  </p>
                </div>
                <div className="flex items-center bg-orange-50 text-orange-800 rounded-full px-4 py-2">
                  <Star className="h-5 w-5 mr-2 fill-current" />
                  <span className="font-bold">4.5</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                {stand.description || 'Stand ini menyajikan berbagai macam makanan dan minuman lezat untuk Anda.'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {stand.menus.length}
                  </div>
                  <div className="text-sm text-gray-600">Menu</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Meja Tersedia</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">30m</div>
                  <div className="text-sm text-gray-600">Waktu Tunggu</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Buka</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Daftar Menu
            </h2>
            <p className="text-gray-600">
              Pilih makanan dan minuman favorit Anda
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'name')}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="name">Urutkan: Nama</option>
                <option value="price">Urutkan: Harga</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-orange-100 text-orange-700 border border-orange-300'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </button>
            )
          })}
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} standId={stand.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Menu tidak tersedia
            </h3>
            <p className="text-gray-600">
              Tidak ada menu untuk kategori ini
            </p>
          </div>
        )}
      </div>
    </div>
  )
}