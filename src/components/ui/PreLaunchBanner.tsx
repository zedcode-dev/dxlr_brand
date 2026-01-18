'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import { X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Context to share banner state
const BannerContext = createContext<{ isVisible: boolean; setIsVisible: (v: boolean) => void } | null>(null)

export function useBanner() {
    const context = useContext(BannerContext)
    if (!context) {
        return { isVisible: false, setIsVisible: () => { } }
    }
    return context
}

export function BannerProvider({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <BannerContext.Provider value={{ isVisible, setIsVisible }}>
            {children}
        </BannerContext.Provider>
    )
}

export default function PreLaunchBanner() {
    const { isVisible, setIsVisible } = useBanner()

    if (!isVisible) return null

    return (
        <div
            className="relative z-[60]"
            style={{ backgroundColor: '#7C9885' }}
        >
            <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-center gap-3 relative">
                <Sparkles size={16} className="flex-shrink-0 text-white" />
                <p className="text-sm font-medium text-center text-white">
                    🚀 <span className="font-semibold">Pre-Launch Phase</span> — We're getting ready for launch. Stay tuned!
                </p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 p-1 hover:bg-white/10 rounded transition-colors text-white"
                    aria-label="Close banner"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}
