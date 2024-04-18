'use client'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface QueryParams {
    [key: string]: string
}

const FilterShop = () => {
    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams()

    const handleNavigate = (queryParams: QueryParams) => {
        const searchParams = new URLSearchParams(query)
        for (const [key, value] of Object.entries(queryParams)) {
            if (value) {
                searchParams.set(key, value)
            } else {
                searchParams.delete(key) 
            }
        }

        router.push(`${pathname}?${searchParams}`)
    }

    return (
        <div className='hidden md:block'>
            <div className='flex flex-col gap-1 mb-5'>
                <div className='text-xs font-bold mb-1'>SHORT BY</div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() => handleNavigate({ sortBy: 'latest' })}>
                    Latest Arrival
                </div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() => handleNavigate({ sortBy: 'bestseller' })}>
                    Best Seller
                </div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() =>
                        handleNavigate({ sortBy: 'price-low-to-high' })
                    }>
                    Price: Low to High
                </div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() =>
                        handleNavigate({ sortBy: 'price-high-to-low' })
                    }>
                    Price: High to Low
                </div>
            </div>
            <div className='flex flex-col gap-1 mb-5'>
                <div className='text-xs font-bold mb-1'>CATEGORIES</div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() => handleNavigate({ category: 'shoes' })}>
                    Shoes
                </div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() => handleNavigate({ category: 'boxy-tshirt' })}>
                    Boxy Tshirt
                </div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() =>
                        handleNavigate({ category: 'oversized-tshirt' })
                    }>
                    Oversized Tshirt
                </div>
                <div
                    className='text-sm cursor-pointer hover:underline'
                    onClick={() => handleNavigate({ category: 'totebag' })}>
                    Totebag
                </div>
            </div>
        </div>
    )
}

export default FilterShop
