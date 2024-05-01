'use client'
import MidtransClient from '@/app/(frontpage)/_components/midtrans-client'
import Navbar from '@/app/checkout/_components/navbar'
import { Transaction } from '@/lib/types'
import { formatRupiah, getCourierImage } from '@/lib/utils'
import { CopyIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const PaymentPage = () => {
    const params = useParams()
    const [transaction, setTransaction] = useState<Transaction>()

    const getTransaction = async () => {
        try {
            const res = await fetch(`/api/order/${params.transactionID}`, {
                method: 'GET'
            })
            if (!res.ok) {
                throw new Error('Failed to fetch transaction')
            }
            const data = await res.json()

            setTransaction(data)
        } catch (error) {
            toast.error('Something wrong')
        }
    }

    const handleCopy = () => {
        const transactionID = transaction?.transactionID
        if (!transactionID) return

        navigator.clipboard
            .writeText(transactionID)
            .then(() => {
                toast.success('Transaction ID copied')
            })
            .catch(err => console.error('Error copying: ', err))
    }

    const handleCheckout = async (transaction: Transaction) => {
        toast.loading('Processing payment')
        try {
            const response = await fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(transaction)
            })

            const token = await response.json()
            // @ts-ignore
            window.snap.pay(token, {
                onSuccess: function (result: any) {
                    toast.success('Transaction success')
                    console.log(result)
                },
                onPending: function (result: any) {
                    toast('Transaction pending', { icon: '👋' })
                    console.log(result)
                },
                onError: function (result: any) {
                    toast.error('Transaction failed')
                    console.log(result)
                },
                onClose: function () {
                    toast('Transaction canceled', { icon: '👋' })
                }
            })
        } catch (error) {
            toast.error('Transaction failed')
        } finally {
            toast.dismiss()
            getTransaction()
        }
    }

    useEffect(() => {
        getTransaction()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Navbar /> {/* Tampilkan Navbar */}
            <div className='max-con md:py-10'>
                <div className='text-2xl font-bold'>Transaction Detail</div>
                <div className='grid grid-cols-[2fr_1fr]'>
                    <div className=''>
                        <div className='font-semibold my-2'>
                            Customer Detail
                        </div>

                        <div className='grid grid-cols-2'>
                            {/* Tampilkan detail transaksi */}
                            <div className='font-semibold'>Transaction ID</div>
                            <div className='font-semibold text-indigo-700 rounded-sm flex items-center justify-between'>
                                {transaction?.transactionID}

                                <div
                                    className='p-2 cursor-pointer'
                                    onClick={handleCopy}>
                                    <CopyIcon size={15} />
                                </div>
                            </div>
                            <div className='font-semibold'>Name</div>
                            <div className=''>{transaction?.name}</div>
                            <div className='font-semibold'>Email</div>
                            <div className=''>{transaction?.email}</div>
                            <div className='font-semibold'>Phone</div>
                            <div className=''>{transaction?.phone}</div>
                            <div className='font-semibold'>Address</div>
                            <div className=''>{transaction?.address}</div>
                        </div>
                        <div className='font-semibold my-2'>
                            Transaction Detail
                        </div>
                        {transaction?.TransactionDetail.map((detail, index) => (
                            <div
                                key={index}
                                className='flex gap-2 items-center mb-3'>
                                <Image
                                    src={detail.product.image[0]}
                                    width={200}
                                    height={200}
                                    alt=''
                                    className='w-20 h-20'
                                />
                                <div className=''>
                                    <div className='font-semibold'>
                                        {detail.product.title}
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className=''>
                                            {formatRupiah(detail.product.price)}
                                        </div>
                                        <div className=''>x</div>
                                        <div className=''>
                                            {detail.quantity} Pcs
                                        </div>
                                    </div>
                                    <div className='uppercase text-xs'>
                                        Size: {detail.size}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='font-semibold my-2'>
                            Shipping Detail
                        </div>

                        <div className='flex items-center gap-3 border rounded-md p-3'>
                            <Image
                                className='w-24'
                                src={
                                    getCourierImage(
                                        transaction?.shipper.code
                                    ) || ''
                                }
                                height={300}
                                width={300}
                                alt=''
                            />
                            <div className=''>
                                <div className='uppercase text-lg font-bold'>
                                    {transaction?.shipper.code !== 'pos' &&
                                        transaction?.shipper.code}{' '}
                                    {transaction?.shipper.service}
                                </div>
                                <div className=''>
                                    {formatRupiah(
                                        transaction?.shipper.value || 0
                                    )}
                                </div>
                                <div>
                                    {' '}
                                    {transaction?.shipper.etd}{' '}
                                    {transaction?.shipper.code !== 'pos' &&
                                        'HARI'}
                                </div>
                            </div>
                        </div>
                    </div>
                    {transaction && transaction.status === 'pending' && (
                        <div className=''>
                            <div className=''>
                                Total Payment :{' '}
                                {formatRupiah(
                                    transaction?.amount -
                                        transaction?.shipper.value || 0
                                )}
                            </div>
                            <div className=''>
                                Shipping Fee :{' '}
                                {formatRupiah(transaction?.shipper.value || 0)}
                            </div>
                            <div
                                className='bg-indigo-700 text-white rounded-md p-2 cursor-pointer'
                                onClick={() => {
                                    handleCheckout(transaction)
                                }}>
                                Payment Now
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <MidtransClient />
        </div>
    )
}

export default PaymentPage
