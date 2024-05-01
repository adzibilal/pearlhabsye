import { db } from '@/lib/db'
import { generateTransactionID } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { name, phone, email, address, amount, shipper, products } =
        await request.json()

    const transactionID = generateTransactionID()

    const transaction = await db.transaction.create({
        data: {
            transactionID,
            name: name,
            phone: phone,
            email: email,
            address: address,
            amount: amount,
            shipper: shipper,
            TransactionDetail: {
                create: products
            }
        }
    })

    if (!transaction.id)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            {
                status: 400
            }
        )

    const result = await db.transaction.findFirst({
        where: {
            id: transaction.id
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
}
