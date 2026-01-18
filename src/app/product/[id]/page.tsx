import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { products, getProductById, siteConfig, formatPrice } from '@/lib/content'
import ProductDetail from './ProductDetail'

// Generate static params for all products
export function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }))
}

// Generate metadata for each product
export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params
    const product = getProductById(id)

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} | ${siteConfig.name}`,
            description: product.description,
            images: [product.images[0]],
        },
    }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = getProductById(id)

    if (!product) {
        notFound()
    }

    // Get related products (same category, excluding current)
    const relatedProducts = products
        .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 4)

    return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
