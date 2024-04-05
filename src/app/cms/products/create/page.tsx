"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-dropdown-menu'
import React from 'react'

const CreateProductPage = () => {
    return (
        <div>
            <Card>
                <CardHeader className='pb-0'>
                    <CardTitle>Create Product</CardTitle>
                    <CardDescription>Fill in the details below</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label className='text-sm'>
                                Name
                            </Label>
                            <Input
                                id='name'
                                placeholder='Enter product name'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='text-sm'>
                                Description
                            </Label>
                            <Textarea
                                id='description'
                                placeholder='Enter product description'
                                required
                            />
                        </div>
                        <div className='grid gap-2 md:flex md:items-center md:gap-4'>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm'>
                                    Price
                                </Label>
                                <Input
                                    id='price'
                                    placeholder='Enter price'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm'>
                                    Image
                                </Label>
                                <Input
                                    accept='image/*'
                                    id='image'
                                    required
                                    type='file'
                                />
                            </div>
                        </div>
                    </div>
                    <Button size='lg'>Create Product</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateProductPage
