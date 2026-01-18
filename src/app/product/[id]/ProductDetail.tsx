'use client'

import { Product } from '@/lib/content'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductCard from '@/components/ui/ProductCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

interface ProductDetailProps {
    product: Product
    relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Gallery */}
                    <AnimatedSection direction="left">
                        <ProductGallery images={product.images} name={product.name} />
                    </AnimatedSection>

                    {/* Info */}
                    <AnimatedSection direction="right" delay={0.2}>
                        <ProductInfo product={product} />
                    </AnimatedSection>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-24 pt-16 border-t border-gray-100">
                        <AnimatedSection className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                You Might Also Like
                            </h2>
                            <p className="text-gray-600">
                                Explore more from our {product.category.toLowerCase()} collection
                            </p>
                        </AnimatedSection>

                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct, index) => (
                                <StaggerItem key={relatedProduct.id}>
                                    <ProductCard product={relatedProduct} index={index} />
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </section>
                )}
            </div>
        </div>
    )
}
