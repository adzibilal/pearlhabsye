//@ts-ignore
import Midtrans from 'midtrans-client'
import { NextResponse } from 'next/server'

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVERKEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVERKEY
})

export async function POST(request: Request) {
    const { id, price, quantity, name, category } = await request.json()

    let parameter = {
        item_details: {
            id: id,
            name: name,
            quantity: quantity,
            price: price,
            category: category
        },
        transaction_details: {
            order_id: `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            gross_amount: price * quantity
        }
    }

    const token = await snap.createTransactionToken(parameter)

    return NextResponse.json(token)
}
