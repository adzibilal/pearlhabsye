'use client'
import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Product } from '@prisma/client'
import toast from 'react-hot-toast'
import { removeHtmlTags } from '@/lib/utils'
import Link from 'next/link'

export function LandingCarousel() {
    const [products, setProducts] = React.useState<Product[]>()

    const getProducts = async () => {
        try {
            const res = await fetch('/api/store/product', {
                method: 'GET'
            })

            if (!res.ok) {
                throw new Error('Internal Server Error')
            }
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            toast.error('Failed to fetch product')
        }
    }

    React.useEffect(() => {
        getProducts()
    }, [])

    const ProductImage = (obj: any) => {
        const { images } = obj
        let firstImage
        let secondImage
        if (Array.isArray(images)) {
            ;[firstImage, secondImage] = images
        }

        return (
            <div className='w-full overflow-hidden aspect-square bg-gray-200'>
                <Image
                    width={500}
                    height={300}
                    src={firstImage}
                    alt=''
                    className='transition-all aspect-square object-cover'
                />
                <Image
                    width={500}
                    height={300}
                    src={secondImage}
                    alt=''
                    className='opacity-0 group-hover:opacity-100 transition-all aspect-square object-cover absolute top-0 left-0'
                />
            </div>
        )
    }

    return (
        <div className='max-con !py-20'>
            <div className='flex items-center justify-between mb-5'>
                <div className='text-3xl'>New Arrivals</div>
                <Link href={'/shop'}>
                <div className='text-sm cursor-pointer hover:text-indigo-700'>
                    Shop all
                </div>
                </Link>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000
                    })
                ]}
                className='w-full'>
                <CarouselContent className='-ml-1'>
                    {products?.map(product => (
                        <CarouselItem
                            key={product.id}
                            className='pl-1 basis-1/2 md:basis-1/2 lg:basis-1/4'>
                            <Link href={`/shop/${product.id}`}>
                                <div className='p-1'>
                                    <div className='group relative'>
                                        <ProductImage images={product.image} />
                                        <div className='mt-4 flex flex-col'>
                                            <p className='text-md font-semibold text-gray-900 dark:text-gray-100'>
                                                IDR 256.000
                                            </p>
                                            <div>
                                                <h3 className='text-xl text-gray-700 dark:text-gray-300'>
                                                    <span
                                                        aria-hidden='true'
                                                        className='absolute inset-0'></span>
                                                    {product.title}
                                                </h3>
                                                <p className='mt-1 text-sm text-gray-500 line-clamp-2 text-ellipsis'>
                                                    {removeHtmlTags(
                                                        product.description
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
