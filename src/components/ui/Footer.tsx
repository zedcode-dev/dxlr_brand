'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook } from 'lucide-react'
import { siteConfig } from '@/lib/content'

const footerLinks = {
    shop: [
        { name: 'All Products', href: '/shop' },
        { name: 'New Arrivals', href: '/shop?filter=new' },
        { name: 'Sale', href: '/shop?filter=sale' }
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/contact#faq' }
    ],
    legal: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Shipping Policy', href: '#' }
    ]
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            {siteConfig.name}
                        </Link>
                        <p className="mt-4 text-gray-600 max-w-sm leading-relaxed">
                            {siteConfig.tagline}. Premium fashion pieces crafted with care and intention.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="#"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-600 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Subscribe to our newsletter
                            </h3>
                            <p className="text-sm text-gray-600">
                                Get updates on new arrivals and exclusive offers.
                            </p>
                        </div>
                        <form className="flex gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-64 px-4 py-3 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="px-6 py-3 text-sm font-medium rounded transition-colors"
                                style={{ backgroundColor: '#7C9885', color: '#FFFFFF' }}
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {currentYear} {siteConfig.name}. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400">
                            Designed & Built by{' '}
                            <span
                                className="bg-clip-text text-transparent bg-[length:200%_100%] animate-shine text-lg font-black tracking-tight"
                                style={{
                                    backgroundImage: "linear-gradient(110deg, #09090b 20%, #4c1d95 38%, #ffffff 50%, #4c1d95 62%, #09090b 80%)",
                                }}
                            >
                                <a
                                    href="https://zcode.site"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ZED CODE
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
