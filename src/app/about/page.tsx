import { Metadata } from 'next'
import { Gem, Leaf, Clock, Eye } from 'lucide-react'
import { pageContent, siteConfig } from '@/lib/content'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
    title: 'About Us',
    description: pageContent.about.mission,
}

const iconMap = {
    gem: Gem,
    leaf: Leaf,
    clock: Clock,
    eye: Eye,
}

export default function AboutPage() {
    const { hero, mission, story, values } = pageContent.about

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
                            Our Story
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            {hero.title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {hero.subtitle}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <AnimatedSection>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {mission}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection direction="left">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                The {siteConfig.name} Story
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {story}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, {siteConfig.name} continues to grow while staying true to its founding principles.
                                Every garment we create is a testament to our belief that fashion can be both beautiful
                                and responsible.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection direction="right" delay={0.2}>
                            <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-gray-300">{siteConfig.name}</span>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            The principles that guide everything we do
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = iconMap[value.icon as keyof typeof iconMap]
                            return (
                                <StaggerItem key={index}>
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <IconComponent size={28} className="text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {value.text}
                                        </p>
                                    </div>
                                </StaggerItem>
                            )
                        })}
                    </StaggerContainer>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <StaggerItem>
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">2024</p>
                            <p className="text-gray-400">Year Founded</p>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</p>
                            <p className="text-gray-400">Countries Reached</p>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</p>
                            <p className="text-gray-400">Sustainable Materials</p>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</p>
                            <p className="text-gray-400">Happy Customers</p>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>
        </div>
    )
}
