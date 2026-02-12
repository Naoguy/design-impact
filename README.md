# Design Impact

A comprehensive environmental assessment tool for hardware product design and engineering teams. This application helps teams evaluate and gain insight into the potential environmental impact of their work through Life Cycle Assessment (LCA), material selection analysis, supplier data management, and actionable insights.

## Features

### 🌍 Life Cycle Assessment (LCA)
- Calculate carbon footprint across all product lifecycle stages:
  - Materials extraction and processing
  - Manufacturing and assembly
  - Logistics and transportation
  - Product usage phase
  - End-of-life and recyclability
- Visual breakdown of environmental impact
- Recyclability scoring

### 🎨 3D Model Evaluation
- Interactive 3D model viewer powered by Three.js
- Visual representation of product designs
- Support for CAD model integration

### 📦 Material Database
- Comprehensive database of materials with environmental impact data
- Carbon footprint per kg for each material
- Recyclability scores
- Toxicity levels
- Cost analysis

### 🤝 Supplier Management
- Supplier directory with sustainability scores
- Certification tracking (ISO 14001, B Corp, etc.)
- Material sourcing information
- Location and contact data

### 📊 Data Collection & Analysis
- Detailed component inventory system
- Manufacturing process tracking
- Energy consumption analysis
- Logistics impact calculation

### 📚 Learning Resources
- Educational content on LCA principles
- Design for Environment (DfE) guidelines
- Material selection guides
- Supply chain optimization strategies

### 🎯 Actionable Insights
- Automated improvement recommendations
- Impact reduction strategies
- Material substitution suggestions
- Process optimization opportunities

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Naoguy/design-impact.git
cd design-impact
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Creating a Product

1. Navigate to the "Create Product" tab
2. Enter product name and description
3. Add components by clicking "Add Component"
4. For each component, specify:
   - Component name
   - Material type
   - Weight (kg)
   - Quantity
   - Manufacturing process
5. Submit the form to calculate environmental impact

### Evaluating Impact

After creating a product, switch to the "Evaluate Impact" tab to view:
- Total carbon footprint
- Impact breakdown by lifecycle stage
- Visual charts and graphs
- Recyclability score
- Improvement suggestions

### Managing Suppliers

The "Suppliers" tab provides:
- List of available suppliers
- Sustainability scores
- Materials offered
- Certifications and compliance
- Location information

### Learning & Acting

The "Learn & Act" tab offers:
- Educational resources on LCA and sustainable design
- Action points for reducing environmental impact
- Best practices for material selection
- Supply chain optimization tips

## Technology Stack

- **Framework**: Next.js 14 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Visualization**: Three.js, React Three Fiber
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
design-impact/
├── app/
│   ├── components/          # React components
│   │   ├── LCAVisualization.tsx
│   │   ├── Model3DViewer.tsx
│   │   ├── ProductForm.tsx
│   │   └── SupplierDirectory.tsx
│   ├── data/               # Data files and databases
│   │   └── materials.ts
│   ├── lib/                # Utility functions
│   │   └── lca-calculator.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── public/                 # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

```

## Environmental Impact Calculations

The LCA calculator uses the following methodology:

### Materials Impact
```
Carbon footprint = Σ (material_carbon_footprint × component_weight × quantity)
```

### Manufacturing Impact
```
Carbon footprint = Σ (process_energy × weight × grid_carbon_intensity × quantity)
```

### Logistics Impact
```
Carbon footprint = distance × total_weight × transport_mode_intensity / 1000
```

### Usage Impact
```
Carbon footprint = power_consumption × usage_hours × days × years × grid_intensity
```

### End-of-Life Impact
```
Carbon footprint = materials_impact × (1 - recyclability/100) × 0.1
```

## Data Sources

Material carbon footprints are based on:
- ICE Database (Inventory of Carbon & Energy)
- Ecoinvent database
- Industry-specific LCA studies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License

## Support

For questions or support, please open an issue on GitHub.

## Roadmap

- [ ] Integration with CAD software (SolidWorks, Fusion 360)
- [ ] Real-time supplier API connections
- [ ] Advanced LCA scenarios and sensitivity analysis
- [ ] Export reports to PDF/Excel
- [ ] Multi-user collaboration features
- [ ] Integration with carbon offset programs
- [ ] Mobile app version
- [ ] AI-powered design recommendations
