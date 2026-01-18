'use client'

import { pageContent } from '@/lib/content'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function AboutPreview() {
    const { title, text } = pageContent.home.about

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-px bg-primary/30" />
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">
                                Our Story
                            </span>
                            <div className="w-12 h-px bg-primary/30" />
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                            {title}
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            {text}
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-100">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-primary mb-2">2024</p>
                                <p className="text-sm text-gray-500">Founded</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-primary mb-2">100%</p>
                                <p className="text-sm text-gray-500">Sustainable</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-primary mb-2">50+</p>
                                <p className="text-sm text-gray-500">Countries</p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}
