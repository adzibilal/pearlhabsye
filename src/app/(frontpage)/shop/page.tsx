import Link from 'next/link'
import React from 'react'
import FilterShop from './_components/filter-shop'
import CardProduct from './_components/card-product'

const ShopPage = () => {
    return (
        <div className='pt-[72px] pb-20'>
            <div className='max-con'>
                <div className='flex gap-2 text-sm mt-5 mb-1'>
                    <Link href='/'>
                        <div className=''>Home</div>
                    </Link>
                    <div className=''>/</div>
                    <div className=''>Shop</div>
                </div>
                <div className='text-4xl italic'>All Products</div>
            </div>
            <div className='max-con !mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3'>
                    <FilterShop />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopPage
