'use client'

import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'

interface MenuCardProps {
  menu: {
    id: number
    name: string
    price: number
    description: string | null
    image_url: string | null
    is_available: boolean
    category: string
  }
  standId: number
}

export default function MenuCard({ menu, standId }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
    
    // Here you would typically add to cart context/state
    console.log('Added to cart:', { menu, quantity, standId })
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {menu.image_url ? (
          <img
            src={menu.image_url}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            menu.category === 'Minuman' ? 'bg-blue-50' :
            menu.category === 'Dessert' ? 'bg-purple-50' : 'bg-orange-50'
          }`}>
            <span className="text-5xl">
              {menu.category === 'Minuman' ? '🥤' :
               menu.category === 'Dessert' ? '🍰' : '🍲'}
            </span>
          </div>
        )}
        
        {!menu.is_available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold bg-red-500 px-4 py-2 rounded-full">
              Habis
            </span>
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            menu.category === 'Minuman' ? 'bg-blue-100 text-blue-800' :
            menu.category === 'Dessert' ? 'bg-purple-100 text-purple-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {menu.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {menu.name}
          </h3>
          <div className="text-xl font-bold text-orange-600">
            {formatPrice(menu.price)}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {menu.description || 'Menu lezat yang siap disajikan.'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!menu.is_available || isAdded}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isAdded
                ? 'bg-green-500 text-white'
                : menu.is_available
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Ditambahkan
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {menu.is_available ? 'Tambah' : 'Habis'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}