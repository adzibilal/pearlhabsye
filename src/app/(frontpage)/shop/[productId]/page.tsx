'use client'
import { formatBlankPrice } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const DetailProductPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = React.useState<Product>()
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [sizeInput, setSizeInput] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<string[]>([])
    const params = useParams()

    const getProduct = async () => {
        try {
            const res = await fetch(`/api/product/${params.productId}`, {
                method: 'GET'
            })
            if (!res.ok) {
                throw new Error('Failed to fetch product')
            }
            const data = await res.json()
            const images = data.image
            const sizes = data.sizes
            setProduct(data)
            if (Array.isArray(images)) {
                setImages(data.image)
            }
            if (Array.isArray(sizes)) {
                setSelectedSizes(data.sizes)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error('Failed to fetch product')
            console.error(error)
        }
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <div className=''>{product?.title}</div>
                </div>
            </div>
            <div className='max-con'>
                <div className='grid grid-cols-[3fr_2fr] relative gap-3'>
                    <div className=''>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                width={1000}
                                height={300}
                                src={image}
                                alt=''
                                className=''
                            />
                        ))}
                    </div>
                    <div className='sticky top-[80px] bg-muted h-max p-3'>
                        <div className='flex font-semibold text-2xl'>
                            IDR {product && formatBlankPrice(product.price)}
                        </div>
                        <div className='font-semibold text-3xl'>
                            {product?.title}
                        </div>

                        <div className='flex items-center justify-between text-sm mb-2 mt-3'>
                            <div className=''>SIZES:</div>
                            <div className='underline'>SIZE CHART</div>
                        </div>
                        <div className='grid grid-cols-4 gap-3'>
                            {selectedSizes.map((size, index) => (
                                <div
                                    key={index}
                                    className='border px-3 py-1 text-center cursor-pointer hover:bg-zinc-200'>
                                    {size}
                                </div>
                            ))}
                        </div>
                        <div
                            onClick={handleCheckout}
                            className='text-center p-3 bg-zinc-300 hover:bg-indigo-700 cursor-pointer hover:text-white font-bold mt-3'>
                            ADD TO BAG
                        </div>

                        <div className='mt-3 mb-2'>Description :</div>
                        {product && product.description && (
                            <div
                                className='text-sm desc-detail'
                                dangerouslySetInnerHTML={{
                                    __html: product.description
                                }}></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProductPage
