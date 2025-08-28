import DesignSystemLayout from '@/components/DesignSystemLayout'

export default function ColorSystem() {
  return (
    <DesignSystemLayout>
      <div className="p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Color System</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Complete color palette for A&K Design System. This guide showcases all brand colors, 
            primitives, and their usage throughout the application.
          </p>
        </header>

        {/* Brand Palette Primitives */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Brand Palette (Primitives)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-linen border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Linen</p>
                <p className="ds-caption font-mono">#F5F2EB</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-canvas border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Canvas</p>
                <p className="ds-caption font-mono">#E6DBC1</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-canvas-warmsand border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">50% Canvas + Warmsand</p>
                <p className="ds-caption font-mono">#D5C3A3</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-warm-sand border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Warm Sand</p>
                <p className="ds-caption font-mono">#C3AA84</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-amber border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Amber</p>
                <p className="ds-caption font-mono">#E0A526</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-burnt-sienna border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Burnt Sienna</p>
                <p className="ds-caption font-mono">#AA5432</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-cerulean border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Cerulean</p>
                <p className="ds-caption font-mono">#94A9CB</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-forest border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Forest</p>
                <p className="ds-caption font-mono">#335525</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-onyx border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Onyx</p>
                <p className="ds-caption font-mono">#000000</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-onyx-15 border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">Onyx 15%</p>
                <p className="ds-caption font-mono">rgba(0,0,0,0.15)</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg bg-white border border-gray-200 mx-auto mb-3"></div>
                <p className="ds-label">White</p>
                <p className="ds-caption font-mono">#FFFFFF</p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Breakdowns */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Color Breakdowns</h2>
            <p className="ds-body text-gray-600 mb-8">
              Each primitive color has a complete scale from very light (50) to very dark (900). 
              These scales provide flexibility for different UI states, backgrounds, and component variations.
            </p>
            
            {/* Linen Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Linen Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-linen-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Canvas Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-canvas-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Warm Sand Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Warm Sand Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-warm-sand-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Amber Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Amber Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-amber-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Burnt Sienna Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Burnt Sienna Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-burnt-sienna-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Cerulean Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Cerulean Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-cerulean-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Forest Scale */}
            <div className="mb-12">
              <h3 className="ds-subheading text-gray-700 mb-6">Forest Scale</h3>
              <div className="grid grid-cols-11 gap-2">
                {[50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded border border-gray-200 mx-auto mb-2 ${
                        shade === 500 ? 'ring-2 ring-amber ring-offset-1' : ''
                      }`}
                      style={{ backgroundColor: `var(--color-forest-${shade})` }}
                    ></div>
                    <p className="ds-caption">{shade}</p>
                    {shade === 500 && <p className="ds-caption text-amber-600">Primitive</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Usage Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-linen-100 p-6 rounded-lg">
                <h3 className="ds-subheading mb-4">Primary Button</h3>
                <button className="bg-burnt-sienna-500 hover:bg-burnt-sienna-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Book Now
                </button>
                <p className="ds-body mt-3 text-gray-600">Uses burnt-sienna-500 (Primary)</p>
              </div>
              <div className="bg-canvas-100 p-6 rounded-lg">
                <h3 className="ds-subheading mb-4">Secondary Button</h3>
                <button className="bg-onyx hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
                <p className="ds-body mt-3 text-gray-600">Uses onyx (Secondary)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CSS Variables Reference */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">CSS Variables Reference</h2>
            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono">
              <h4 className="text-white mb-4">Available Color Variables:</h4>
              <div className="space-y-2 text-sm">
                <p>• <span className="text-green-400">--color-burnt-sienna</span> - Primary (#AA5432)</p>
                <p>• <span className="text-green-400">--color-onyx</span> - Secondary (#000000)</p>
                <p>• <span className="text-green-400">--color-linen</span> - Background (#F5F2EB)</p>
                <p>• <span className="text-green-400">--color-canvas</span> - Highlight (#E6DBC1)</p>
                <p>• <span className="text-green-400">--color-amber</span> - Accent (#E0A526)</p>
                <p>• <span className="text-green-400">--color-cerulean</span> - Accent (#94A9CB)</p>
                <p>• <span className="text-green-400">--color-forest</span> - Accent (#335525)</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white mb-2">Color Breakdowns:</h4>
                <div className="space-y-1 text-sm">
                  <p>• Each color has a scale from 50 (lightest) to 900 (darkest)</p>
                  <p>• Use <span className="text-green-400">--color-{'{color}'}-{'{shade}'}</span> for specific variations</p>
                  <p>• Example: <span className="text-green-400">--color-linen-100</span>, <span className="text-green-400">--color-burnt-sienna-700</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  );
}
