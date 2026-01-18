'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { Product, formatPrice } from '@/lib/content'
import { useCart } from '@/lib/cart-context'
import { calculateDiscount } from '@/lib/utils'

interface ProductCardProps {
    product: Product
    index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [imageError, setImageError] = useState(false)
    const { addItem } = useCart()

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Add first available size and color
        const size = product.sizes[0]
        const color = product.colors[0].name
        addItem(product, size, color)
    }

    const displayPrice = product.sale && product.salePrice
        ? product.salePrice
        : product.price

    const discount = product.sale && product.salePrice
        ? calculateDiscount(product.price, product.salePrice)
        : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={`/product/${product.id}`}
                className="group block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded">
                    {/* Main Image */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={imageError ? 'https://via.placeholder.com/600x800/f3f4f6/9ca3af?text=Image+Unavailable' : product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            onError={() => setImageError(true)}
                        />
                    </motion.div>

                    {/* Second Image on Hover */}
                    {product.images[1] && !imageError && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={product.images[1]}
                                alt={`${product.name} - alternate view`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                        </motion.div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.new && (
                            <span className="px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded">
                                New
                            </span>
                        )}
                        {product.sale && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                                -{discount}%
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-3 left-3 right-3 flex gap-2"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleQuickAdd}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-medium rounded hover:bg-primary hover:text-white transition-colors"
                        >
                            <ShoppingBag size={16} />
                            Quick Add
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.preventDefault()}
                            className="w-12 h-12 flex items-center justify-center bg-white/95 backdrop-blur-sm text-gray-600 rounded hover:text-red-500 transition-colors"
                            aria-label="Add to wishlist"
                        >
                            <Heart size={18} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="mt-4 space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {product.category}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                            {formatPrice(displayPrice)}
                        </span>
                        {product.sale && product.salePrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    {/* Color Swatches */}
                    <div className="flex gap-1 pt-2">
                        {product.colors.slice(0, 4).map((color) => (
                            <span
                                key={color.name}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                        {product.colors.length > 4 && (
                            <span className="text-xs text-gray-400 self-center ml-1">
                                +{product.colors.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
