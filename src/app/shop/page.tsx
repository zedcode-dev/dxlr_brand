'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { products, categories } from '@/lib/content'
import ProductCard from '@/components/ui/ProductCard'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name'

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A-Z' }
]

const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: 'Over $150', min: 150, max: Infinity }
]

export default function ShopPage() {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
    const [showNewOnly, setShowNewOnly] = useState(false)
    const [showSaleOnly, setShowSaleOnly] = useState(false)
    const [sortBy, setSortBy] = useState<SortOption>('newest')
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products]

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase()
            result = result.filter(
                p =>
                    p.name.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower) ||
                    p.category.toLowerCase().includes(searchLower)
            )
        }

        // Category filter
        if (selectedCategory) {
            result = result.filter(p => p.categorySlug === selectedCategory)
        }

        // Price range filter
        if (selectedPriceRange !== null) {
            const range = priceRanges[selectedPriceRange]
            result = result.filter(p => {
                const price = p.sale && p.salePrice ? p.salePrice : p.price
                return price >= range.min && price < range.max
            })
        }

        // New only filter
        if (showNewOnly) {
            result = result.filter(p => p.new)
        }

        // Sale only filter
        if (showSaleOnly) {
            result = result.filter(p => p.sale)
        }

        // Sorting
        switch (sortBy) {
            case 'newest':
                result = result.filter(p => p.new).concat(result.filter(p => !p.new))
                break
            case 'price-low':
                result.sort((a, b) => {
                    const priceA = a.sale && a.salePrice ? a.salePrice : a.price
                    const priceB = b.sale && b.salePrice ? b.salePrice : b.price
                    return priceA - priceB
                })
                break
            case 'price-high':
                result.sort((a, b) => {
                    const priceA = a.sale && a.salePrice ? a.salePrice : a.price
                    const priceB = b.sale && b.salePrice ? b.salePrice : b.price
                    return priceB - priceA
                })
                break
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
        }

        return result
    }, [search, selectedCategory, selectedPriceRange, showNewOnly, showSaleOnly, sortBy])

    const clearFilters = () => {
        setSearch('')
        setSelectedCategory(null)
        setSelectedPriceRange(null)
        setShowNewOnly(false)
        setShowSaleOnly(false)
        setSortBy('newest')
    }

    const hasActiveFilters = search || selectedCategory || selectedPriceRange !== null || showNewOnly || showSaleOnly

    // Filter Sidebar Content
    const FilterContent = () => (
        <div className="space-y-8">
            {/* Search */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Search</label>
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Category</label>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${!selectedCategory ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Price Range</label>
                <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                        <button
                            key={range.label}
                            onClick={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedPriceRange === index ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Filters */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Quick Filters</label>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showNewOnly}
                            onChange={(e) => setShowNewOnly(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-600">New Arrivals</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showSaleOnly}
                            onChange={(e) => setShowSaleOnly(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-600">On Sale</span>
                    </label>
                </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="w-full py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    )

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                {/* Header */}
                <AnimatedSection className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop</h1>
                    <p className="text-gray-600 max-w-xl">
                        Discover our collection of premium fashion pieces, crafted with intention and designed for modern living.
                    </p>
                </AnimatedSection>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-28">
                            <FilterContent />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                            {/* Results Count */}
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
                            </p>

                            <div className="flex items-center gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 transition-colors"
                                >
                                    <SlidersHorizontal size={16} />
                                    Filters
                                    {hasActiveFilters && (
                                        <span className="w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                                        className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-primary bg-white cursor-pointer"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <StaggerItem key={product.id}>
                                        <ProductCard product={product} index={index} />
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                                <button
                                    onClick={clearFilters}
                                    className="text-primary hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
                            onClick={() => setIsMobileFilterOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="p-2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <FilterContent />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
