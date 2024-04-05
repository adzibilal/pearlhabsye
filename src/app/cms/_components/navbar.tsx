'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Package2Icon } from './sidebar-icons'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (pathname) {
            case '/cms/home':
                setTitle('Home')
                break
            case '/cms/orders':
                setTitle('Recent Orders')
                break
            case '/cms/products':
                setTitle('Products')
                break
            case '/cms/products/create':
                setTitle('Create New Product')
                break

            default:
                setTitle('')
                break
        }
    }, [pathname])

    return (
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
            <Link className='lg:hidden' href='#'>
                <Package2Icon className='h-6 w-6' />
                <span className='sr-only'>Home</span>
            </Link>
            <div className='w-full'>
                <h1 className='font-semibold text-lg'>{title}</h1>
            </div>
            <div className='flex gap-3 items-center'>
                <ThemeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className='rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800'
                            size='icon'
                            variant='ghost'>
                            <Image
                                alt='Avatar'
                                className='rounded-full'
                                height='32'
                                src='/placeholder.svg'
                                style={{
                                    aspectRatio: '32/32',
                                    objectFit: 'cover'
                                }}
                                width='32'
                            />
                            <span className='sr-only'>Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Navbar
