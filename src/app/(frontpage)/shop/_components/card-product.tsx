import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CardProduct = () => {
    return (
        <Link href='/shop/aksjdaks'>
            <div className='group relative cursor-pointer mb-2'>
                <div className='w-full overflow-hidden aspect-[3/4] bg-gray-200'>
                    <Image
                        width={500}
                        height={300}
                        src='/images/product1.png'
                        alt=''
                        className='transition-all aspect-[3/4] object-cover'
                    />
                    <Image
                        width={500}
                        height={300}
                        src='/images/product2.png'
                        alt=''
                        className='opacity-0 group-hover:opacity-100 transition-all aspect-[3/4] object-cover absolute top-0 left-0'
                    />
                </div>
                <div className='mt-2'>
                    <div className=''>Blessed Oversized Boxy Tee </div>
                    <div className='flex items-end gap-1'>
                        <div className='flex font-semibold text-lg'>
                            <span className='text-[10px] mr-1'>IDR</span>178.699
                        </div>
                        <s>
                            <div className='flex font-semibold text-sm text-muted-foreground'>
                                <span className='text-[10px] mr-1'>IDR</span>
                                399.000
                            </div>
                        </s>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct
