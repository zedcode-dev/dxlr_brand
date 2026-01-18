'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { pageContent } from '@/lib/content'

export default function Hero() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    const { title, subtitle, cta } = pageContent.home.hero

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Split Layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left Side - Content */}
                <div className="flex items-center justify-center px-6 lg:px-16 py-12 lg:py-20 bg-white order-2 lg:order-1 relative z-10">
                    <motion.div
                        style={{ opacity }}
                        className="max-w-xl"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8"
                        >
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-gray-700">New Collection 2026</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
                        >
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i === 1 ? 'text-primary' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-600 mb-8 lg:mb-10 max-w-md"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                        >
                            <Link href="/shop" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-medium rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors"
                                >
                                    {cta}
                                    <ArrowRight size={18} />
                                </motion.button>
                            </Link>

                            <Link href="/about" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium rounded-full hover:border-gray-300 transition-colors text-center"
                                >
                                    Our Story
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-wrap items-center gap-x-10 gap-y-6 mt-12 lg:mt-16 pt-10 border-t border-gray-100"
                        >
                            <div>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">50+</p>
                                <p className="text-sm text-gray-500">Countries</p>
                            </div>
                            <div>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">10K+</p>
                                <p className="text-sm text-gray-500">Happy Customers</p>
                            </div>
                            <div>
                                <p className="text-2xl lg:text-3xl font-bold text-gray-900">100%</p>
                                <p className="text-sm text-gray-500">Premium Quality</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Side - Image */}
                <div className="relative h-[45vh] lg:h-auto order-1 lg:order-2">
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
                            alt="DXLR Fashion Collection"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>

                    {/* Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="absolute bottom-6 right-6 left-6 lg:left-auto lg:w-72 bg-white/95 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Play size={20} className="text-primary ml-1" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Watch Collection</p>
                                <p className="text-sm text-gray-500">2 min preview</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Discover the story behind our latest collection of premium essentials.
                        </p>
                    </motion.div>

                    {/* Vertical Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block"
                    >
                        <span className="text-xs font-medium text-white/60 [writing-mode:vertical-rl] rotate-180 tracking-[0.3em]">
                            MADE IN EGYPT WITH ♥
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </motion.div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll</span>
            </motion.div>
        </section>
    )
}
