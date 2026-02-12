'use client';

import { suppliers } from '../data/materials';
import { SupplierData } from '../types';

export default function SupplierDirectory() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Supplier Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
}

function SupplierCard({ supplier }: { supplier: SupplierData }) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{supplier.name}</h3>
          <p className="text-gray-600 text-sm">{supplier.location}</p>
        </div>
        <div className={`text-2xl font-bold ${getScoreColor(supplier.sustainabilityScore)}`}>
          {supplier.sustainabilityScore}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Materials Supplied</h4>
        <div className="flex flex-wrap gap-2">
          {supplier.materials.map((material) => (
            <span
              key={material.id}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {material.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {supplier.certifications.map((cert, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
