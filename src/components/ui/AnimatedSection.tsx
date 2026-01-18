'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface AnimatedSectionProps {
    children: ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    duration?: number
    once?: boolean
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    once = true
}: AnimatedSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-100px' })

    const getDirectionVariants = (): Variants => {
        const directions = {
            up: { y: 40, x: 0 },
            down: { y: -40, x: 0 },
            left: { x: 40, y: 0 },
            right: { x: -40, y: 0 },
            none: { x: 0, y: 0 }
        }

        const { x, y } = directions[direction]

        return {
            hidden: {
                opacity: 0,
                x,
                y
            },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={getDirectionVariants()}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Staggered Children Component
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    once?: boolean
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true
}: StaggerContainerProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-100px' })

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger Item Component
interface StaggerItemProps {
    children: ReactNode
    className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    }

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    )
}

// Text Reveal Animation
interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : { y: '100%' }}
                transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="inline-block"
            >
                {text}
            </motion.span>
        </span>
    )
}

// Parallax Scroll Component
interface ParallaxProps {
    children: ReactNode
    className?: string
    speed?: number
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
    const ref = useRef(null)

    return (
        <motion.div
            ref={ref}
            style={{
                y: 0
            }}
            className={className}
        >
            <motion.div
                style={{
                    y: 0
                }}
                whileInView={{
                    y: speed * -50
                }}
                transition={{
                    duration: 0
                }}
                viewport={{ once: false }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
