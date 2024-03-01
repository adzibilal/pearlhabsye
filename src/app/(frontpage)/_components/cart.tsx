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

export function Cart() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='text-xl cursor-pointer'>
                    <CgShoppingBag />
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shooping Cart</SheetTitle>
                    <SheetDescription>
                        You have 0 items in your cart.
                    </SheetDescription>
                </SheetHeader>
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type='submit'>Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}
