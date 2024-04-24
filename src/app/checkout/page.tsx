import React from 'react'
import Navbar from './_components/navbar'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import PurchaseSummary from './_components/purchase-summary'
import CustomerDetails from './_components/customer-details'
import DeliveryAddress from './_components/delivery-address'

const page = () => {
    return (
        <div>
            <Navbar />
            <div className='max-con'>
                <div className='grid grid-cols-[2fr_1fr] gap-3 mt-16'>
                    <Accordion
                        type='multiple'
                        defaultValue={['item-1', 'item-2', 'item-3', 'item-4']}
                        className='w-full'>
                        <AccordionItem value='item-1' disabled>
                            <AccordionTrigger className='text-xl font-semibold'>
                                Purchase Summary
                            </AccordionTrigger>
                            <AccordionContent>
                                <PurchaseSummary />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-2' disabled>
                            <AccordionTrigger className='text-xl font-semibold'>
                                Customer Details
                            </AccordionTrigger>
                            <AccordionContent>
                                <CustomerDetails />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-3' disabled>
                            <AccordionTrigger className='text-xl font-semibold'>
                                Delivery Address
                            </AccordionTrigger>
                            <AccordionContent>
                                <DeliveryAddress />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-4' disabled>
                            <AccordionTrigger className='text-xl font-semibold'>
                                Delivery Method
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes. Its animated by default, but you can
                                disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default page
