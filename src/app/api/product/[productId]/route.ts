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

export async function DELETE(
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

        const product = await db.product.delete({
            where: {
                id: productId
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.error('[DELETE PRODUCT BY ID]', error)
        return new NextResponse(`DELETE PRODUCT BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { productId: string } }
) {
    try {
        const productId = params.productId
        const values = await req.json()

        if (!productId) {
            return new NextResponse(
                'Missing productId parameter in the request.',
                {
                    status: 400
                }
            )
        }

        const product = await db.product.update({
            where: {
                id: productId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.error('[PATCH PRODUCT BY ID]', error)
        return new NextResponse(`PATCH PRODUCT BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}
