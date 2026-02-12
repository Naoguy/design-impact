import { Product, LCAResult, LogisticsData, UsageData, Recommendation } from '../types';
import { manufacturingProcesses, logisticsEmissions, gridCarbonIntensity } from '../data/materials';

export function calculateLCA(
  product: Product,
  logistics?: LogisticsData,
  usage?: UsageData
): LCAResult {
  // Calculate materials impact
  const materialsImpact = product.components.reduce((sum, component) => {
    return sum + (component.material.carbonFootprint * component.weight * component.quantity);
  }, 0);

  // Calculate manufacturing impact
  const manufacturingImpact = product.components.reduce((sum, component) => {
    const energyPerUnit = manufacturingProcesses[component.manufacturingProcess] || 2.0;
    const energyCO2 = energyPerUnit * component.weight * 0.475; // Using global average grid intensity
    return sum + (energyCO2 * component.quantity);
  }, 0);

  // Calculate logistics impact
  const logisticsImpact = logistics
    ? (logistics.distance * product.totalWeight * logisticsEmissions[logistics.mode]) / 1000
    : 0;

  // Calculate usage impact
  const usageImpact = usage
    ? (usage.powerConsumption / 1000) * // convert to kW
      usage.usageHoursPerDay *
      365 *
      usage.lifespanYears *
      usage.carbonIntensityGrid
    : 0;

  // Calculate end-of-life impact (simplified)
  const averageRecyclability = product.components.reduce((sum, comp) => 
    sum + comp.material.recyclability * comp.weight, 0) / product.totalWeight;
  const endOfLifeImpact = materialsImpact * (1 - averageRecyclability / 100) * 0.1;

  const totalCarbonFootprint = 
    materialsImpact + manufacturingImpact + logisticsImpact + usageImpact + endOfLifeImpact;

  const improvements = generateImprovements(product, logistics, usage);

  return {
    productId: product.id,
    totalCarbonFootprint,
    breakdown: {
      materials: materialsImpact,
      manufacturing: manufacturingImpact,
      logistics: logisticsImpact,
      usage: usageImpact,
      endOfLife: endOfLifeImpact
    },
    recyclabilityScore: averageRecyclability,
    improvements
  };
}

function generateImprovements(
  product: Product,
  logistics?: LogisticsData,
  usage?: UsageData
): string[] {
  const improvements: string[] = [];

  // Check for high-impact materials
  const highCarbonComponents = product.components.filter(
    comp => comp.material.carbonFootprint > 5.0
  );
  if (highCarbonComponents.length > 0) {
    improvements.push(
      `Consider replacing high-carbon materials like ${highCarbonComponents[0].material.name} with lower-impact alternatives`
    );
  }

  // Check recyclability
  const averageRecyclability = product.components.reduce(
    (sum, comp) => sum + comp.material.recyclability * comp.weight, 0
  ) / product.totalWeight;
  if (averageRecyclability < 70) {
    improvements.push(
      'Increase use of recyclable materials to improve end-of-life impact'
    );
  }

  // Check logistics
  if (logistics && logistics.mode === 'air') {
    improvements.push(
      'Consider sea or rail freight instead of air freight to reduce logistics emissions by up to 97%'
    );
  }

  // Check usage
  if (usage && usage.powerConsumption > 50) {
    improvements.push(
      'Optimize power consumption through efficient design or power management features'
    );
  }

  return improvements;
}

export function generateRecommendations(
  product: Product,
  lca: LCAResult
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Material recommendations
  product.components.forEach(component => {
    if (component.material.carbonFootprint > 5.0) {
      recommendations.push({
        category: 'material',
        title: `Replace ${component.material.name}`,
        description: `Consider using recycled or bio-based alternatives to reduce carbon footprint`,
        impact: 'high',
        estimatedReduction: 30
      });
    }
  });

  // Manufacturing recommendations
  if (lca.breakdown.manufacturing > lca.totalCarbonFootprint * 0.3) {
    recommendations.push({
      category: 'manufacturing',
      title: 'Optimize Manufacturing Process',
      description: 'High manufacturing impact detected. Consider energy-efficient processes or renewable energy in manufacturing',
      impact: 'medium',
      estimatedReduction: 20
    });
  }

  // Design recommendations
  if (lca.recyclabilityScore < 70) {
    recommendations.push({
      category: 'design',
      title: 'Design for Disassembly',
      description: 'Improve recyclability by designing for easy disassembly and material separation',
      impact: 'medium',
      estimatedReduction: 15
    });
  }

  return recommendations;
}

export function compareProducts(products: Product[]): Array<{ product: Product; lca: LCAResult }> {
  return products.map(product => ({
    product,
    lca: calculateLCA(product)
  })).sort((a, b) => a.lca.totalCarbonFootprint - b.lca.totalCarbonFootprint);
}
