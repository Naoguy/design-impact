'use client';

interface Model3DViewerProps {
  modelUrl?: string;
}

export default function Model3DViewer({ modelUrl }: Model3DViewerProps) {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative">
      <div className="text-center z-10">
        <div className="mb-4">
          <svg
            className="w-24 h-24 mx-auto text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">3D Model Viewer</h3>
        <p className="text-gray-400 text-sm max-w-md">
          Interactive 3D model visualization will be displayed here.
          {modelUrl ? ' Model loaded.' : ' Upload a 3D model to preview.'}
        </p>
      </div>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
}
