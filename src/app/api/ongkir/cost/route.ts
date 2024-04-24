import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const destination = req.nextUrl.searchParams.get('destination') as string
    const courier = ['jne', 'pos', 'tiki']

    if (!destination) {
        return new NextResponse(
            'Missing origin or destination parameter in the request.',
            {
                status: 400
            }
        )
    }

    try {
        const results: Record<string, any> = {};
        
        for (const currCourier of courier) {
            const response = await fetch(
                'https://api.rajaongkir.com/starter/cost',
                {
                    method: 'POST',
                    headers: {
                        key: process.env.NEXT_PUBLIC_RAJAONGKIR || '',
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        origin: '24',
                        destination: destination,
                        weight: '1000',
                        courier: currCourier
                    }).toString()
                }
            );

            const data = await response.json();
            results[currCourier] = data.rajaongkir.results;
        }

        // Combine all values into a single array
        const responseArray = Object.values(results).reduce((acc: any[], curr: any) => {
            acc.push(...curr);
            return acc;
        }, []);

        return NextResponse.json(responseArray);
    } catch (error) {
        console.log('[GET Cost]', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            {
                status: 400
            }
        );
    }
}