import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const response = await fetch(
            'https://api.rajaongkir.com/starter/province',
            {
                method: 'GET',
                headers: {
                    key: process.env.NEXT_PUBLIC_RAJAONGKIR || ''
                }
            }
        )
        const data = await response.json()
        const result = data.rajaongkir.results

        return NextResponse.json(result)
    } catch (error) {
        console.log('[GET Province]', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            {
                status: 400
            }
        )
    }
}
