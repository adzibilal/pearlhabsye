import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { provinceId: string } }
) {
    try {
        const provinceId = params.provinceId
        if (!provinceId) {
            return new NextResponse(
                'Missing provinceId parameter in the request.',
                {
                    status: 400
                }
            )
        }
        const response = await fetch(
            `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
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
        console.log('[GET City by Province]', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            {
                status: 400
            }
        )
    }
}
