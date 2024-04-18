'use client'
import React, { useEffect, useState } from 'react'
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/ui/table'
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon } from '../_components/sidebar-icons'
import { Product } from '@prisma/client'
import { formatRupiah, removeHtmlTags } from '@/lib/utils'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { CardTitle } from '@/components/ui/card'

const ProductsPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<Product[]>([])

    const getProduct = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/product', {
                method: 'GET'
            })
            if (!res.ok) {
                throw new Error('Failed to fetch product')
            }
            const data = await res.json()
            setProduct(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const refresh = () => {
        getProduct()
    }

    useEffect(() => {
        getProduct()
    }, [])
    return (
        <>
            <div className='border shadow-sm rounded-lg p-2'>
                <div className='flex justify-between gap-3 items-center p-3'>
                    <CardTitle>All Product</CardTitle>
                    <Link href={'/cms/products/create'}>
                        <Button>
                            Add New Product
                            <PlusIcon size={20} className='ml-3' />
                        </Button>
                    </Link>
                </div>
                {isLoading && <p>Loading...</p>}

                {!isLoading && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=''>#</TableHead>
                                <TableHead className=''>Image</TableHead>
                                <TableHead className=''>Product</TableHead>
                                <TableHead className=''>Price</TableHead>
                                <TableHead className='text-right'>
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {Array.isArray(item.image) &&
                                        item.image.length > 0 ? (
                                            <Image
                                                src={item.image[0] as string}
                                                width={300}
                                                height={200}
                                                className='w-28 aspect-square rounded object-cover'
                                                alt={item.title}
                                            />
                                        ) : (
                                            <div className='w-28 aspect-square rounded bg-zinc-300'></div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className='font-semibold text-lg'>
                                            {item.title}
                                        </div>
                                        <div className='max-w-96 text-xs text-zinc-400 line-clamp-2'>
                                            {removeHtmlTags(item.description)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatRupiah(item.price)}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size='icon'
                                                    variant='ghost'>
                                                    <MoreHorizontalIcon className='w-4 h-4' />
                                                    <span className='sr-only'>
                                                        Actions
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem>
                                                    View Product
                                                </DropdownMenuItem>
                                                <Link
                                                    href={`/cms/products/${item.id}`}>
                                                    <DropdownMenuItem>
                                                        Edit Product
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </>
    )
}

export default ProductsPage
