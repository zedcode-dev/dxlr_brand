'use client'

import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
    fullWidth?: boolean
}

const variantStyles = {
    primary: {
        backgroundColor: '#7C9885',
        color: '#FFFFFF',
    },
    secondary: {
        backgroundColor: '#E5E7EB',
        color: '#111827',
    },
    outline: {
        backgroundColor: 'transparent',
        color: '#111827',
        border: '2px solid #111827',
    },
    ghost: {
        backgroundColor: 'transparent',
        color: '#374151',
    }
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'right',
    fullWidth = false,
    className,
    disabled,
    style,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

    const sizes = {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-sm gap-2',
        lg: 'px-8 py-4 text-base gap-3'
    }

    const hoverStyles = {
        primary: { backgroundColor: '#5A7663' },
        secondary: { backgroundColor: '#D1D5DB' },
        outline: { backgroundColor: '#111827', color: '#FFFFFF' },
        ghost: { backgroundColor: '#F3F4F6' }
    }

    return (
        <motion.button
            whileHover={disabled || loading ? {} : { scale: 1.02, ...hoverStyles[variant] }}
            whileTap={disabled || loading ? {} : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn(
                baseStyles,
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            style={{
                ...variantStyles[variant],
                ...style
            }}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin" size={size === 'lg' ? 20 : 16} />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && icon}
                    {children}
                    {icon && iconPosition === 'right' && icon}
                </>
            )}
        </motion.button>
    )
}
