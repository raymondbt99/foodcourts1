import StandsGrid from '@/components/StandsGrid'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Daftar Stand Makanan
        </h1>
        <p className="text-gray-600">
          Pilih stand untuk melihat menu dan pesan makanan
        </p>
      </div>
      
      <StandsGrid />
    </div>
  )
}