'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, ChevronLeft, CreditCard, Truck, Package, Loader2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, siteConfig } from '@/lib/content'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { wait } from '@/lib/utils'

// Form Schema
const checkoutSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(4, 'Zip code is required'),
    country: z.string().min(2, 'Country is required'),
    phone: z.string().min(10, 'Phone number is required'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

type Step = 'information' | 'shipping' | 'payment' | 'complete'

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState<Step>('information')
    const [isProcessing, setIsProcessing] = useState(false)
    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')

    const { items, subtotal, clearCart } = useCart()

    const shippingCost = shippingMethod === 'express' ? 15 : (subtotal >= 200 ? 0 : 10)
    const total = subtotal + shippingCost

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            country: 'Egypt',
        },
    })

    const steps = [
        { id: 'information', label: 'Information', icon: Package },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'payment', label: 'Review', icon: Package },
    ]

    const onSubmitInfo = (data: CheckoutFormData) => {
        console.log('Info:', data)
        setCurrentStep('shipping')
    }

    const handleShippingSubmit = () => {
        setCurrentStep('payment')
    }

    const handlePaymentSubmit = async () => {
        setIsProcessing(true)
        await wait(2000) // Simulate payment processing
        setIsProcessing(false)
        setCurrentStep('complete')
        clearCart()
    }

    if (items.length === 0 && currentStep !== 'complete') {
        return (
            <div className="pt-32 pb-20 text-center">
                <div className="max-w-md mx-auto px-6">
                    <Package size={48} className="mx-auto mb-6 text-gray-300" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <p className="text-gray-600 mb-8">
                        Add some items to your cart before checking out.
                    </p>
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Success Screen
    if (currentStep === 'complete') {
        return (
            <div className="pt-32 pb-20">
                <div className="max-w-md mx-auto px-6 text-center">
                    <AnimatedSection>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Check size={40} className="text-green-500" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Request Submitted!
                        </h1>
                        <p className="text-gray-600 mb-2">
                            Thank you for your interest. Your order request has been received.
                        </p>
                        <p className="text-gray-500 text-sm mb-8">
                            Our team will contact you soon to confirm availability and next steps.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <p className="text-sm text-gray-600 mb-1">Request Number</p>
                            <p className="text-lg font-mono font-medium text-gray-900">
                                #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                            </p>
                        </div>
                        <Link href="/shop">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="py-8 mb-8 border-b border-gray-200">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        {siteConfig.name}
                    </Link>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {steps.map((step, index) => {
                        const StepIcon = step.icon
                        const isActive = currentStep === step.id
                        const isPast = steps.findIndex(s => s.id === currentStep) > index

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isActive ? 'bg-gray-900 text-white' :
                                    isPast ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {isPast ? <Check size={16} /> : <StepIcon size={16} />}
                                    <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-8 h-0.5 mx-2 ${isPast ? 'bg-green-200' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {/* Information Step */}
                            {currentStep === 'information' && (
                                <motion.div
                                    key="information"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-lg p-8"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Contact Information
                                    </h2>
                                    <form onSubmit={handleSubmit(onSubmitInfo)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                {...register('email')}
                                                type="email"
                                                className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-300' : 'border-gray-200'
                                                    }`}
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-medium text-gray-900 pt-4">
                                            Shipping Address
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    First Name
                                                </label>
                                                <input
                                                    {...register('firstName')}
                                                    className={`w-full px-4 py-3 border rounded-lg ${errors.firstName ? 'border-red-300' : 'border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last Name
                                                </label>
                                                <input
                                                    {...register('lastName')}
                                                    className={`w-full px-4 py-3 border rounded-lg ${errors.lastName ? 'border-red-300' : 'border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address
                                            </label>
                                            <input
                                                {...register('address')}
                                                className={`w-full px-4 py-3 border rounded-lg ${errors.address ? 'border-red-300' : 'border-gray-200'
                                                    }`}
                                                placeholder="123 Main Street"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City
                                                </label>
                                                <input
                                                    {...register('city')}
                                                    className={`w-full px-4 py-3 border rounded-lg ${errors.city ? 'border-red-300' : 'border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    State
                                                </label>
                                                <input
                                                    {...register('state')}
                                                    className={`w-full px-4 py-3 border rounded-lg ${errors.state ? 'border-red-300' : 'border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Zip Code
                                                </label>
                                                <input
                                                    {...register('zipCode')}
                                                    className={`w-full px-4 py-3 border rounded-lg ${errors.zipCode ? 'border-red-300' : 'border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    {...register('phone')}
                                                    className={`w-full px-4 py-3 border rounded-lg ${errors.phone ? 'border-red-300' : 'border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6">
                                            <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                                <ChevronLeft size={18} />
                                                Return to Shop
                                            </Link>
                                            <Button type="submit">
                                                Continue to Shipping
                                            </Button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {/* Shipping Step */}
                            {currentStep === 'shipping' && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-lg p-8"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Shipping Method
                                    </h2>
                                    <div className="space-y-4">
                                        <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'
                                            }`}>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'standard'}
                                                    onChange={() => setShippingMethod('standard')}
                                                    className="w-4 h-4 text-primary"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">Standard Shipping</p>
                                                    <p className="text-sm text-gray-500">3-5 business days</p>
                                                </div>
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {subtotal >= 200 ? 'Free' : '$10.00'}
                                            </span>
                                        </label>

                                        <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-gray-200'
                                            }`}>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'express'}
                                                    onChange={() => setShippingMethod('express')}
                                                    className="w-4 h-4 text-primary"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">Express Shipping</p>
                                                    <p className="text-sm text-gray-500">1-2 business days</p>
                                                </div>
                                            </div>
                                            <span className="font-medium text-gray-900">$15.00</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between pt-8">
                                        <button
                                            onClick={() => setCurrentStep('information')}
                                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                                        >
                                            <ChevronLeft size={18} />
                                            Return to Information
                                        </button>
                                        <Button onClick={handleShippingSubmit}>
                                            Continue to Payment
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Payment Step */}
                            {currentStep === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-lg p-8"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Review & Submit
                                    </h2>
                                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
                                        <Package size={48} className="mx-auto mb-4 text-primary" />
                                        <p className="text-gray-600 mb-2">
                                            Online payments will be available soon.
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            You can submit an order request and our team will contact you to confirm availability and next steps.
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <button
                                            onClick={() => setCurrentStep('shipping')}
                                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                                        >
                                            <ChevronLeft size={18} />
                                            Return to Shipping
                                        </button>
                                        <Button onClick={handlePaymentSubmit} loading={isProcessing}>
                                            Submit Order Request
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-6 sticky top-28">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Order Summary
                            </h3>

                            {/* Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => {
                                    const price = item.product.sale && item.product.salePrice
                                        ? item.product.salePrice
                                        : item.product.price
                                    return (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {item.size} / {item.color}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 mt-1">
                                                    {formatPrice(price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Totals */}
                            <div className="border-t border-gray-100 pt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-900">
                                        {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-100">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-gray-900">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
