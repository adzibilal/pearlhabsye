import { JsonObject } from '@prisma/client/runtime/library'
import create from 'zustand'

interface TransactionState {
    name: string
    phone: string
    email: string
    address: string
    provinceId: string
    cityId: string
    shipper: ShipperType | null
    setName: (name: string) => void
    setPhone: (phone: string) => void
    setEmail: (email: string) => void
    setAddress: (address: string) => void
    setProvinceId: (provinceId: string) => void
    setCityId: (cityId: string) => void
    setShipper: (shipper: any) => void
    setTransactionData: (data: Partial<TransactionState>) => void
}

interface ShipperType {
    code: string
    service: string
    description: string
    value: number
    etd: string
    note: string
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
    name: '',
    phone: '',
    email: '',
    address: '',
    provinceId: '',
    cityId: '',
    shipper: null,

    setName: (name: string) => set({ name }),
    setPhone: (phone: string) => set({ phone }),
    setEmail: (email: string) => set({ email }),
    setAddress: (address: string) => set({ address }),
    setProvinceId: (provinceId: string) => set({ provinceId }),
    setCityId: (cityId: string) => set({ cityId }),
    setShipper: (shipper: ShipperType) => set({ shipper }),

    setTransactionData: (data: Partial<TransactionState>) => set(data)

    // Menambahkan fungsi lain jika diperlukan
}))
