
interface Product {
    title: string
    image: string[]
    price: number
}

interface Shipper {
    code: string
    service: string
    description: string
    value: number
    etd: string
    note: string
}

interface TransactionDetail {
    id: string
    transactionId: string
    productId: string
    quantity: number
    size: string
    createdAt: string
    updatedAt: string
    product: Product
}

export interface Transaction {
    id: string
    transactionID: string
    amount: number
    status: string
    name: string
    email: string
    phone: string
    address: string
    shipper: Shipper
    createdAt: string
    updatedAt: string
    TransactionDetail: TransactionDetail[]
}
