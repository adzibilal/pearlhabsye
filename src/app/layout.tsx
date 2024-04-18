import type { Metadata } from 'next'
import { Albert_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from 'react-hot-toast'
const albert_sans = Albert_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Pearlhabsye',
    description: 'Pearlhabsye Store'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={albert_sans.className}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
