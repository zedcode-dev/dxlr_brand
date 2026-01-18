'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { siteConfig } from '@/lib/content'
import { useBanner } from './PreLaunchBanner'

const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
]

export default function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { toggleCart, itemCount } = useCart()
    const { isVisible: bannerVisible } = useBanner()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm'
                    : 'bg-white/80 backdrop-blur-sm'
                    }`}
            >
                <nav className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-tight text-gray-900 hover:text-primary transition-colors"
                        >
                            {siteConfig.name}
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            {/* Cart Button */}
                            <button
                                onClick={toggleCart}
                                className="relative p-2 text-gray-700 hover:text-primary transition-colors"
                                aria-label="Open cart"
                            >
                                <ShoppingBag size={22} />
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center"
                                    >
                                        {itemCount > 9 ? '9+' : itemCount}
                                    </motion.span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 md:hidden shadow-2xl"
                        >
                            <div className="flex flex-col h-full p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-12">
                                    <span className="text-xl font-bold text-gray-900">Menu</span>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Links */}
                                <nav className="flex flex-col gap-6">
                                    <Link
                                        href="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-2xl font-medium transition-colors ${pathname === '/' ? 'text-primary' : 'text-gray-900 hover:text-primary'}`}
                                    >
                                        Home
                                    </Link>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-2xl font-medium transition-colors ${pathname === link.href ? 'text-primary' : 'text-gray-900 hover:text-primary'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>

                                {/* Footer */}
                                <div className="mt-auto pt-8 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">{siteConfig.email}</p>
                                    <div className="flex gap-4 mt-4 text-sm text-gray-500">
                                        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
