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

// POST
export async function POST(req: Request) {
    try {
        const data = await req.json()
        
        // return NextResponse.json(data)
        
        const product = await db.product.create({ data })
        return NextResponse.json(product)

    } catch (error) {
        console.log('[POST Product]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
