'use client'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import React from 'react'
import {
    HomeIcon,
    LineChartIcon,
    Package2Icon,
    PackageIcon,
    ShoppingCartIcon,
    UsersIcon
} from './sidebar-icons'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
            <div className='flex flex-col gap-2'>
                <div className='flex h-[60px] items-center px-6'>
                    <Link
                        className='flex items-center gap-2 font-semibold'
                        href='#'>
                        <Package2Icon className='h-6 w-6' />
                        <span className=''>Pearlhabsye</span>
                    </Link>
                </div>
                <div className='flex-1'>
                    <nav className='grid items-start px-4 text-sm font-medium'>
                        <Link
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                pathname == '/cms/home'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-500'
                            } transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
                            href='/cms/home'>
                            <HomeIcon className='h-4 w-4' />
                            Home
                        </Link>
                        <Link
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                pathname == '/cms/orders'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-500'
                            } transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
                            href='/cms/orders'>
                            <ShoppingCartIcon className='h-4 w-4' />
                            Orders
                            {/* <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                                12
                            </Badge> */}
                        </Link>
                        <Link
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                pathname == '/cms/products'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-500'
                            } transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
                            href='/cms/products'>
                            <PackageIcon className='h-4 w-4' />
                            Products
                        </Link>
                        <Link
                            className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                            href='#'>
                            <UsersIcon className='h-4 w-4' />
                            Customers
                        </Link>
                        <Link
                            className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                            href='#'>
                            <LineChartIcon className='h-4 w-4' />
                            Analytics
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
