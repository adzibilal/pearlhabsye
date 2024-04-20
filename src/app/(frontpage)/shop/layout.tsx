import { Suspense } from 'react'

export default function ShopLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <Suspense>{children}</Suspense>
        </div>
    )
}
