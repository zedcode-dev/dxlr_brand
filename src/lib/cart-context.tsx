'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product } from './content'

// Cart Item Interface
export interface CartItem {
    product: Product
    size: string
    color: string
    quantity: number
    id: string // unique identifier: productId-size-color
}

// Cart State
interface CartState {
    items: CartItem[]
    isOpen: boolean
}

// Cart Actions
type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] }

// Initial State
const initialState: CartState = {
    items: [],
    isOpen: false
}

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            )

            if (existingItemIndex > -1) {
                // Item exists, update quantity
                const updatedItems = [...state.items]
                updatedItems[existingItemIndex].quantity += action.payload.quantity
                return { ...state, items: updatedItems, isOpen: true }
            }

            // New item
            return {
                ...state,
                items: [...state.items, action.payload],
                isOpen: true
            }
        }

        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        }

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload
            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== id)
                }
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            }
        }

        case 'CLEAR_CART': {
            return { ...state, items: [] }
        }

        case 'TOGGLE_CART': {
            return { ...state, isOpen: !state.isOpen }
        }

        case 'OPEN_CART': {
            return { ...state, isOpen: true }
        }

        case 'CLOSE_CART': {
            return { ...state, isOpen: false }
        }

        case 'LOAD_CART': {
            return { ...state, items: action.payload }
        }

        default:
            return state
    }
}

// Context Type
interface CartContextType {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: Product, size: string, color: string, quantity?: number) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
    total: number
    itemCount: number
    subtotal: number
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Local Storage Key
const CART_STORAGE_KEY = 'dxlr-cart'

// Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart)
                dispatch({ type: 'LOAD_CART', payload: parsedCart })
            } catch (error) {
                console.error('Failed to parse cart from localStorage:', error)
            }
        }
    }, [])

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    }, [state.items])

    // Calculate totals
    const subtotal = state.items.reduce((sum, item) => {
        const price = item.product.sale && item.product.salePrice
            ? item.product.salePrice
            : item.product.price
        return sum + price * item.quantity
    }, 0)

    const total = subtotal // Add shipping, taxes, etc. here if needed

    const itemCount = state.items.reduce((count, item) => count + item.quantity, 0)

    // Actions
    const addItem = (product: Product, size: string, color: string, quantity = 1) => {
        const id = `${product.id}-${size}-${color}`
        dispatch({
            type: 'ADD_ITEM',
            payload: { product, size, color, quantity, id }
        })
    }

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    }

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' })
    }

    const openCart = () => {
        dispatch({ type: 'OPEN_CART' })
    }

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' })
    }

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                isOpen: state.isOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                toggleCart,
                openCart,
                closeCart,
                total,
                itemCount,
                subtotal
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

// Custom Hook
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
