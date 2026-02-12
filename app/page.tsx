'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Product, LCAResult } from './types';
import { calculateLCA } from './lib/lca-calculator';
import ProductForm from './components/ProductForm';
import LCAVisualization from './components/LCAVisualization';
import SupplierDirectory from './components/SupplierDirectory';
import { Package, Leaf, TrendingDown, Users } from 'lucide-react';

// Dynamic import to avoid SSR issues with Three.js
const Model3DViewer = dynamic(() => import('./components/Model3DViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center text-white">Loading 3D Viewer...</div>
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'evaluate' | 'suppliers' | 'learn'>('create');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [lcaResult, setLCAResult] = useState<LCAResult | null>(null);

  const handleProductSubmit = (product: Product) => {
    setCurrentProduct(product);
    const lca = calculateLCA(product);
    setLCAResult(lca);
    setActiveTab('evaluate');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Design Impact</h1>
                <p className="text-sm text-gray-600">Environmental Assessment for Hardware Products</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Create Product</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('evaluate')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'evaluate'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              disabled={!currentProduct}
            >
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4" />
                <span>Evaluate Impact</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'suppliers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Suppliers</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'learn'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4" />
                <span>Learn & Act</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
              <ProductForm onSubmit={handleProductSubmit} initialData={currentProduct || undefined} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">3D Model Preview</h2>
              <Model3DViewer />
              <p className="text-sm text-gray-600 mt-4">
                3D model viewer for visualizing your product design. Upload your CAD files to see them here.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'evaluate' && currentProduct && lcaResult && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{currentProduct.name}</h2>
              <p className="text-gray-600">{currentProduct.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Total Weight: {currentProduct.totalWeight.toFixed(2)} kg | 
                Components: {currentProduct.components.length}
              </p>
            </div>
            <LCAVisualization lca={lcaResult} />
          </div>
        )}

        {activeTab === 'suppliers' && (
          <SupplierDirectory />
        )}

        {activeTab === 'learn' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LearningCard
                  title="Life Cycle Assessment Basics"
                  description="Learn the fundamentals of LCA and how to apply it to your product design process."
                  topics={['ISO 14040 Standards', 'Impact Categories', 'System Boundaries']}
                />
                <LearningCard
                  title="Material Selection Guide"
                  description="Understand the environmental impact of different materials and how to choose sustainable alternatives."
                  topics={['Carbon Footprint', 'Recyclability', 'Toxicity Assessment']}
                />
                <LearningCard
                  title="Design for Environment"
                  description="Design strategies to minimize environmental impact throughout the product lifecycle."
                  topics={['Design for Disassembly', 'Material Efficiency', 'Energy Efficiency']}
                />
                <LearningCard
                  title="Supply Chain Optimization"
                  description="Reduce logistics emissions and work with sustainable suppliers."
                  topics={['Green Logistics', 'Supplier Assessment', 'Local Sourcing']}
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Action Points</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-4">
                  <ActionPoint
                    title="Conduct Material Audit"
                    description="Review all materials in your current products and identify high-impact alternatives."
                  />
                  <ActionPoint
                    title="Engage with Suppliers"
                    description="Request environmental data and certifications from your suppliers."
                  />
                  <ActionPoint
                    title="Set Reduction Targets"
                    description="Establish specific carbon reduction goals for your next product generation."
                  />
                  <ActionPoint
                    title="Implement Design Changes"
                    description="Apply design for environment principles in your upcoming projects."
                  />
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Design Impact - Environmental Assessment Tool for Hardware Design Teams
          </p>
        </div>
      </footer>
    </div>
  );
}

function LearningCard({ title, description, topics }: { title: string; description: string; topics: string[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">Key Topics:</p>
        <ul className="list-disc list-inside space-y-1">
          {topics.map((topic, index) => (
            <li key={index} className="text-sm text-gray-600">{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ActionPoint({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0">
        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      </div>
      <div className="ml-4">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </li>
  );
}
