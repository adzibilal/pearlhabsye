'use client'
import { ThemeToggle } from '@/app/components/theme-toggle'
import React, { useState, useEffect } from 'react'
import { CgSearch, CgShoppingBag, CgProfile } from 'react-icons/cg'
import { Cart } from './cart'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    useEffect(() => {
        if (pathname === '/') {
            const handleScroll = () => {
                const scrollTop = window.pageYOffset

                if (scrollTop > 0) {
                    setIsScrolled(true)
                } else {
                    setIsScrolled(false)
                }
            }

            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        } else {
            setIsScrolled(true)
            return () => {}
        }
    }, [pathname])

    return (
        <div
            className={`fixed w-full z-20 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white dark:bg-zinc-950'
                    : 'bg-transparent !text-white'
            }`}>
            <div className='max-con min-h-[72px] flex items-center justify-between'>
                <div className='flex items-center gap-10'>
                    <Link href='/'>
                        <div
                            className={`${
                                isScrolled ? 'text-indigo-700' : 'text-white'
                            } font-bold text-lg`}>
                            PEARLHABSYE
                        </div>
                    </Link>
                    <div className='hidden md:flex items-center gap-3'>
                        <Link href='/shop'>
                            <div className={`text-sm cursor-pointer px-3 hover:text-indigo-700 ${pathname == '/shop' ? 'text-indigo-700 font-semibold' : ''}`}>
                                Shop
                            </div>
                        </Link>
                        <div className='text-sm cursor-pointer px-3 hover:text-indigo-700'>
                            Our Story
                        </div>
                        <div className='text-sm cursor-pointer px-3 hover:text-indigo-700'>
                            Collaborations
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <div className='text-xl cursor-pointer'>
                        <CgSearch />
                    </div>
                    <Cart />
                    <div className='text-xl cursor-pointer'>
                        <CgProfile />
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}

export default Navbar
