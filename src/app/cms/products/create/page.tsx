'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import TextEditor from '../../_components/text-editor'
import ImageUploader from '../../_components/image-uploader'
import Image from 'next/image'
import { icons, PlusCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const CreateProductPage = () => {
    const [images, setImages] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [sizeInput, setSizeInput] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

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

    const handleDeleteImage = (index: number) => {
        const conf = confirm('Are you sure you want to delete this image?')
        if (!conf) return
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
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

            // Membuat objek data
            const payload = {
                title: nameInput,
                description: description,
                image: images, // Menyimpan array gambar
                price: parseInt(priceInput), // Mengonversi harga ke tipe integer
                sizes: selectedSizes // Menyimpan array ukuran yang diceklis
            }

            const res = await fetch('/api/product', {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                throw new Error('Failed to fetch product')
            }
            router.push('/cms/products')
            toast.success('Product Created')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.success('Failed create product')
            console.error(error)
        }
    }

    return (
        <Card>
            <CardHeader className='pb-0'>
                <CardTitle className='mb-5'>Add New Product</CardTitle>
            </CardHeader>
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
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-sm'>Description</Label>
                        <TextEditor onChange={handleChangeDesc}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-sm'>Price</Label>
                        <Input id='price' placeholder='Enter price' required />
                    </div>
                    <Label className='text-sm'>Size</Label>
                    <div className='flex items-center gap-3'>
                        {selectedSizes.map((size, index) => (
                            <div
                                key={index}
                                className='flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200'>
                                <Label>{size}</Label>
                                <div
                                    onClick={() => handleDeleteSize(size)}
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
                            <Button size={'icon'} onClick={handleAddSize}>
                                <PlusCircle className='mx-3' size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
                <Button size='lg' onClick={handleSubmit}>
                    Create Product
                </Button>
            </CardContent>
        </Card>
    )
}

export default CreateProductPage
