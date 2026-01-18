'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/content'
import { slideInRight, backdrop } from '@/lib/animations'

export default function CartDrawer() {
    const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={backdrop}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={slideInRight}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} className="text-gray-900" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Your Cart ({itemCount})
                                </h2>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeCart}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close cart"
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag size={48} className="text-gray-200 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Looks like you haven&apos;t added anything to your cart yet.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={closeCart}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-primary transition-colors"
                                    >
                                        Start Shopping
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {items.map((item) => {
                                            const price = item.product.sale && item.product.salePrice
                                                ? item.product.salePrice
                                                : item.product.price

                                            return (
                                                <motion.li
                                                    key={item.id}
                                                    layout
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                                                >
                                                    {/* Image */}
                                                    <div className="relative w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <Link
                                                            href={`/product/${item.product.id}`}
                                                            onClick={closeCart}
                                                            className="text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-1"
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {item.size} / {item.color}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900 mt-2">
                                                            {formatPrice(price)}
                                                        </p>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-3 mt-3">
                                                            <div className="flex items-center border border-gray-200 rounded">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                                                    aria-label="Decrease quantity"
                                                                >
                                                                    <Minus size={14} />
                                                                </button>
                                                                <span className="w-8 text-center text-sm font-medium">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                                                                    aria-label="Increase quantity"
                                                                >
                                                                    <Plus size={14} />
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-xs text-gray-400 hover:text-red-500 transition-colors underline"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.li>
                                            )
                                        })}
                                    </AnimatePresence>
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 px-6 py-5 bg-gray-50">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">
                                    Shipping and taxes calculated at checkout.
                                </p>

                                {/* Checkout Button */}
                                <Link href="/checkout" onClick={closeCart}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 font-medium rounded flex items-center justify-center gap-2"
                                        style={{ backgroundColor: '#7C9885', color: '#FFFFFF' }}
                                    >
                                        Checkout
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </Link>

                                {/* Continue Shopping */}
                                <button
                                    onClick={closeCart}
                                    className="w-full py-3 mt-3 text-gray-600 text-sm font-medium hover:text-primary transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
