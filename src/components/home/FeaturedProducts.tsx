'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts, pageContent } from '@/lib/content'
import ProductCard from '@/components/ui/ProductCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'

export default function FeaturedProducts() {
    const featuredProducts = getFeaturedProducts()
    const { title, subtitle } = pageContent.home.featured

    return (
        <section className="py-24 bg-white">
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

                {/* Products Grid */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {featuredProducts.map((product, index) => (
                        <StaggerItem key={product.id}>
                            <ProductCard product={product} index={index} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* View All Button */}
                <AnimatedSection delay={0.4} className="text-center mt-12">
                    <Link href="/shop">
                        <Button
                            variant="outline"
                            icon={<ArrowRight size={18} />}
                        >
                            View All Products
                        </Button>
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}
