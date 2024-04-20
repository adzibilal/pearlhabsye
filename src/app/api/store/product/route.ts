import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const products = await db.product.findMany()

        return NextResponse.json(products)
    } catch (error) {
        console.log('[GET Product]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
