import DesignSystemLayout from '@/components/DesignSystemLayout'

export default function LayoutSystem() {
  return (
    <DesignSystemLayout>
      <div className="p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Layout System</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Complete layout system for A&K Design System. This guide showcases our responsive container strategy, 
            grid system, and spacing approach using a mobile-first methodology with intelligent ultra-wide protection.
          </p>
        </header>

        {/* Container Strategy Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Container Strategy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Container Philosophy</h3>
                <p className="ds-body-base mb-3">
                  Our layout system uses <strong>content-driven container sizing</strong> with intelligent limits 
                  for ultra-wide displays. Each container type serves specific content needs while maintaining 
                  optimal readability and scanning patterns.
                </p>
                <p className="ds-body-base">
                  All containers use the <code className="bg-gray-100 px-2 py-1 rounded text-sm">min()</code> function 
                  to prevent excessive widths while maintaining responsive behavior.
                </p>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Key Principles</h3>
                <ul className="ds-body-base space-y-2 text-gray-600">
                  <li>• <strong>Mobile-first:</strong> Start with smallest breakpoint, enhance upward</li>
                  <li>• <strong>Content-driven:</strong> Choose container based on content type</li>
                  <li>• <strong>Ultra-wide protection:</strong> Prevent excessive widths with smart limits</li>
                  <li>• <strong>Grid alignment:</strong> Containers align with grid columns until max-width</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Container Types */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Container Types</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-burnt-sienna-500 pl-6">
                <h3 className="ds-subheading text-gray-700 mb-3">Full Container (1600px max)</h3>
                <p className="ds-body-base text-gray-600 mb-2">
                  <strong>Use for:</strong> Complex layouts, admin dashboards, product grids, wide data displays
                </p>
                <p className="ds-body-small text-gray-500">
                  <strong>Grid:</strong> 12/8/4 columns • <strong>Max-width:</strong> 1600px
                </p>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-6">
                <h3 className="ds-subheading text-gray-700 mb-3">Wide Container (1200px max)</h3>
                <p className="ds-body-base text-gray-600 mb-2">
                  <strong>Use for:</strong> Image galleries, card grids, homepage sections, visual content
                </p>
                <p className="ds-body-small text-gray-500">
                  <strong>Grid:</strong> 10/6/4 columns • <strong>Max-width:</strong> 1200px
                </p>
              </div>
              
              <div className="border-l-4 border-cerulean-500 pl-6">
                <h3 className="ds-subheading text-gray-700 mb-3">Base Container (900px max)</h3>
                <p className="ds-body-base text-gray-600 mb-2">
                  <strong>Use for:</strong> Articles, blog posts, marketing content, optimal reading width
                </p>
                <p className="ds-body-small text-gray-500">
                  <strong>Grid:</strong> 8/5/4 columns • <strong>Max-width:</strong> 900px
                </p>
              </div>
              
              <div className="border-l-4 border-forest-500 pl-6">
                <h3 className="ds-subheading text-gray-700 mb-3">Narrow Container (720px max)</h3>
                <p className="ds-body-base text-gray-600 mb-2">
                  <strong>Use for:</strong> Forms, sidebars, focused interactions, signup flows
                </p>
                <p className="ds-body-small text-gray-500">
                  <strong>Grid:</strong> 6/4/3 columns • <strong>Max-width:</strong> 720px
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Breakpoints */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Responsive Breakpoints</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Breakpoint</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Range</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Columns</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Margins</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Gutters</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">XS</td>
                    <td className="py-3 px-4 text-gray-600">0 - 479px</td>
                    <td className="py-3 px-4 text-gray-600">4</td>
                    <td className="py-3 px-4 text-gray-600">16px</td>
                    <td className="py-3 px-4 text-gray-600">16px</td>
                    <td className="py-3 px-4 text-gray-600">Small mobile</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">SM</td>
                    <td className="py-3 px-4 text-gray-600">480 - 767px</td>
                    <td className="py-3 px-4 text-gray-600">4</td>
                    <td className="py-3 px-4 text-gray-600">20px</td>
                    <td className="py-3 px-4 text-gray-600">16px</td>
                    <td className="py-3 px-4 text-gray-600">Large mobile</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">MD</td>
                    <td className="py-3 px-4 text-gray-600">768 - 1023px</td>
                    <td className="py-3 px-4 text-gray-600">8</td>
                    <td className="py-3 px-4 text-gray-600">32px</td>
                    <td className="py-3 px-4 text-gray-600">20px</td>
                    <td className="py-3 px-4 text-gray-600">Tablet</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">LG</td>
                    <td className="py-3 px-4 text-gray-600">1024 - 1439px</td>
                    <td className="py-3 px-4 text-gray-600">12</td>
                    <td className="py-3 px-4 text-gray-600">40px</td>
                    <td className="py-3 px-4 text-gray-600">24px</td>
                    <td className="py-3 px-4 text-gray-600">Small desktop</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">XL</td>
                    <td className="py-3 px-4 text-gray-600">1440px+</td>
                    <td className="py-3 px-4 text-gray-600">12</td>
                    <td className="py-3 px-4 text-gray-600">48px</td>
                    <td className="py-3 px-4 text-gray-600">24px</td>
                    <td className="py-3 px-4 text-gray-600">Large desktop</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Sizing Guide */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Section Sizing Guide</h2>
            <p className="ds-body-base text-gray-600 mb-8">
              Use these exact widths when designing new sections. Each container type has specific dimensions 
              at each breakpoint to ensure consistent layouts across all screen sizes.
            </p>
            
            {/* Full Container Sizing */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4 border-l-4 border-burnt-sienna-500 pl-4">
                Full Container (1600px max) - Complex Layouts
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XS</div>
                    <div className="text-sm font-bold text-gray-900">343px</div>
                    <div className="text-xs text-gray-500">375px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">SM</div>
                    <div className="text-sm font-bold text-gray-900">440px</div>
                    <div className="text-xs text-gray-500">480px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">MD</div>
                    <div className="text-sm font-bold text-gray-900">704px</div>
                    <div className="text-xs text-gray-500">768px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">LG</div>
                    <div className="text-sm font-bold text-gray-900">944px</div>
                    <div className="text-xs text-gray-500">1024px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XL</div>
                    <div className="text-sm font-bold text-gray-900">1344px</div>
                    <div className="text-xs text-gray-500">1440px+ viewport</div>
                  </div>
                </div>
                <div className="bg-burnt-sienna-50 p-4 rounded-lg">
                  <p className="ds-body-small text-burnt-sienna-800">
                    <strong>Use for:</strong> Hero sections, full-bleed marketing content, complex multi-column layouts, maximum impact sections
                  </p>
                </div>
              </div>
            </div>

            {/* Wide Container Sizing */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4 border-l-4 border-amber-500 pl-4">
                Wide Container (1200px max) - Visual Content
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XS</div>
                    <div className="text-sm font-bold text-gray-900">343px</div>
                    <div className="text-xs text-gray-500">375px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">SM</div>
                    <div className="text-sm font-bold text-gray-900">440px</div>
                    <div className="text-xs text-gray-500">480px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">MD</div>
                    <div className="text-sm font-bold text-gray-900">640px</div>
                    <div className="text-xs text-gray-500">768px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">LG</div>
                    <div className="text-sm font-bold text-gray-900">800px</div>
                    <div className="text-xs text-gray-500">1024px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XL</div>
                    <div className="text-sm font-bold text-gray-900">1116px</div>
                    <div className="text-xs text-gray-500">1440px+ viewport</div>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="ds-body-small text-amber-800">
                    <strong>Use for:</strong> Destination grids, trip type showcases, image galleries, card layouts, visual content that users scan
                  </p>
                </div>
              </div>
            </div>

            {/* Base Container Sizing */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4 border-l-4 border-cerulean-500 pl-4">
                Base Container (900px max) - Reading Content
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XS</div>
                    <div className="text-sm font-bold text-gray-900">343px</div>
                    <div className="text-xs text-gray-500">375px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">SM</div>
                    <div className="text-sm font-bold text-gray-900">400px</div>
                    <div className="text-xs text-gray-500">480px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">MD</div>
                    <div className="text-sm font-bold text-gray-900">480px</div>
                    <div className="text-xs text-gray-500">768px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">LG</div>
                    <div className="text-sm font-bold text-gray-900">640px</div>
                    <div className="text-xs text-gray-500">1024px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XL</div>
                    <div className="text-sm font-bold text-gray-900">888px</div>
                    <div className="text-xs text-gray-500">1440px+ viewport</div>
                  </div>
                </div>
                <div className="bg-cerulean-50 p-4 rounded-lg">
                  <p className="ds-body-small text-cerulean-800">
                    <strong>Use for:</strong> Company messaging, product descriptions, articles, reading content, optimal line length (~75 characters per line)
                  </p>
                </div>
              </div>
            </div>

            {/* Narrow Container Sizing */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4 border-l-4 border-forest-500 pl-4">
                Narrow Container (720px max) - Focused Content
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XS</div>
                    <div className="text-sm font-bold text-gray-900">311px</div>
                    <div className="text-xs text-gray-500">375px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">SM</div>
                    <div className="text-sm font-bold text-gray-900">360px</div>
                    <div className="text-xs text-gray-500">480px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">MD</div>
                    <div className="text-sm font-bold text-gray-900">420px</div>
                    <div className="text-xs text-gray-500">768px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">LG</div>
                    <div className="text-sm font-bold text-gray-900">520px</div>
                    <div className="text-xs text-gray-500">1024px viewport</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-600 mb-1">XL</div>
                    <div className="text-sm font-bold text-gray-900">660px</div>
                    <div className="text-xs text-gray-500">1440px+ viewport</div>
                  </div>
                </div>
                <div className="bg-forest-50 p-4 rounded-lg">
                  <p className="ds-body-small text-forest-800">
                    <strong>Use for:</strong> Search forms, booking forms, contact forms, focused interactions, any form that needs completion
                  </p>
                </div>
              </div>
            </div>

            {/* Design Tips */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="ds-subheading text-gray-700 mb-3">Design Tips</h4>
              <ul className="ds-body-base space-y-2 text-gray-600">
                <li>• <strong>Always start with mobile:</strong> Design for XS first, then scale up</li>
                <li>• <strong>Use container widths as guides:</strong> Don't guess - reference these exact dimensions</li>
                <li>• <strong>Consider content type:</strong> Choose container based on what you're displaying, not arbitrary preference</li>
                <li>• <strong>Test across breakpoints:</strong> Ensure your design works at all 5 breakpoints</li>
                <li>• <strong>Respect margins:</strong> Content never touches screen edges - margins are built into container calculations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Container vs Full-Bleed */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Container vs Full-Bleed Sections</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Containers</h3>
                <p className="ds-body-base text-gray-600 mb-3">
                  <strong>Purpose:</strong> Constrained widths with margins for readable content
                </p>
                <ul className="ds-body-base space-y-2 text-gray-600">
                  <li>• Articles and blog posts</li>
                  <li>• Forms and interactive elements</li>
                  <li>• Card grids and product listings</li>
                  <li>• Admin dashboards and data tables</li>
                </ul>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Full-Bleed</h3>
                <p className="ds-body-base text-gray-600 mb-3">
                  <strong>Purpose:</strong> True 100% viewport width for backgrounds and immersive content
                </p>
                <ul className="ds-body-base space-y-2 text-gray-600">
                  <li>• Hero sections with background images</li>
                  <li>• Image galleries and carousels</li>
                  <li>• Video players and maps</li>
                  <li>• Background patterns and textures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Technical Implementation</h2>
            <div className="space-y-6">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Container CSS with Ultra-Wide Protection</h3>
                <div className="bg-gray-50 p-6 rounded border">
                  <p className="ds-label text-gray-700 mb-3">Example: Wide Container (1200px max)</p>
                  <code className="text-sm text-gray-700 font-mono block">
                    .container--wide {'{'}<br/>
                    &nbsp;&nbsp;max-width: min(343px, calc(100vw - 32px));<br/>
                    {'}'}<br/>
                    @media (min-width: 480px) {'{'}<br/>
                    &nbsp;&nbsp;.container--wide {'{'} max-width: min(440px, calc(100vw - 40px)); {'}'}<br/>
                    {'}'}<br/>
                    @media (min-width: 1440px) {'{'}<br/>
                    &nbsp;&nbsp;.container--wide {'{'} max-width: min(1200px, calc(100vw - 96px)); {'}'}<br/>
                    {'}'}
                  </code>
                </div>
              </div>
              
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Full-Bleed Implementation</h3>
                <div className="bg-gray-50 p-6 rounded border">
                  <p className="ds-label text-gray-700 mb-3">CSS for full-bleed sections</p>
                  <code className="text-sm text-gray-700 font-mono block">
                    .full-bleed {'{'}<br/>
                    &nbsp;&nbsp;width: 100vw;<br/>
                    &nbsp;&nbsp;margin-left: calc(-50vw + 50%);<br/>
                    &nbsp;&nbsp;margin-right: calc(-50vw + 50%);<br/>
                    {'}'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Spacing System</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-6 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-xs font-medium text-gray-600 mb-2">XXL</div>
                  <div className="text-sm text-gray-900">80px</div>
                  <div className="text-xs text-gray-500">Major breaks</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-xs font-medium text-gray-600 mb-2">XL</div>
                  <div className="text-sm text-gray-900">64px</div>
                  <div className="text-xs text-gray-500">Section breaks</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-xs font-medium text-gray-600 mb-2">L</div>
                  <div className="text-sm text-gray-900">48px</div>
                  <div className="text-xs text-gray-500">Standard</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-xs font-medium text-gray-600 mb-2">M</div>
                  <div className="text-sm text-gray-900">32px</div>
                  <div className="text-xs text-gray-500">Subsections</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-xs font-medium text-gray-600 mb-2">S</div>
                  <div className="text-sm text-gray-900">24px</div>
                  <div className="text-xs text-gray-500">Components</div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-xs font-medium text-gray-600 mb-2">XS</div>
                  <div className="text-sm text-gray-900">16px</div>
                  <div className="text-xs text-gray-500">Elements</div>
                </div>
              </div>
              <p className="ds-body-base text-gray-600 text-center">
                <strong>Base Unit:</strong> 8px • All spacing uses multiples of 8px for consistency
              </p>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Usage Examples</h2>
            <div className="space-y-6">
              <div className="bg-linen-100 p-6 rounded-lg">
                <h3 className="ds-subheading mb-4">Hero Section (Full-Bleed + Container)</h3>
                <div className="bg-gray-800 text-white p-4 rounded">
                  <code className="text-sm font-mono">
                    &lt;section className="hero full-bleed"&gt;<br/>
                    &nbsp;&nbsp;&lt;div className="container container--wide"&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Hero Title&lt;/h1&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Hero description&lt;/p&gt;<br/>
                    &nbsp;&nbsp;&lt;/div&gt;<br/>
                    &lt;/section&gt;
                  </code>
                </div>
                <p className="ds-body mt-3 text-gray-600">
                  Full-bleed background with constrained content inside for optimal readability
                </p>
              </div>
              
              <div className="bg-canvas-100 p-6 rounded-lg">
                <h3 className="ds-subheading mb-4">Article Content (Base Container)</h3>
                <div className="bg-gray-800 text-white p-4 rounded">
                  <code className="text-sm font-mono">
                    &lt;article className="container container--base"&gt;<br/>
                    &nbsp;&nbsp;&lt;h2&gt;Article Title&lt;/h2&gt;<br/>
                    &nbsp;&nbsp;&lt;p&gt;Article content...&lt;/p&gt;<br/>
                    &lt;/article&gt;
                  </code>
                </div>
                <p className="ds-body mt-3 text-gray-600">
                  Base container for optimal reading width (~75 characters per line)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Checklist */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Quality Checklist</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Design Review</h3>
                <ul className="ds-body-base space-y-2 text-gray-600">
                  <li>• Layouts tested across all 5 breakpoints (XS, SM, MD, LG, XL)</li>
                  <li>• Content fits within appropriate container widths at each size</li>
                  <li>• Vertical spacing uses defined scale for each breakpoint</li>
                  <li>• Grid columns respected for content alignment</li>
                  <li>• Touch targets meet minimum 44px on tablet/mobile</li>
                  <li>• Navigation patterns work across all breakpoints</li>
                  <li>• Full-bleed vs container usage is appropriate</li>
                </ul>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Development Review</h3>
                <ul className="ds-body-base space-y-2 text-gray-600">
                  <li>• Mobile-first media queries implemented</li>
                  <li>• Container widths responsive across all breakpoints with ultra-wide limits</li>
                  <li>• Grid systems scale appropriately</li>
                  <li>• Spacing scale implemented with CSS custom properties</li>
                  <li>• Content never touches screen edges (proper margins)</li>
                  <li>• Tablet breakpoint provides good intermediate experience</li>
                  <li>• Full-bleed sections implemented correctly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  )
}
