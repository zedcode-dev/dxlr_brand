'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories, pageContent } from '@/lib/content'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CategorySection() {
    const { title, subtitle } = pageContent.home.categories
    const displayCategories = categories.slice(0, 2) // Show first 2 categories

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                {/* Header */}
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        {subtitle}
                    </p>
                </AnimatedSection>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-8 gap-6">
                    {displayCategories.map((category, index) => (
                        <AnimatedSection
                            key={category.slug}
                            delay={index * 0.2}
                            direction="up"
                        >
                            <Link
                                href={`/shop?category=${category.slug}`}
                                className="group block relative aspect-[4/3] overflow-hidden rounded-lg"
                            >
                                {/* Background Image */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={`https://images.unsplash.com/photo-${index === 0
                                            ? '1441986300917-64674bd600d8'
                                            : '1624378439575-d8705ad7ae80'
                                            }?w=800&q=80`}
                                        alt={category.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-white/80 mb-4 max-w-xs">
                                            {category.description}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                                            Shop Now
                                            <ArrowRight size={18} />
                                        </span>
                                    </motion.div>
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>

                {/* All Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {categories.map((category, index) => (
                        <AnimatedSection
                            key={category.slug}
                            delay={0.3 + index * 0.1}
                        >
                            <Link
                                href={`/shop?category=${category.slug}`}
                                className="group block p-6 bg-white rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                            >
                                <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                    {category.name}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Explore →
                                </p>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
