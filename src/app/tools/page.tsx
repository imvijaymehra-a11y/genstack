'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, Star, Zap, Clock, DollarSign, TrendingUp, Sparkles } from 'lucide-react'
import { tools, categories, getToolsByCategory, getFeaturedTools, getFreeTools, getFreemiumTools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function ToolsContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  )
  const [pricingFilter, setPricingFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const filteredTools = useMemo(() => {
    let filtered = tools

    // Category filter
    if (selectedCategory) {
      filtered = getToolsByCategory(selectedCategory)
    }

    // Pricing filter
    if (pricingFilter) {
      filtered = filtered.filter(tool => tool.pricing === pricingFilter)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case 'pricing':
          const pricingOrder = { 'free': 0, 'freemium': 1, 'paid': 2 }
          return pricingOrder[a.pricing || 'freemium'] - pricingOrder[b.pricing || 'freemium']
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, pricingFilter, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
  }

  const handlePricingChange = (pricing: string) => {
    setPricingFilter(pricing)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setPricingFilter('')
    setSearchQuery('')
    setSortBy('name')
  }

  const getCategoryCount = (category: string) => {
    return tools.filter(tool => tool.category === category).length
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              AI Tools Directory
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Explore our comprehensive collection of {tools.length} AI tools across {categories.length} categories. 
            Find the perfect AI solution for your needs.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-primary">{tools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{getFreeTools().length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{getFreemiumTools().length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Freemium</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">{getFeaturedTools().length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools by name, category, or tags..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="name">Name</option>
                <option value="featured">Featured First</option>
                <option value="pricing">Price (Low to High)</option>
              </select>
            </div>

            {/* Pricing Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pricing
              </label>
              <select
                value={pricingFilter}
                onChange={(e) => handlePricingChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Pricing</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handleCategoryChange('')}
              className={`p-4 rounded-lg border-2 transition-all ${
                !selectedCategory 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="font-semibold">All Tools</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{tools.length} tools</div>
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="font-semibold">{category}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{getCategoryCount(category)} tools</div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Tools Section */}
        {!selectedCategory && !pricingFilter && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFeaturedTools().map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery && `Search Results for "${searchQuery}"`}
            {selectedCategory && !searchQuery && `${selectedCategory} Tools`}
            {!searchQuery && !selectedCategory && 'All Tools'}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default function ToolsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400">Loading AI tools...</div>
        </div>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  )
}
