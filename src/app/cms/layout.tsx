import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

export default function CMSLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <div className='grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]'>
                <Sidebar />
                <div className='flex flex-col'>
                    <Navbar />
                    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
