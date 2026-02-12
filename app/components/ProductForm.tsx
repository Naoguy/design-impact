'use client';

import { useState } from 'react';
import { Product, Component, Material } from '../types';
import { materials, manufacturingProcesses } from '../data/materials';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  initialData?: Product;
}

export default function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const [productName, setProductName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [components, setComponents] = useState<Component[]>(initialData?.components || []);

  const addComponent = () => {
    const newComponent: Component = {
      id: `comp-${Date.now()}`,
      name: '',
      material: materials[0],
      weight: 0,
      quantity: 1,
      manufacturingProcess: Object.keys(manufacturingProcesses)[0],
      manufacturingEnergy: manufacturingProcesses[Object.keys(manufacturingProcesses)[0]]
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (index: number, field: string, value: any) => {
    const updated = [...components];
    if (field === 'material') {
      updated[index].material = materials.find(m => m.id === value) || materials[0];
    } else if (field === 'manufacturingProcess') {
      updated[index].manufacturingProcess = value;
      updated[index].manufacturingEnergy = manufacturingProcesses[value];
    } else {
      (updated[index] as any)[field] = value;
    }
    setComponents(updated);
  };

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalWeight = components.reduce((sum, comp) => sum + comp.weight * comp.quantity, 0);
    const product: Product = {
      id: initialData?.id || `prod-${Date.now()}`,
      name: productName,
      description,
      components,
      totalWeight,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date()
    };
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Components</h3>
          <button
            type="button"
            onClick={addComponent}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Add Component
          </button>
        </div>

        {components.map((component, index) => (
          <div key={component.id} className="p-4 border border-gray-200 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Component Name
                </label>
                <input
                  type="text"
                  value={component.name}
                  onChange={(e) => updateComponent(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <select
                  value={component.material.id}
                  onChange={(e) => updateComponent(index, 'material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {materials.map(mat => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name} ({mat.carbonFootprint} kg CO₂e/kg)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={component.weight}
                  onChange={(e) => updateComponent(index, 'weight', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={component.quantity}
                  onChange={(e) => updateComponent(index, 'quantity', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturing Process
                </label>
                <select
                  value={component.manufacturingProcess}
                  onChange={(e) => updateComponent(index, 'manufacturingProcess', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {Object.keys(manufacturingProcesses).map(process => (
                    <option key={process} value={process}>
                      {process} ({manufacturingProcesses[process]} kWh/kg)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeComponent(index)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm"
            >
              Remove Component
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-semibold"
      >
        {initialData ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
