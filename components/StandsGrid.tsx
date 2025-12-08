'use client'

import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Star, MapPin, Clock } from 'lucide-react'

interface Stand {
  id: number
  name: string
  description: string | null
  image_url: string | null
  seller: {
    name: string
  }
}

async function fetchStands(): Promise<Stand[]> {
  const { data, error } = await supabase
    .from('stands')
    .select(`
      *,
      seller: sellers(name)
    `)
    .order('name')
  
  if (error) throw error
  return data
}

export default function StandsGrid() {
  const { data: stands, isLoading, error } = useQuery({
    queryKey: ['stands'],
    queryFn: fetchStands,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading stands</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stands?.map((stand) => (
        <Link
          key={stand.id}
          href={`/stand/${stand.id}`}
          className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
          <div className="relative h-48 overflow-hidden">
            {stand.image_url ? (
              <img
                src={stand.image_url}
                alt={stand.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                <span className="text-4xl">🍜</span>
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold">4.5</span>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {stand.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  oleh {stand.seller.name}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {stand.description || 'Tersedia berbagai macam makanan dan minuman lezat.'}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Stand {stand.id}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Buka
                </span>
              </div>
              <span className="font-semibold text-orange-600">
                Lihat Menu →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}