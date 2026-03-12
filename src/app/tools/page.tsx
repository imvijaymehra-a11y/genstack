'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import { tools, categories, getToolsByCategory } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function ToolsContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  )

  const filteredTools = useMemo(() => {
    let filtered = tools

    if (selectedCategory) {
      filtered = getToolsByCategory(selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All AI Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our complete collection of {tools.length} AI tools.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="block w-full pl-10 pr-3 py-3 border rounded-lg"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('')}
            className="px-4 py-2 rounded-full border"
          >
            All ({tools.length})
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className="px-4 py-2 rounded-full border"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading tools...</div>}>
      <ToolsContent />
    </Suspense>
  )
}
