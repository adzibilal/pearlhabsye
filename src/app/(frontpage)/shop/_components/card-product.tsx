import { formatBlankPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CardProductProps {
    product: Product
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
    const images = product.image as string[]
    let firstImage
    let secondImage

    if (Array.isArray(images)) {
        ;[firstImage, secondImage] = images
    }

    return (
        <Link href={`/shop/${product.id}`}>
            <div className='group relative cursor-pointer mb-2'>
                <div className='w-full overflow-hidden aspect-square bg-gray-200 relative'>
                    {!product.available && (
                        <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center z-50 bg-zinc-500/50'>
                            <div className='p-5 rounded-full font-semibold text-white bg-black/50'>
                                SOLD OUT
                            </div>
                        </div>
                    )}
                    <Image
                        width={500}
                        height={300}
                        src={firstImage ?? ''}
                        alt=''
                        className='transition-all aspect-square object-cover'
                    />
                    {secondImage && (
                        <Image
                            width={500}
                            height={300}
                            src={secondImage ?? ''}
                            alt=''
                            className='opacity-0 group-hover:opacity-100 transition-all aspect-square object-cover absolute top-0 left-0'
                        />
                    )}
                </div>
                <div className='mt-2'>
                    <div className=''>{product.title}</div>
                    <div className='flex items-end gap-1'>
                        <div className='flex font-semibold text-lg'>
                            <span className='text-[10px] mr-1'>IDR</span>
                            {formatBlankPrice(product.price)}
                        </div>
                        {/* <s>
                            <div className='flex font-semibold text-sm text-muted-foreground'>
                                <span className='text-[10px] mr-1'>IDR</span>
                                399.000
                            </div>
                        </s> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
