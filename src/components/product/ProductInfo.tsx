'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Check, ChevronDown, Truck, RefreshCw, Shield } from 'lucide-react'
import { Product, formatPrice } from '@/lib/content'
import { useCart } from '@/lib/cart-context'
import { calculateDiscount } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface ProductInfoProps {
    product: Product
}

type AccordionSection = 'description' | 'care' | 'shipping' | null

export default function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [quantity, setQuantity] = useState(1)
    const [activeAccordion, setActiveAccordion] = useState<AccordionSection>('description')
    const [isAdded, setIsAdded] = useState(false)
    const [sizeError, setSizeError] = useState(false)

    const { addItem } = useCart()

    const displayPrice = product.sale && product.salePrice ? product.salePrice : product.price
    const discount = product.sale && product.salePrice
        ? calculateDiscount(product.price, product.salePrice)
        : 0

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true)
            return
        }

        addItem(product, selectedSize, selectedColor.name, quantity)
        setIsAdded(true)

        setTimeout(() => {
            setIsAdded(false)
        }, 2000)
    }

    const toggleAccordion = (section: AccordionSection) => {
        setActiveAccordion(activeAccordion === section ? null : section)
    }

    return (
        <div className="space-y-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
                <span className="hover:text-gray-700 cursor-pointer">Shop</span>
                <span className="mx-2">/</span>
                <span className="hover:text-gray-700 cursor-pointer">{product.category}</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.name}</span>
            </div>

            {/* Title & Price */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    {product.new && (
                        <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-medium rounded">
                            New
                        </span>
                    )}
                    {product.sale && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
                            -{discount}% Off
                        </span>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                </h1>
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-semibold text-gray-900">
                        {formatPrice(displayPrice)}
                    </span>
                    {product.sale && product.salePrice && (
                        <span className="text-lg text-gray-400 line-through">
                            {formatPrice(product.price)}
                        </span>
                    )}
                </div>
            </div>

            {/* Color Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Color: <span className="font-normal text-gray-600">{selectedColor.name}</span>
                </label>
                <div className="flex gap-3">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === color.name
                                ? 'border-gray-900 scale-110'
                                : 'border-gray-200 hover:border-gray-400'
                                }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        >
                            {selectedColor.name === color.name && (
                                <Check size={16} className={`mx-auto ${color.hex === '#FFFFFF' ? 'text-gray-900' : 'text-white'
                                    }`} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selector */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-900">
                        Size {sizeError && <span className="text-red-500 ml-2">Please select a size</span>}
                    </label>
                    <button className="text-sm text-gray-500 underline hover:text-gray-700">
                        Size Guide
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => {
                                setSelectedSize(size)
                                setSizeError(false)
                            }}
                            className="min-w-[50px] px-4 py-3 border rounded text-sm font-medium transition-all"
                            style={selectedSize === size
                                ? { backgroundColor: '#111827', borderColor: '#111827', color: '#FFFFFF' }
                                : { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', color: '#4B5563' }
                            }
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        +
                    </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1"
                    icon={isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                    iconPosition="left"
                >
                    {isAdded ? 'Added to Cart!' : 'Add to Cart'}
                </Button>

                {/* Wishlist */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 transition-colors"
                    aria-label="Add to wishlist"
                >
                    <Heart size={20} />
                </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100">
                <div className="text-center">
                    <Truck size={20} className="mx-auto mb-2 text-primary" />
                    <p className="text-xs text-gray-600">Free Shipping $200+</p>
                </div>
                <div className="text-center">
                    <RefreshCw size={20} className="mx-auto mb-2 text-primary" />
                    <p className="text-xs text-gray-600">30-Day Returns</p>
                </div>
                <div className="text-center">
                    <Shield size={20} className="mx-auto mb-2 text-primary" />
                    <p className="text-xs text-gray-600">2-Year Warranty</p>
                </div>
            </div>

            {/* Accordions */}
            <div className="space-y-4">
                {/* Description */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleAccordion('description')}
                        className="w-full flex items-center justify-between py-4"
                    >
                        <span className="font-medium text-gray-900">Description</span>
                        <motion.span
                            animate={{ rotate: activeAccordion === 'description' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={18} className="text-gray-400" />
                        </motion.span>
                    </button>
                    <AnimatePresence>
                        {activeAccordion === 'description' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pb-4 text-gray-600 leading-relaxed">
                                    <p className="mb-4">{product.description}</p>
                                    <ul className="space-y-2">
                                        {product.details.map((detail, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 text-sm">
                                        <strong>Material:</strong> {product.material}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Care Instructions */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleAccordion('care')}
                        className="w-full flex items-center justify-between py-4"
                    >
                        <span className="font-medium text-gray-900">Care Instructions</span>
                        <motion.span
                            animate={{ rotate: activeAccordion === 'care' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={18} className="text-gray-400" />
                        </motion.span>
                    </button>
                    <AnimatePresence>
                        {activeAccordion === 'care' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <ul className="pb-4 space-y-2 text-gray-600">
                                    {product.care.map((instruction, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>{instruction}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Shipping */}
                <div className="border-b border-gray-100">
                    <button
                        onClick={() => toggleAccordion('shipping')}
                        className="w-full flex items-center justify-between py-4"
                    >
                        <span className="font-medium text-gray-900">Shipping & Returns</span>
                        <motion.span
                            animate={{ rotate: activeAccordion === 'shipping' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={18} className="text-gray-400" />
                        </motion.span>
                    </button>
                    <AnimatePresence>
                        {activeAccordion === 'shipping' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pb-4 space-y-3 text-gray-600">
                                    <p>Free standard shipping on orders over $200.</p>
                                    <p>Standard shipping: 3-5 business days</p>
                                    <p>Express shipping: 1-2 business days</p>
                                    <p>We accept returns within 30 days of delivery for unworn items in original condition with tags attached.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
