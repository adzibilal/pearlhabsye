import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import Image from 'next/image'
import { CgShoppingBag } from 'react-icons/cg'
import { useCartStore } from '@/store/useCartStore'
import { Trash2 } from 'lucide-react'
import { formatBlankPrice, formatRupiah } from '@/lib/utils'

export function Cart() {
    const items = useCartStore((state: any) => state.items)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const updateQty = useCartStore(state => state.updateQty)
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='text-xl cursor-pointer'>
                    <CgShoppingBag />
                </div>
            </SheetTrigger>
            <SheetContent className='w-[500px] sm:w-[540px]'>
                <SheetHeader>
                    <SheetTitle>Shooping Cart</SheetTitle>
                    <SheetDescription>
                        You have {items.length} items in your cart.
                    </SheetDescription>
                </SheetHeader>
                <div className='mt-5 relative h-[77vh] overflow-y-auto pb-28'>
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
                                    <div className='font-bold text-lg'>
                                        {item.name}
                                    </div>
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
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className='w-12 h-8'
                                            />
                                        </div>
                                        <div
                                            className=''
                                            onClick={() =>
                                                removeFromCart(
                                                    item.id,
                                                    item.size
                                                )
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
                    <div className='bottom-0 w-full pb-3'>
                        <div className='flex items-end justify-between mb-3'>
                            <div className=''>Subtotal</div>
                            <div className='text-xl font-bold text-indigo-700'>IDR 1.136.000</div>
                        </div>
                        <div className='bg-indigo-700 text-white text-center py-3 cursor-pointer hover:bg-indigo-800'>Proceed to Checkout</div>
                    </div>
            </SheetContent>
        </Sheet>
    )
}
