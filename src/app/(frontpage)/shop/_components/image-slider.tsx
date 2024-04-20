'use client'
import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import Image from 'next/image'

interface ImageSliderProps {
    images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    return (
        <div className='flex w-full overflow-x-auto'>
            {images &&
                images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        width={500}
                        height={500}
                        alt=''
                        className='aspect-square object-cover'
                    />
                ))}
        </div>
    )
}

export default ImageSlider
