import StandDetail from '@/components/StandDetail'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getStandData(id: string) {
  const { data: stand, error } = await supabase
    .from('stands')
    .select(`
      *,
      seller: sellers(name),
      menus(*)
    `)
    .eq('id', id)
    .single()

  if (error || !stand) return null
  return stand
}

export default async function StandPage({ params }: PageProps) {
  const { id } = await params
  const stand = await getStandData(id)

  if (!stand) {
    notFound()
  }

  return <StandDetail stand={stand} />
}