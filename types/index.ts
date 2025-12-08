export interface Seller {
  id: number
  name: string
  created_at: string
}

export interface Stand {
  id: number
  seller_id: number
  name: string
  description: string | null
  image_url: string | null
  created_at: string
  seller?: Seller
}

export interface Menu {
  id: number
  stand_id: number
  name: string
  price: number
  description: string | null
  image_url: string | null
  is_available: boolean
  category: string
  created_at: string
}

export interface Table {
  id: number
  stand_id: number
  table_number: string
  table_name: string
  is_available: boolean
  qr_code_url: string | null
  created_at: string
}