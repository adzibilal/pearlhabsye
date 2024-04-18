import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const url = new URL(req.url) // Membuat objek URL dari URL permintaan
        const searchParams = url.searchParams // Mengambil objek URLSearchParams

        const category = searchParams.get('category') // Mendapatkan nilai parameter 'category'
        const sortBy = searchParams.get('sortBy') // Mendapatkan nilai parameter 'sort'

        let products
        if (category && sortBy) {
            products = await db.product.findMany({
                // where: {
                //     category: category as string, // asumsikan category adalah string
                // },
                orderBy: {
                    price: sortBy === 'price-low-to-high' ? 'asc' : 'desc'
                }
            })
        } else {
            products = await db.product.findMany()
        }

        return NextResponse.json(products)
    } catch (error) {
        console.log('[GET Product]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
