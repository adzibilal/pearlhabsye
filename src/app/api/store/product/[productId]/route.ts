import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { productId: string } }
) {
    try {
        const productId = params.productId
        if (!productId) {
            return new NextResponse(
                'Missing productId parameter in the request.',
                {
                    status: 400
                }
            )
        }

        const product = await db.product.findFirst({
            where: {
                id: productId
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.error('[GET PRODUCT BY ID]', error)
        return new NextResponse(`GET PRODUCT BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}
