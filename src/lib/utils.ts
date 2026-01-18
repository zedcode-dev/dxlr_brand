import { type ClassValue, clsx } from 'clsx'

// Classname utility (simplified version without tailwind-merge)
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

// Format price with currency symbol
export function formatPrice(price: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price)
}

// Truncate text
export function truncate(str: string, length: number): string {
    if (str.length <= length) return str
    return str.slice(0, length) + '...'
}

// Generate slug from string
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(later, wait)
    }
}

// Check if we're on the client side
export function isClient(): boolean {
    return typeof window !== 'undefined'
}

// Smooth scroll to element
export function scrollToElement(elementId: string, offset = 0): void {
    if (!isClient()) return

    const element = document.getElementById(elementId)
    if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + offset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

// Get random items from array
export function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

// Validate email
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Generate unique ID
export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Capitalize first letter
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// Parse price range string
export function parsePriceRange(range: string): { min: number; max: number } | null {
    const match = range.match(/(\d+)-(\d+)/)
    if (match) {
        return { min: parseInt(match[1]), max: parseInt(match[2]) }
    }
    return null
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, salePrice: number): number {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Wait function for async operations
export function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
