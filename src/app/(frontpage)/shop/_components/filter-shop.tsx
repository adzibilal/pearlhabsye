'use client'
import React from 'react'

const FilterShop = () => {
    return (
        <div className='hidden md:block'>
            <div className='flex flex-col gap-1 mb-5'>
                <div className='text-xs font-bold mb-1'>SHORT BY</div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Latest Arrival
                </div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Best Seller
                </div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Price: Low to High
                </div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Price: High to Low
                </div>
            </div>
            <div className='flex flex-col gap-1 mb-5'>
                <div className='text-xs font-bold mb-1'>CATEGORIES</div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Shoes
                </div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Boxy Tshirt
                </div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Oversized Tshirt
                </div>
                <div className='text-sm cursor-pointer hover:underline'>
                    Totebag
                </div>
            </div>
        </div>
    )
}

export default FilterShop
