'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransactionStore } from '@/store/useTransactionStore'
import React from 'react'

const CustomerDetails = () => {
    const { setName, setPhone, setEmail } = useTransactionStore()

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setName(value)
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPhone(value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }

    return (
        <div>
            <div className='grid w-full mb-3 items-center gap-1.5'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                    type='text'
                    id='name'
                    placeholder='Full Name'
                    onChange={handleNameChange}
                />
            </div>
            <div className='grid w-full mb-3 items-center gap-1.5'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                    type='number'
                    id='phone'
                    placeholder='Phone Number'
                    onChange={handlePhoneChange}
                />
            </div>
            <div className='grid w-full mb-3 items-center gap-1.5'>
                <Label htmlFor='email'>
                    Email{' '}
                    <span className='text-[10px] text-zinc-500'>
                        (Optional)
                    </span>
                </Label>
                <Input
                    type='email'
                    id='email'
                    placeholder='Email'
                    onChange={handleEmailChange}
                />
            </div>
        </div>
    )
}

export default CustomerDetails
