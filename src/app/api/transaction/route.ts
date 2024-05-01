//@ts-ignore
import Midtrans from 'midtrans-client'
import { Transaction } from '@/lib/types'
import { NextResponse } from 'next/server'

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVERKEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVERKEY
})

export async function POST(request: Request) {
    const data: Transaction = await request.json()

    let parameter = {
        transaction_details: {
            order_id: data.transactionID,
            gross_amount: data.amount
        },
        customer_details: {
            first_name: data.name,
            email: data.email,
            phone: data.phone
        }
    }

    const token = await snap.createTransactionToken(parameter)

    return NextResponse.json(token)
}
