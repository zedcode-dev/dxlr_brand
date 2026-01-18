'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="text-[120px] md:text-[160px] font-bold text-gray-100 leading-none select-none">
                        404
                    </span>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn't find the page you're looking for.
                        It might have been moved or doesn't exist.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/">
                        <Button icon={<Home size={18} />} iconPosition="left">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="outline" icon={<Search size={18} />} iconPosition="left">
                            Browse Shop
                        </Button>
                    </Link>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 flex items-center justify-center gap-2 text-gray-400"
                >
                    <div className="w-8 h-px bg-gray-200" />
                    <span className="text-xs uppercase tracking-wider">DXLR</span>
                    <div className="w-8 h-px bg-gray-200" />
                </motion.div>
            </div>
        </div>
    )
}
