'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FilterShop from './_components/filter-shop'
import CardProduct from './_components/card-product'
import { Product } from '@prisma/client'
import toast from 'react-hot-toast'

const ShopPage = () => {
    const [products, setProducts] = useState<Product[]>()
    const getProducts = async () => {
        try {
            const res = await fetch(
                `/api/store/product`,
                {
                    method: 'GET'
                }
            )

            if (!res.ok) {
                throw new Error('Internal Server Error')
            }
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            toast.error('Failed to fetch product')
        }
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <div className='max-con !mt-5 min-h-[32vw]'>
                <div className='grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3'>
                    <FilterShop />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                        {products?.map(product => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopPage
