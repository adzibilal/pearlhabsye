'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatRupiah } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PurchaseSummary = () => {
    const items = useCartStore((state: any) => state.items)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const updateQty = useCartStore(state => state.updateQty)

    return (
        <div>
            {items.length === 0 && (
                <div className='flex items-center justify-center p-5'>
                    No Product in cart
                </div>
            )}
            {items.map((item: any) => (
                <div key={item.id}>
                    <div className='flex gap-3 items-center pb-3 border-b border-muted'>
                        <div className=''>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={300}
                                height={300}
                                className='w-24 h-24'
                            />
                        </div>
                        <div className=''>
                            <div className='font-bold text-lg'>{item.name}</div>
                            <div className='flex gap-3 items-center cursor-pointer'>
                                <div className=''>Size {item.size}</div>
                                <div className='flex items-center gap-3'>
                                    <Label htmlFor={`qty-${item.id}`}>
                                        Qty:
                                    </Label>
                                    <Input
                                        type='number'
                                        id={`qty-${item.id}`}
                                        value={item.qty}
                                        onChange={e =>
                                            updateQty(
                                                item.id,
                                                item.size,
                                                parseInt(e.target.value)
                                            )
                                        }
                                        className='w-12 h-8'
                                    />
                                </div>
                                <div
                                    className=''
                                    onClick={() =>
                                        removeFromCart(item.id, item.size)
                                    }>
                                    <Trash2 size={14} />
                                </div>
                            </div>
                            <div className='text-sm font-semibold'>
                                {formatRupiah(item.price)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PurchaseSummary
