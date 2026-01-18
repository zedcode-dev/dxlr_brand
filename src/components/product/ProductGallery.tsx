'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface ProductGalleryProps {
    images: string[]
    name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100
        setMousePosition({ x, y })
    }

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div
                className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                        style={{
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <Image
                            src={images[activeIndex]}
                            alt={`${name} - Image ${activeIndex + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} />
                    <span>Hover to zoom</span>
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-all shadow-lg"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-all shadow-lg"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative w-20 h-24 rounded overflow-hidden transition-all ${activeIndex === index
                                    ? 'ring-2 ring-primary ring-offset-2'
                                    : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${name} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
