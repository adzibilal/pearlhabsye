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
    total: number
    addToCart: (product: Product) => void
    removeFromCart: (productId: string, size: string) => void
    updateQty: (productId: string, size: string, newQty: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    total: 0,
    addToCart: (product: Product) => {
        const existingProductIndex = get().items.findIndex(
            (item: Product) =>
                item.id === product.id && item.size === product.size
        )

        if (existingProductIndex !== -1) {
            const updatedItems = [...get().items]
            updatedItems[existingProductIndex].qty += product.qty
            set({
                items: updatedItems,
                total: get().total + product.price * product.qty
            })
        } else {
            set(state => ({
                items: [...state.items, { ...product }],
                total: state.total + product.price * product.qty
            }))
        }
    },
    removeFromCart: (productId: string, size: string) =>
        set(state => {
            const removedItem = state.items.find(
                item => item.id === productId && item.size === size
            )
            return {
                items: state.items.filter(
                    (item: Product) =>
                        item.id !== productId || item.size !== size
                ),
                total:
                    state.total -
                    (removedItem ? removedItem.price * removedItem.qty : 0)
            }
        }),
    updateQty: (productId: string, newSize: string, newQty: number) =>
        set(state => {
            const updatedItems = state.items.map((item: Product) => {
                if (item.id === productId && item.size === newSize) {
                    return { ...item, qty: newQty }
                }
                return item
            })

            const updatedTotal = updatedItems.reduce((acc, item) => {
                return acc + item.price * item.qty
            }, 0)

            return {
                items: updatedItems,
                total: updatedTotal
            }
        }),
    clearCart: () => set({ items: [], total: 0 })
}))
