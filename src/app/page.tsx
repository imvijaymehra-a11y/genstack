import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Content Generator Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate blogs, ads, SEO content and more using AI
          </p>
          <Link
            href="/tools"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Generating
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Blog Generator</h3>
            <p className="text-gray-600">Generate SEO optimized blog posts with engaging content</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">SEO Title Generator</h3>
            <p className="text-gray-600">Generate compelling SEO titles that rank well in search engines</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Product Description Generator</h3>
            <p className="text-gray-600">Create persuasive product descriptions that drive sales</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">YouTube Script Generator</h3>
            <p className="text-gray-600">Generate engaging YouTube video scripts</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Ad Copy Generator</h3>
            <p className="text-gray-600">Create compelling advertising copy for various platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
