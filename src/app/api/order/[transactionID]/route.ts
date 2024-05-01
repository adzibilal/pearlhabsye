import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { transactionID: string } }
) {
    try {
        const transactionID = params.transactionID

        const result = await db.transaction.findFirst({
            where: {
                transactionID: transactionID
            },
            include: {
                TransactionDetail: {
                    include: {
                        product: {
                            select: {
                                title: true,
                                image: true,
                                price: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.error('[GET TRANSACTION BY ID]', error)
        return new NextResponse(`GET TRANSACTION BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}
