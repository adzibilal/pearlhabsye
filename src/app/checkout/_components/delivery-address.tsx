'use client'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import toast from 'react-hot-toast'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { formatRupiah, getCourierImage } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { useTransactionStore } from '@/store/useTransactionStore'
import { CheckIcon } from 'lucide-react'

interface provinceListInterface {
    province_id: string
    province: string
}

interface cityListInterface {
    city_id: string
    province_id: string
    province: string
    type: string
    city_name: string
    postal_code: string
}

interface shipperList {
    code: string
    name: string
    costs: costsList[]
}

interface costsList {
    service: string
    description: string
    cost: costList[]
}

interface costList {
    value: number
    etd: string
    note: string
}

const DeliveryAddress = () => {
    const { setAddress, setProvinceId, setCityId, setShipper } =
        useTransactionStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [provinces, setProvinces] = useState<provinceListInterface[]>([])
    const [cities, setCities] = useState<cityListInterface[]>([])
    const [shipper, setShipperList] = useState<shipperList[]>([])
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const selectedShipper = useTransactionStore.getState().shipper

    useEffect(() => {
        getProvince()
    }, [])

    const getProvince = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/ongkir/province', {
                method: 'GET'
            })
            const data = await response.json()
            if (!response.ok) {
                toast.error('Something Wrong')
                return
            }
            setProvinces(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching provinces:', error)
            setIsLoading(false)
        }
    }

    const getCity = async (provinceId: string | number) => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/ongkir/city/${provinceId}`, {
                method: 'GET'
            })
            const data = await response.json()
            if (!response.ok) {
                toast.error('Something Wrong')
                return
            }
            setCities(data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching cities:', error)
            setIsLoading(false)
        }
    }

    const getCost = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `/api/ongkir/cost?destination=${selectedCity}`,
                {
                    method: 'GET'
                }
            )
            const data = await response.json()
            if (!response.ok) {
                toast.error('Something Wrong')
                return
            }
            setShipperList(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching cost:', error)
        }
    }
    const handleProvinceChange = (value: string) => {
        setShipperList([])
        setCities([])
        setSelectedProvince(value)
        setProvinceId(value)
        getCity(value)
        setShipper(null)
    }
    const handleCityChange = (value: string) => {
        setShipperList([])
        setSelectedCity(value)
        setCityId(value)
        setShipper(null)
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setAddress(value)
    }

    useEffect(() => {
        getCost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    const toggleLoading = () => {
        if (isLoading) {
            toast.loading('Loading...')
        } else {
            toast.dismiss()
        }
    }

    const handleSelectCost = (shipper: any, cost: any) => {
        const obj = {
            code: shipper.code,
            service: cost.service,
            description: cost.description,
            value: cost.cost[0].value,
            etd: cost.cost[0].etd,
            note: cost.cost[0].note,
        }
        setShipper(obj)
    }

    useEffect(() => {
        toggleLoading()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <div>
            <div className='flex flex-col gap-2 mb-3'>
                <Label>Full Address</Label>
                <Textarea
                    placeholder='Type your message here.'
                    onChange={handleAddressChange}
                />
            </div>
            <div className='flex flex-col gap-2 mb-3'>
                <Label>Province</Label>

                <Select onValueChange={handleProvinceChange}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Province' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Province</SelectLabel>
                            {provinces.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.province_id}>
                                    {item.province}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {cities.length !== 0 && (
                <div className='flex flex-col gap-2 mb-3'>
                    <Label>City</Label>
                    <Select onValueChange={handleCityChange}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select City' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>City</SelectLabel>
                                {cities.map((item, index) => (
                                    <SelectItem
                                        key={index}
                                        value={item.city_id}>
                                        {item.type} {item.city_name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )}
            {isLoading && (
                <div className='flex flex-col gap-2 mb-3'>
                    <Label>Shipper</Label>
                    <div>
                        <div className=''>
                            <div className='h-[86px] bg-zinc-100 animate-pulse w-full rounded-md mb-3'></div>
                            <div className='h-[86px] bg-zinc-100 animate-pulse w-full rounded-md mb-3'></div>
                            <div className='h-[86px] bg-zinc-100 animate-pulse w-full rounded-md mb-3'></div>
                            <div className='h-[86px] bg-zinc-100 animate-pulse w-full rounded-md mb-3'></div>
                        </div>
                    </div>
                </div>
            )}
            {shipper.length !== 0 && (
                <div className='flex flex-col gap-2 mb-3'>
                    <Label>Shipper</Label>
                    <div>
                        {shipper.map((shipperItem, shipperIndex) => (
                            <div key={shipperIndex}>
                                <div>
                                    {shipperItem.costs.map(
                                        (costItem, costIndex) => (
                                            <div
                                                key={costIndex}
                                                className='flex items-center gap-3 border rounded-md p-2 mb-2 hover:bg-zinc-50 cursor-pointer relative'
                                                onClick={() => {
                                                    handleSelectCost(
                                                        shipperItem,
                                                        costItem
                                                    )
                                                }}>
                                                {selectedShipper && shipperItem.code ===
                                                    selectedShipper.code &&
                                                    costItem.service ===
                                                        selectedShipper.service && (
                                                        <div className='bg-indigo-700 text-white rounded-full p-1 absolute right-8'>
                                                            <CheckIcon
                                                                size={13}
                                                            />
                                                        </div>
                                                    )}
                                                <Image
                                                    className='w-24'
                                                    src={
                                                        getCourierImage(
                                                            shipperItem.code
                                                        ) || ''
                                                    }
                                                    height={300}
                                                    width={300}
                                                    alt=''
                                                />
                                                <div className=''>
                                                    <div className='uppercase text-lg font-bold'>
                                                        {shipperItem.code !==
                                                            'pos' &&
                                                            shipperItem.code}{' '}
                                                        {costItem.service}
                                                    </div>

                                                    <div>
                                                        {costItem.cost.map(
                                                            (
                                                                detailItem,
                                                                detailIndex
                                                            ) => (
                                                                <div
                                                                    className='flex items-center gap-3'
                                                                    key={
                                                                        detailIndex
                                                                    }>
                                                                    <div className=''>
                                                                        {formatRupiah(
                                                                            detailItem.value
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        {' '}
                                                                        {
                                                                            detailItem.etd
                                                                        }{' '}
                                                                        {shipperItem.code !==
                                                                            'pos' &&
                                                                            'HARI'}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className='text-zinc-500'>
                                                        {costItem.description}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeliveryAddress
