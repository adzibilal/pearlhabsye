import Footer from './_components/footer'
import MidtransClient from './_components/midtrans-client'
import Navbar from './_components/navbar'

export default function FrontLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
            <MidtransClient />
        </div>
    )
}
