'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Check, Loader2, Mail, Phone, MapPin, ChevronDown } from 'lucide-react'
import { pageContent, siteConfig, faqs } from '@/lib/content'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { wait } from '@/lib/utils'

// Form Validation Schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)

        // Simulate API call
        await wait(1500)

        console.log('Form submitted:', data)
        setIsSubmitting(false)
        setIsSuccess(true)
        reset()

        setTimeout(() => {
            setIsSuccess(false)
        }, 5000)
    }

    const { title, subtitle, form } = pageContent.contact

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <AnimatedSection direction="left">
                        <div className="bg-white p-8 rounded-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send us a Message
                            </h2>

                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check size={32} className="text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Message Sent!
                                        </h3>
                                        <p className="text-gray-600">
                                            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {form.name}
                                            </label>
                                            <input
                                                {...register('name')}
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${errors.name ? 'border-red-300' : 'border-gray-200'
                                                    }`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {form.email}
                                            </label>
                                            <input
                                                {...register('email')}
                                                type="email"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${errors.email ? 'border-red-300' : 'border-gray-200'
                                                    }`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {form.subject}
                                            </label>
                                            <input
                                                {...register('subject')}
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors ${errors.subject ? 'border-red-300' : 'border-gray-200'
                                                    }`}
                                                placeholder="How can we help?"
                                            />
                                            {errors.subject && (
                                                <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {form.message}
                                            </label>
                                            <textarea
                                                {...register('message')}
                                                rows={5}
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none ${errors.message ? 'border-red-300' : 'border-gray-200'
                                                    }`}
                                                placeholder="Tell us more about your inquiry..."
                                            />
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            fullWidth
                                            loading={isSubmitting}
                                            icon={<Send size={18} />}
                                        >
                                            {form.button}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </AnimatedSection>

                    {/* Contact Info & FAQ */}
                    <div className="space-y-12">
                        {/* Contact Info */}
                        <AnimatedSection direction="right">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Email</h3>
                                        <a href={`mailto:${siteConfig.email}`} className="text-gray-600 hover:text-primary transition-colors">
                                            {siteConfig.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Phone</h3>
                                        <a href={`tel:${siteConfig.phone}`} className="text-gray-600 hover:text-primary transition-colors">
                                            {siteConfig.phone}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Address</h3>
                                        <p className="text-gray-600">{siteConfig.address}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* FAQ */}
                        <AnimatedSection direction="right" delay={0.2} className="pt-8 border-t border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6" id="faq">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <span className="font-medium text-gray-900">{faq.question}</span>
                                            <motion.span
                                                animate={{ rotate: openFaq === index ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown size={18} className="text-gray-400" />
                                            </motion.span>
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-4 pb-4 text-gray-600">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    )
}
