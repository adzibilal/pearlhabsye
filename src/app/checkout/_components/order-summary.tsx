'use client'
import { formatRupiah } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface Errors {
    name?: string
    phone?: string
    email?: string
    address?: string
    total?: string
    shipper?: string
    items?: string
}

interface Payload {
    name: string
    phone: string
    email: string
    address: string
    amount: number
    shipper: {
        code: string
        service: string
        description: string
        value: number
        etd: string
        note: string
    }
    products: { productId: string; size: string; quantity: number }[]
}

const OrderSummary = () => {
    const { name, phone, email, address, shipper } = useTransactionStore()
    const { total, items } = useCartStore()
    const router = useRouter()

    const validateOrder = (
        name: string,
        phone: string,
        email: string,
        address: string,
        total: number,
        shipper: any,
        items: string | any[]
    ) => {
        const errors: Errors = {}

        // Validasi nama
        if (!name.trim()) {
            errors.name = 'Nama harus diisi'
        }

        // Validasi nomor telepon
        if (!phone.trim()) {
            errors.phone = 'Nomor telepon harus diisi'
        } else if (!/^\d+$/.test(phone)) {
            errors.phone = 'Nomor telepon hanya boleh berisi angka'
        }

        // Validasi email
        if (!email.trim()) {
            errors.email = 'Email harus diisi'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email tidak valid'
        }

        // Validasi alamat
        if (!address.trim()) {
            errors.address = 'Alamat harus diisi'
        }

        // Validasi total
        if (isNaN(total) || total <= 0) {
            errors.total = 'Total tidak valid'
        }

        // Validasi pengiriman
        if (!shipper) {
            errors.shipper = 'Pilih metode pengiriman'
        }

        // Validasi barang dalam keranjang
        if (items.length === 0) {
            errors.items = 'Keranjang belanja kosong'
        }

        return errors
    }

    const handleSubmitOrder = async () => {
        const conf = confirm('Order sekarang?')

        if (!conf) return

        const errors = validateOrder(
            name,
            phone,
            email,
            address,
            total,
            shipper,
            items
        )
        if (Object.keys(errors).length === 0) {
            // Kirim pesanan
            const formattedItems = items.map(item => ({
                productId: item.id,
                size: item.size,
                quantity: item.qty
            }))

            const payload: Payload = {
                name,
                phone,
                email,
                address,
                amount: total + (shipper ? shipper.value : 0),
                shipper: shipper!,
                products: formattedItems
            }
            console.error(payload)

            try {
                const res = await fetch('/api/order', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch product')
                }

                const data = await res.json()
                toast.success('Transaction Success')
                router.push(`/payment/${data.transactionID}`)
            } catch (error) {
                toast.error('Error Create Transaction')
            }
        } else {
            // Tampilkan pesan kesalahan
            Object.values(errors).forEach(error => toast.error(error))
        }
    }
    return (
        <div className='border h-max md:sticky top-5'>
            <div className='text-xl font-bold py-3 px-5 border-b'>
                Order Summary
            </div>
            <div className='px-5 py-3'>
                <div className='flex justify-between items-center'>
                    <div className=''>Subtotal</div>
                    <div className='font-semibold'>{formatRupiah(total)}</div>
                </div>
                {shipper && (
                    <>
                        <div className='flex justify-between items-center'>
                            <div className=''>Shipping</div>
                            <div className='font-semibold'>
                                {formatRupiah(shipper.value)}
                            </div>
                        </div>
                        <div className='flex justify-between items-center text-2xl font-bold mt-2'>
                            <div className=''>Total to Pay</div>
                            <div className=''>
                                {formatRupiah(total + shipper.value)}
                            </div>
                        </div>
                    </>
                )}
                <div
                    className='bg-indigo-700 hover:bg-indigo-600 text-white p-2 text-center cursor-pointer mt-3'
                    onClick={handleSubmitOrder}>
                    Order Now
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
