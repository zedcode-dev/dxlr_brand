'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, Loader2 } from 'lucide-react'
import { pageContent } from '@/lib/content'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { isValidEmail, wait } from '@/lib/utils'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [error, setError] = useState('')

    const { title, subtitle, placeholder, button } = pageContent.home.newsletter

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email) {
            setError('Please enter your email')
            return
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email')
            return
        }

        setStatus('loading')

        // Simulate API call
        await wait(1500)

        setStatus('success')
        setEmail('')

        // Reset after 3 seconds
        setTimeout(() => {
            setStatus('idle')
        }, 3000)
    }

    return (
        <section className="py-24 bg-primary/5">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-600 mb-8">
                            {subtitle}
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <form onSubmit={handleSubmit} className="relative">
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <div className="flex-1 relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={placeholder}
                                        disabled={status === 'loading' || status === 'success'}
                                        className={`w-full px-5 py-4 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${error
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-primary'
                                            }`}
                                    />
                                    <AnimatePresence>
                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute -bottom-6 left-0 text-sm text-red-500"
                                            >
                                                {error}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.button
                                    whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                                    whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className={`px-8 py-4 font-medium rounded-lg flex items-center justify-center gap-2 transition-all min-w-[140px] ${status === 'success'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-900 text-white hover:bg-primary'
                                        }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {status === 'loading' ? (
                                            <motion.span
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <Loader2 className="animate-spin" size={18} />
                                            </motion.span>
                                        ) : status === 'success' ? (
                                            <motion.span
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                <Check size={18} />
                                                Subscribed!
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="idle"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                {button}
                                                <Send size={16} />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </form>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <p className="mt-8 text-sm text-gray-500">
                            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
