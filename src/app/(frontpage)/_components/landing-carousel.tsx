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

export function LandingCarousel() {
    return (
        <div className='max-con !py-20'>
            <div className='flex items-center justify-between mb-5'>
                <div className='text-3xl'>New Arrivals</div>
                <div className='text-sm cursor-pointer hover:text-indigo-700'>
                    Shop all
                </div>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000
                    })
                ]}
                className='w-full'>
                <CarouselContent className='-ml-1'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className='pl-1 basis-1/2 md:basis-1/2 lg:basis-1/4'>
                            <div className='p-1'>
                                <div className='group relative'>
                                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                                        <Image
                                            width={500}
                                            height={300}
                                            src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                                            alt='Front of men&#039;s Basic Tee in black.'
                                            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                                        />
                                    </div>
                                    <div className='mt-4 flex justify-between'>
                                        <div>
                                            <h3 className='text-sm text-gray-700'>
                                                <a href='#'>
                                                    <span
                                                        aria-hidden='true'
                                                        className='absolute inset-0'></span>
                                                    Basic Tee
                                                </a>
                                            </h3>
                                            <p className='mt-1 text-sm text-gray-500'>
                                                Black
                                            </p>
                                        </div>
                                        <p className='text-sm font-medium text-gray-900'>
                                            IDR 256.000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
