import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const product = await db.product.findMany()

        return NextResponse.json(product)
    } catch (error) {
        console.log('[GET Product]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}