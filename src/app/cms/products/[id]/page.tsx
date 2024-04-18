'use client'
import { Product } from '@prisma/client'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'
import TextEditor from '../../_components/text-editor'
import ImageUploader from '../../_components/image-uploader'
import Image from 'next/image'
import { icons, PlusCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'

const EditProduct = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isReady, setIsReady] = useState<boolean>()
    const [product, setProduct] = React.useState<Product>()
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [sizeInput, setSizeInput] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<string[]>([])
    const params = useParams()
    const router = useRouter()

    const getProduct = async () => {
        try {
            const res = await fetch(`/api/product/${params.id}`, {
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
            setIsReady(data.available)
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

    const handleDeleteImage = (index: number) => {
        const conf = confirm('Are you sure you want to delete this image?')
        if (!conf) return
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleImageUploaded = (imageUrl: string) => {
        setImages(prevImages => [...prevImages, imageUrl])
    }

    const handleSizeInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSizeInput(event.target.value)
    }

    const handleAddSize = () => {
        if (sizeInput.trim() !== '') {
            setSelectedSizes(prevSelectedSizes => [
                ...prevSelectedSizes,
                sizeInput.trim()
            ])
            setSizeInput('')
        }
    }

    const handleDeleteSize = (size: string) => {
        setSelectedSizes(prevSelectedSizes =>
            prevSelectedSizes.filter(s => s !== size)
        )
    }

    const handleChangeDesc = (content: string) => {
        setDescription(content)
    }

    const handleSubmit = async () => {
        try {
            // Mengambil nilai input nama, deskripsi, dan harga
            const nameInput = (
                document.getElementById('name') as HTMLInputElement
            )?.value.trim()
            const priceInput = (
                document.getElementById('price') as HTMLInputElement
            )?.value.trim()

            // Validasi input yang diperlukan
            if (!nameInput || !priceInput) {
                toast('Title and price are required!')
                return
            }

            const res = await fetch(`/api/product/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: nameInput,
                    description: description,
                    image: images, // Menyimpan array gambar
                    price: parseInt(priceInput), // Mengonversi harga ke tipe integer
                    sizes: selectedSizes, // Menyimpan array ukuran yang diceklis
                    available: isReady
                })
            })

            if (!res.ok) {
                throw new Error('Failed to update product')
            }
            toast.success('Product updated successfully')
            router.push('/cms/products')
        } catch (error) {
            toast.error('Failed to update product')
        }
    }

    const handleDelete = async () => {
        const conf = confirm('Are you sure you want to delete this product?')
        if (!conf) return
        // Delete product
        try {
            const res = await fetch(`/api/product/${params.id}`, {
                method: 'DELETE'
            })
            if (!res.ok) {
                throw new Error('Failed to delete product')
            }
            toast.success('Product deleted successfully')
            router.push('/cms/products')
        } catch (error) {
            toast.error('Failed to delete product')
        }
    }
    const toggleSwitch = () => {
        setIsReady(!isReady)
    }
    return (
        <div className=''>
            {!isLoading ? (
                <Card>
                    <div className='p-5 flex items-center justify-between'>
                        <CardTitle>Edit Product</CardTitle>

                        <div className='flex items-center gap-3'>
                            <Button
                                onClick={handleDelete}
                                variant={'destructive'}>
                                Delete Product
                            </Button>
                        </div>
                    </div>
                    <CardContent className='space-y-4'>
                        <div className='flex gap-3 items-center flex-wrap'>
                            {images.map((image, index) => (
                                <div key={image} className='relative'>
                                    <div
                                        onClick={() => handleDeleteImage(index)}
                                        className='absolute right-3 top-3 rounded-full text-white bg-red-600 p-2 cursor-pointer'>
                                        <Trash2 size={15} />
                                    </div>
                                    <Image
                                        src={image}
                                        width={600}
                                        height={500}
                                        alt='product-image'
                                        className='w-60 aspect-video rounded-md object-cover'
                                    />
                                </div>
                            ))}
                            <ImageUploader onChange={handleImageUploaded} />
                        </div>
                        <div className='grid gap-4'>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm'>Name</Label>
                                <Input
                                    id='name'
                                    placeholder='Enter product name'
                                    value={product?.title}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm'>Description</Label>
                                <TextEditor
                                    onChange={handleChangeDesc}
                                    value={product?.description}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm'>Price</Label>
                                <Input
                                    id='price'
                                    placeholder='Enter price'
                                    value={product?.price}
                                    required
                                />
                            </div>
                            <Label className='text-sm'>Size</Label>
                            <div className='flex items-center gap-3'>
                                {selectedSizes.map((size, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200'>
                                        <Label>{size}</Label>
                                        <div
                                            onClick={() =>
                                                handleDeleteSize(size)
                                            }
                                            className='cursor-pointer'>
                                            <Trash2 size={15} />
                                        </div>
                                    </div>
                                ))}
                                <div className='flex gap-3 items-center'>
                                    <Input
                                        placeholder='Enter size'
                                        value={sizeInput}
                                        onChange={handleSizeInputChange}
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                handleAddSize()
                                            }
                                        }}
                                    />
                                    <Button
                                        size={'icon'}
                                        onClick={handleAddSize}>
                                        <PlusCircle
                                            className='mx-3'
                                            size={20}
                                        />
                                    </Button>
                                </div>
                            </div>
                            <div className='mb-5 mt-3'>
                                <div className='flex items-center space-x-2'>
                                    <Label>Product Ready</Label>
                                    <Switch
                                        id='airplane-mode'
                                        checked={isReady}
                                        onClick={() => toggleSwitch()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Link href={'/cms/products'}>
                                <Button size='lg' variant='secondary'>
                                    Cancel
                                </Button>
                            </Link>
                            <Button size='lg' onClick={handleSubmit}>
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className=''>Loading...</div>
            )}
        </div>
    )
}

export default EditProduct
