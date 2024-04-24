import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CustomerDetails = () => {
    return (
        <div>
            <div className='grid w-full mb-3 items-center gap-1.5'>
                <Label htmlFor='name'>Full Name</Label>
                <Input type='text' id='name' placeholder='Full Name' />
            </div>
            <div className='grid w-full mb-3 items-center gap-1.5'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input type='number' id='phone' placeholder='Phone Number' />
            </div>
            <div className='grid w-full mb-3 items-center gap-1.5'>
                <Label htmlFor='email'>Email <span className='text-[10px] text-zinc-500'>(Optional)</span></Label>
                <Input type='email' id='email' placeholder='Email' />
            </div>
        </div>
    )
}

export default CustomerDetails
