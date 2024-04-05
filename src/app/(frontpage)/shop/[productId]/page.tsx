'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DetailProductPage = () => {
    const handleCheckout = async () => {
        const data = {
            id: 'ITEM1',
            price: 1000,
            quantity: 1,
            name: 'Midtrans Bear',
            category: 'Toys'
        }

        const response = await fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(data)
        })

        const token = await response.json()
        // @ts-ignore
        window.snap.pay(token, {
            onSuccess: function (result: any) {
                console.log('success')
                console.log(result)
            },
            onPending: function (result: any) {
                console.log('pending')
                console.log(result)
            },
            onError: function (result: any) {
                console.log('error')
                console.log(result)
            },
            onClose: function () {
                console.log(
                    'customer closed the popup without finishing the payment'
                )
            }
        })
    }
    return (
        <div className='pt-[72px] pb-20'>
            <div className='max-con'>
                <div className='flex gap-2 text-sm mt-5 mb-1'>
                    <Link href='/'>
                        <div className=''>Home</div>
                    </Link>
                    <div className=''>/</div>
                    <Link href='/shop'>
                        <div className=''>Shop</div>
                    </Link>
                    <div className=''>/</div>
                    <div className=''>Blessed Oversized Boxy Tee</div>
                </div>
            </div>
            <div className='max-con'>
                <div className='grid grid-cols-[3fr_2fr] relative gap-3'>
                    <div className=''>
                        <Image
                            width={1000}
                            height={300}
                            src='/images/product1.png'
                            alt=''
                            className='aspect-[3/4] object-cover'
                        />
                        <Image
                            width={1000}
                            height={300}
                            src='/images/product2.png'
                            alt=''
                            className='aspect-[3/4] object-cover'
                        />
                        <Image
                            width={1000}
                            height={300}
                            src='/images/product1.png'
                            alt=''
                            className='aspect-[3/4] object-cover'
                        />
                    </div>
                    <div className='sticky top-[80px] bg-muted h-max p-3'>
                        <div className='flex font-semibold text-2xl'>
                            IDR 178.699
                        </div>
                        <div className='font-semibold text-3xl'>
                            Blessed Oversized Boxy Tee
                        </div>

                        <div className='flex items-center justify-between text-sm mb-2 mt-3'>
                            <div className=''>SIZES:</div>
                            <div className='underline'>SIZE CHART</div>
                        </div>
                        <div className='grid grid-cols-4 gap-3'>
                            <div className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                XS
                            </div>
                            <div className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                S
                            </div>
                            <div className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                M
                            </div>
                            <div className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                L
                            </div>
                            <div className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                XL
                            </div>
                            <div className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                XXL
                            </div>
                        </div>
                        <div
                            onClick={handleCheckout}
                            className='text-center p-3 bg-zinc-300 hover:bg-indigo-700 cursor-pointer hover:text-white font-bold mt-3'>
                            ADD TO BAG
                        </div>

                        <div className='mt-3 mb-2'>Description :</div>
                        <div className='text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, quod. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam, quod. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, quod. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam, quod. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, quod. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam, quod. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, quod. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam, quod. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, qu
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProductPage
