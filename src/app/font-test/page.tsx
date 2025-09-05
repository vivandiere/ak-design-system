export default function FontTestPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="mb-8">Font Weight Comparison</h1>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Current H1 (font-weight: 100 - Thin):</p>
            <h1 className="text-4xl">Château De La Baie</h1>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Argent Light (font-weight: 200):</p>
            <h1 className="text-4xl argent-light">Château De La Baie</h1>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Tailwind font-thin (100):</p>
            <h1 className="text-4xl font-thin" style={{ fontFamily: 'Argent CF, serif' }}>Château De La Baie</h1>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Tailwind font-extralight (200):</p>
            <h1 className="text-4xl font-extralight" style={{ fontFamily: 'Argent CF, serif' }}>Château De La Baie</h1>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">NEW: Dedicated Argent CF Thin font family:</p>
            <h1 className="text-4xl" style={{ fontFamily: 'Argent CF Thin, serif', fontWeight: 'normal' }}>Château De La Baie</h1>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Regular H5 heading:</p>
            <h5>Villa Product Title</h5>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">H5 with Light weight:</p>
            <h5 className="argent-light">Villa Product Title</h5>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            Compare these weights with your Figma design to see which matches "Argent Light" better. 
            We now have both Thin (100) and Light (200) available.
          </p>
        </div>
      </div>
    </div>
  );
}
