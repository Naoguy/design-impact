// Core types for the Design Impact application

export interface Material {
  id: string;
  name: string;
  category: string;
  carbonFootprint: number; // kg CO2e per kg
  recyclability: number; // percentage 0-100
  toxicity: 'low' | 'medium' | 'high';
  cost: number; // USD per kg
  supplier?: string;
}

export interface Component {
  id: string;
  name: string;
  material: Material;
  weight: number; // kg
  quantity: number;
  manufacturingProcess: string;
  manufacturingEnergy: number; // kWh per unit
}

export interface Product {
  id: string;
  name: string;
  description: string;
  components: Component[];
  modelUrl?: string; // URL to 3D model
  totalWeight: number; // kg
  createdAt: Date;
  updatedAt: Date;
}

export interface LCAResult {
  productId: string;
  totalCarbonFootprint: number; // kg CO2e
  breakdown: {
    materials: number;
    manufacturing: number;
    logistics: number;
    usage: number;
    endOfLife: number;
  };
  recyclabilityScore: number; // 0-100
  improvements: string[];
}

export interface LogisticsData {
  distance: number; // km
  mode: 'air' | 'sea' | 'road' | 'rail';
  carbonIntensity: number; // kg CO2e per ton-km
}

export interface UsageData {
  powerConsumption: number; // watts
  usageHoursPerDay: number;
  lifespanYears: number;
  carbonIntensityGrid: number; // kg CO2e per kWh
}

export interface SupplierData {
  id: string;
  name: string;
  location: string;
  materials: Material[];
  certifications: string[];
  sustainabilityScore: number; // 0-100
}

export interface ImpactAssessment {
  product: Product;
  lca: LCAResult;
  logistics: LogisticsData;
  usage: UsageData;
  recommendations: Recommendation[];
}

export interface Recommendation {
  category: 'material' | 'manufacturing' | 'logistics' | 'usage' | 'design';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedReduction: number; // percentage or absolute value
}
