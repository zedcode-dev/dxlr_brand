'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'rectangular' | 'circular'
}

export default function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
    const baseClasses = 'bg-gray-200 animate-pulse'

    const variantClasses = {
        text: 'rounded h-4 w-full',
        rectangular: 'rounded-lg',
        circular: 'rounded-full'
    }

    return (
        <div className={cn(baseClasses, variantClasses[variant], className)} />
    )
}

// Product Card Skeleton
export function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" variant="text" />
                <Skeleton className="h-4 w-1/4" variant="text" />
            </div>
        </div>
    )
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}

// Image Skeleton with fade in
export function ImageSkeleton({ className }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={cn('bg-gray-100', className)}
        />
    )
}
