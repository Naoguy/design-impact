import { Material, SupplierData } from '../types';

// Material database with environmental impact data
export const materials: Material[] = [
  {
    id: 'mat-001',
    name: 'Aluminum 6061',
    category: 'Metal',
    carbonFootprint: 8.24, // kg CO2e per kg
    recyclability: 95,
    toxicity: 'low',
    cost: 2.5,
    supplier: 'Global Metals Co.'
  },
  {
    id: 'mat-002',
    name: 'Recycled Aluminum',
    category: 'Metal',
    carbonFootprint: 0.6, // kg CO2e per kg
    recyclability: 100,
    toxicity: 'low',
    cost: 2.2,
    supplier: 'EcoMetal Recycling'
  },
  {
    id: 'mat-003',
    name: 'ABS Plastic',
    category: 'Plastic',
    carbonFootprint: 3.2, // kg CO2e per kg
    recyclability: 60,
    toxicity: 'medium',
    cost: 1.8,
    supplier: 'PolyTech Industries'
  },
  {
    id: 'mat-004',
    name: 'PLA Bioplastic',
    category: 'Bioplastic',
    carbonFootprint: 0.7, // kg CO2e per kg
    recyclability: 80,
    toxicity: 'low',
    cost: 2.0,
    supplier: 'BioMaterials Inc.'
  },
  {
    id: 'mat-005',
    name: 'Steel (Carbon)',
    category: 'Metal',
    carbonFootprint: 2.5, // kg CO2e per kg
    recyclability: 90,
    toxicity: 'low',
    cost: 0.8,
    supplier: 'SteelWorks Ltd.'
  },
  {
    id: 'mat-006',
    name: 'Stainless Steel 304',
    category: 'Metal',
    carbonFootprint: 6.15, // kg CO2e per kg
    recyclability: 100,
    toxicity: 'low',
    cost: 3.5,
    supplier: 'Premium Alloys'
  },
  {
    id: 'mat-007',
    name: 'Glass (Soda-lime)',
    category: 'Glass',
    carbonFootprint: 0.85, // kg CO2e per kg
    recyclability: 100,
    toxicity: 'low',
    cost: 0.6,
    supplier: 'ClearView Glass'
  },
  {
    id: 'mat-008',
    name: 'Polycarbonate',
    category: 'Plastic',
    carbonFootprint: 6.0, // kg CO2e per kg
    recyclability: 70,
    toxicity: 'medium',
    cost: 3.2,
    supplier: 'PolyTech Industries'
  },
  {
    id: 'mat-009',
    name: 'Bamboo Composite',
    category: 'Natural',
    carbonFootprint: 0.3, // kg CO2e per kg
    recyclability: 85,
    toxicity: 'low',
    cost: 1.5,
    supplier: 'EcoMaterials Co.'
  },
  {
    id: 'mat-010',
    name: 'Copper',
    category: 'Metal',
    carbonFootprint: 3.9, // kg CO2e per kg
    recyclability: 100,
    toxicity: 'medium',
    cost: 8.5,
    supplier: 'Copper Works'
  }
];

export const suppliers: SupplierData[] = [
  {
    id: 'sup-001',
    name: 'Global Metals Co.',
    location: 'Shanghai, China',
    materials: materials.filter(m => m.supplier === 'Global Metals Co.'),
    certifications: ['ISO 14001', 'ISO 9001'],
    sustainabilityScore: 75
  },
  {
    id: 'sup-002',
    name: 'EcoMetal Recycling',
    location: 'Rotterdam, Netherlands',
    materials: materials.filter(m => m.supplier === 'EcoMetal Recycling'),
    certifications: ['ISO 14001', 'Cradle to Cradle', 'B Corp'],
    sustainabilityScore: 92
  },
  {
    id: 'sup-003',
    name: 'PolyTech Industries',
    location: 'Houston, USA',
    materials: materials.filter(m => m.supplier === 'PolyTech Industries'),
    certifications: ['ISO 9001', 'RoHS'],
    sustainabilityScore: 68
  },
  {
    id: 'sup-004',
    name: 'BioMaterials Inc.',
    location: 'Copenhagen, Denmark',
    materials: materials.filter(m => m.supplier === 'BioMaterials Inc.'),
    certifications: ['ISO 14001', 'EU Ecolabel', 'B Corp'],
    sustainabilityScore: 88
  },
  {
    id: 'sup-005',
    name: 'EcoMaterials Co.',
    location: 'Portland, USA',
    materials: materials.filter(m => m.supplier === 'EcoMaterials Co.'),
    certifications: ['FSC', 'ISO 14001', 'B Corp'],
    sustainabilityScore: 85
  }
];

// Manufacturing process energy consumption (kWh per kg)
export const manufacturingProcesses: Record<string, number> = {
  'CNC Machining': 3.5,
  'Injection Molding': 2.0,
  '3D Printing': 1.5,
  'Die Casting': 4.0,
  'Stamping': 1.2,
  'Forging': 3.8,
  'Extrusion': 2.5,
  'Assembly': 0.5
};

// Logistics carbon intensity (kg CO2e per ton-km)
export const logisticsEmissions = {
  air: 0.602,
  sea: 0.016,
  road: 0.089,
  rail: 0.028
};

// Grid carbon intensity by region (kg CO2e per kWh)
export const gridCarbonIntensity: Record<string, number> = {
  'Global Average': 0.475,
  'USA': 0.417,
  'EU': 0.295,
  'China': 0.555,
  'India': 0.708,
  'Japan': 0.463,
  'Brazil': 0.074,
  'Australia': 0.645
};
