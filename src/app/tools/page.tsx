import Link from 'next/link';
import { getAllTools } from '@/lib/tools';

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of AI-powered content generation tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {tool.description}
              </p>
              <div className="text-blue-600 font-medium">
                Use Tool →
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
