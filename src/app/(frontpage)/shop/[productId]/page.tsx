'use client'
import { formatBlankPrice } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { Product } from '@prisma/client'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ImageSlider from '../_components/image-slider'

const DetailProductPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = React.useState<Product>()
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [checkedSize, setCheckedSize] = useState('')
    const [images, setImages] = useState<string[]>([])
    const addToCartStore = useCartStore(state => state.addToCart)
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

    const selectSize = (size: string) => {
        setCheckedSize(size)
    }

    const addToCart = () => {
        if (checkedSize === '') {
            toast('Please select size before add to cart')
            return
        }
        if (!product) return

        const productToAdd = {
            id: product.id,
            name: product.title,
            price: product.price,
            size: checkedSize,
            qty: 1, // Misalkan kita inisialisasi dengan qty 1
            image: images[0] // Misalkan kita ambil gambar pertama dari array images
        }

        addToCartStore(productToAdd)
        toast('Product added to cart')
    }
    return (
        <div className='pt-[72px] pb-20'>
            <div className='max-con'>
                <div className='flex gap-2 text-sm mt-5 mb-3 '>
                    <Link href='/'>
                        <div className=''>Home</div>
                    </Link>
                    <div className=''>/</div>
                    <Link href='/shop'>
                        <div className=''>Shop</div>
                    </Link>
                    <div className=''>/</div>
                    <div className='line-clamp-1 text-ellipsis'>{product?.title}</div>
                </div>
            </div>
            <div className='max-con'>
                <div className='grid md:grid-cols-[3fr_2fr] relative gap-3'>
                    <div className='max-md:hidden'>
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
                    <div className="md:hidden">
                        <ImageSlider images={images}/>
                    </div>
                    <div className='sticky top-[80px] border border-muted h-max p-3'>
                        <div className='flex font-extrabold text-2xl text-indigo-700 w-max '>
                            IDR {product && formatBlankPrice(product.price)}
                        </div>
                        <div className='font-semibold text-3xl'>
                            {product?.title}
                        </div>

                        <div className='flex items-center justify-between text-sm mb-2 mt-3'>
                            <div className=''>SIZES:</div>
                            {/* <div className='underline'>SIZE CHART</div> */}
                        </div>
                        <div className='grid grid-cols-4 gap-3'>
                            {selectedSizes.map((size, index) => (
                                <div
                                    key={index}
                                    className={`border px-3 py-1 text-center cursor-pointer hover:bg-muted relative ${
                                        checkedSize == size
                                            ? 'border-indigo-700'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        selectSize(size)
                                    }}>
                                    {checkedSize == size && (
                                        <div className='text-white bg-indigo-700 w-max p-1 rounded-full absolute top-[-5px] right-[-5px]'>
                                            <Check size={10} />
                                        </div>
                                    )}
                                    {size}
                                </div>
                            ))}
                        </div>
                        {product?.available ? (
                            <div
                                onClick={addToCart}
                                className='text-center p-3 bg-zinc-300 hover:bg-indigo-700 cursor-pointer hover:text-white font-bold mt-3'>
                                ADD TO BAG
                            </div>
                        ) : (
                            <div
                                className='text-center p-3 bg-muted font-bold mt-3 cursor-not-allowed'>
                                SOLD OUT
                            </div>
                        )}

                        <div className='mt-3 mb-2 font-semibold text-sm'>
                            Description :
                        </div>
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
