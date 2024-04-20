import create from 'zustand'

interface Product {
    id: string
    name: string
    price: number
    qty: number
    size: string
    image: string
}

interface CartState {
    items: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string, size: string) => void
    updateQty: (productId: string, newQty: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addToCart: (product: Product) => {
        const existingProductIndex = get().items.findIndex(
            (item: Product) =>
                item.id === product.id && item.size === product.size
        )

        if (existingProductIndex !== -1) {
            const updatedItems = [...get().items]
            updatedItems[existingProductIndex].qty += product.qty
            set({ items: updatedItems })
        } else {
            set(state => ({ items: [...state.items, { ...product }] }))
        }
    },
    removeFromCart: (productId: string, size: string) =>
        set(state => ({
            items: state.items.filter(
                (item: Product) => item.id !== productId || item.size !== size
            )
        })),
    updateQty: (productId: string, newQty: number) =>
        set(state => ({
            items: state.items.map((item: Product) =>
                item.id === productId ? { ...item, qty: newQty } : item
            )
        })),
    clearCart: () => set({ items: [] })
}))
