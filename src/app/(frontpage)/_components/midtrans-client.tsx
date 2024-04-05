'use client'
import Script from 'next/script'

import React from 'react'

const MidtransClient = () => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENTKEY
    
    return (
        <div>
            <Script
                type='text/javascript'
                src='https://app.sandbox.midtrans.com/snap/snap.js'
                data-client-key={clientKey}
            />
        </div>
    )
}

export default MidtransClient
