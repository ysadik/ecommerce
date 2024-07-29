import { Billboard } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getFirstBillboard = async (): Promise<Billboard> => {
  const res = await fetch(`${URL}?limit=1`, { cache: 'no-store' })
  const data = await res.json()
  return data[0]
}

export default getFirstBillboard
