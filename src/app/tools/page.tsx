'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Filter, Star, Zap, Clock, DollarSign, TrendingUp, Sparkles, Grid3X3, List, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { tools, categories, getToolsByCategory, getFeaturedTools, getFreeTools, getFreemiumTools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function ToolsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  )
  const [pricingFilter, setPricingFilter] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

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
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, pricingFilter, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    // Update URL using Next.js router
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    router.push(`/tools?${params.toString()}`)
  }

  const handlePricingChange = (pricing: string) => {
    setPricingFilter(pricing)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setPricingFilter('')
    setSearchQuery('')
    setSortBy('featured')
    router.push('/tools')
  }

  const getCategoryCount = (category: string) => {
    return tools.filter(tool => tool.category === category).length
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Content Creation': '✍️',
      'Image Generation': '🎨',
      'Code Generation': '💻',
      'Data Analysis': '📊',
      'Marketing': '📈',
      'Productivity': '⚡',
      'Audio & Video': '🎵',
      'Research': '🔍'
    }
    return icons[category] || '🤖'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-4">
            AI Tools Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Explore our comprehensive collection of {tools.length} AI tools across {categories.length} categories. 
            Find the perfect AI solution for your needs.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                  {tools.length}
                </div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Sparkles className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-green-600">{getFreeTools().length}</div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Free Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-blue-600">{getFreemiumTools().length}</div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Freemium</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-yellow-600">{getFeaturedTools().length}</div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Sort By */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full px-3 py-2 pr-8 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer text-sm"
                  >
                    <option value="featured">Featured First</option>
                    <option value="trending">Trending</option>
                    <option value="name">Name</option>
                    <option value="pricing">Price (Low to High)</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Pricing Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Pricing
                </label>
                <div className="relative">
                  <select
                    value={pricingFilter}
                    onChange={(e) => handlePricingChange(e.target.value)}
                    className="appearance-none w-full px-3 py-2 pr-8 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer text-sm"
                  >
                    <option value="">All Pricing</option>
                    <option value="free">Free</option>
                    <option value="freemium">Freemium</option>
                    <option value="paid">Paid</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 font-medium shadow text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Grid3X3 className="h-6 w-6 text-indigo-600" />
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleCategoryChange('')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 group ${
                !selectedCategory 
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                All Tools
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{tools.length} tools</div>
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 group ${
                  selectedCategory === category 
                    ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {category}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{getCategoryCount(category)} tools</div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Tools Section */}
        {!selectedCategory && !pricingFilter && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mr-3">
                <Star className="h-6 w-6 text-white" />
              </div>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery && `Search Results for "${searchQuery}"`}
            {selectedCategory && !searchQuery && `${selectedCategory} Tools`}
            {!searchQuery && !selectedCategory && 'All Tools'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
            </div>
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              >
                <Grid3X3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              >
                <List className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Tools Grid/List */}
        {filteredTools.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for. Our AI tools collection is constantly growing!
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
            >
              Clear All Filters
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-indigo-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading AI Tools...</div>
          <div className="text-gray-600 dark:text-gray-400">Discover amazing AI tools for your workflow</div>
        </div>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  )
}
