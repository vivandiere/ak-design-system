import DesignSystemLayout from '@/components/DesignSystemLayout'

export default function StyleGuide() {
  return (
    <DesignSystemLayout>
      <div className="p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Typography</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Complete typography system for A&K Booking System. This guide showcases all typography styles, 
            responsive behavior, and design tokens used throughout the application.
          </p>
        </header>

        {/* Typography System Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Typography System Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">REM-Based Scaling</h3>
                <p className="ds-body-base mb-3">
                  <strong>Base Font Size:</strong> 1px = 1rem<br/>
                  <strong>Body Base:</strong> 16px = 16rem (desktop), 14px = 14rem (tablet), 12px = 12rem (mobile)
                </p>
                <p className="ds-body-base">
                  This approach ensures consistent proportions and accessibility across all devices while maintaining the visual hierarchy of our design system.
                </p>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Responsive Behavior</h3>
                <p className="ds-body-base mb-3">
                  <strong>Desktop:</strong> 16px base (16rem)<br/>
                  <strong>Tablet:</strong> 14px base (14rem)<br/>
                  <strong>Mobile:</strong> 12px base (12rem)
                </p>
                <p className="ds-body-base">
                  All typography scales proportionally using CSS clamp() functions for smooth transitions between breakpoints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Technical Implementation</h2>
            <div className="bg-gray-50 p-6 rounded border">
              <p className="ds-label text-gray-700 mb-3">CSS Implementation Example:</p>
              <code className="text-sm text-gray-700 font-mono block">
                .body-base {'{'}<br/>
                &nbsp;&nbsp;font-size: clamp(12px, 1.5vw + 8px, 16px);<br/>
                &nbsp;&nbsp;line-height: 1.25;<br/>
                &nbsp;&nbsp;font-weight: 100;<br/>
                &nbsp;&nbsp;letter-spacing: 0;<br/>
                {'}'}
              </code>
            </div>
            <p className="ds-body-base mt-4 text-gray-600">
              The clamp() function provides smooth scaling between our minimum (mobile) and maximum (desktop) sizes, 
              ensuring optimal readability at all viewport sizes. This approach maintains the 1px = 1rem relationship 
              while providing fluid typography scaling.
            </p>
          </div>
        </section>

        {/* Type Scale */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Type Scale</h2>
            
            {/* Large Headings */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4">Large Headings (Argent CF - Light 100)</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="mb-2">Heading 1</h1>
                  <p className="ds-caption font-mono">84PX DESKTOP • 72PX TABLET • 60PX MOBILE</p>
                </div>
                <div>
                  <h2 className="mb-2">Heading 2</h2>
                  <p className="ds-caption font-mono">54PX DESKTOP • 40PX TABLET • 36PX MOBILE</p>
                </div>
                <div>
                  <h3 className="mb-2">Heading 3</h3>
                  <p className="ds-caption font-mono">36PX DESKTOP • 30PX TABLET • 24PX MOBILE</p>
                </div>
                <div>
                  <h4 className="mb-2">Heading 4</h4>
                  <p className="ds-caption font-mono">30PX DESKTOP • 24PX TABLET • 20PX MOBILE</p>
                </div>
                <div>
                  <h5 className="mb-2">Heading 5</h5>
                  <p className="ds-caption font-mono">24PX DESKTOP • 20PX TABLET • 18PX MOBILE</p>
                </div>
                <div>
                  <h6 className="mb-2">Heading 6</h6>
                  <p className="ds-caption font-mono">20PX DESKTOP • 18PX TABLET • 16PX MOBILE</p>
                </div>
              </div>
            </div>

            {/* Small Headings */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4">Small Headings (Argent CF - Light 100)</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="h1-small mb-2">Heading 1 Small</h1>
                  <p className="ds-caption font-mono">60PX DESKTOP • 48PX TABLET • 36PX MOBILE</p>
                </div>
                <div>
                  <h2 className="h2-small mb-2">Heading 2 Small</h2>
                  <p className="ds-caption font-mono">36PX DESKTOP • 30PX TABLET • 24PX MOBILE</p>
                </div>
                <div>
                  <h3 className="h3-small mb-2">Heading 3 Small</h3>
                  <p className="ds-caption font-mono">24PX DESKTOP • 20PX TABLET • 18PX MOBILE</p>
                </div>
                <div>
                  <h4 className="h4-small mb-2">Heading 4 Small</h4>
                  <p className="ds-caption font-mono">20PX DESKTOP • 18PX TABLET • 16PX MOBILE</p>
                </div>
                <div>
                  <h5 className="h5-small mb-2">Heading 5 Small</h5>
                  <p className="ds-caption font-mono">18PX DESKTOP • 16PX TABLET • 14PX MOBILE</p>
                </div>
                <div>
                  <h6 className="h6-small mb-2">Heading 6 Small</h6>
                  <p className="ds-caption font-mono">16PX DESKTOP • 14PX TABLET • 12PX MOBILE</p>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div className="mb-8">
              <h3 className="ds-subheading text-gray-700 mb-4">Body Text (McQueen Grotesk - Light 100)</h3>
              <div className="space-y-4">
                <div>
                  <p className="body-xl mb-2">Body Extra Large - This is the largest body text style used for introductory paragraphs and key content areas.</p>
                  <p className="ds-caption font-mono">30PX DESKTOP • 24PX TABLET • 20PX MOBILE • LINE HEIGHT: 125%</p>
                </div>
                <div>
                  <p className="body-lg mb-2">Body Large - This is the standard large body text used for main content and important information.</p>
                  <p className="ds-caption font-mono">20PX DESKTOP • 18PX TABLET • 16PX MOBILE • LINE HEIGHT: 125%</p>
                </div>
                <div>
                  <p className="body-base mb-2">Body Base - This is the standard body text used throughout the application for general content.</p>
                  <p className="ds-caption font-mono">16PX DESKTOP • 14PX TABLET • 12PX MOBILE • LINE HEIGHT: 125%</p>
                </div>
                <div>
                  <p className="body-small mb-2">Body Small - This is used for secondary information, captions, and supporting text.</p>
                  <p className="ds-caption font-mono">14PX DESKTOP • 12PX TABLET • 10PX MOBILE • LINE HEIGHT: 125%</p>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div>
              <h3 className="ds-subheading text-gray-700 mb-4">Labels (McQueen Grotesk - Regular 400)</h3>
              <div className="space-y-4">
                <div>
                  <p className="label-lg mb-2">LABEL LARGE</p>
                  <p className="ds-caption font-mono">18PX DESKTOP • 16PX TABLET • 14PX MOBILE • LINE HEIGHT: 100% • LETTER SPACING: 0.02EM</p>
                </div>
                <div>
                  <p className="label-base mb-2">LABEL BASE</p>
                  <p className="ds-caption font-mono">16PX DESKTOP • 14PX TABLET • 12PX MOBILE • LINE HEIGHT: 100% • LETTER SPACING: 0.015EM</p>
                </div>
                <div>
                  <p className="label-base-title mb-2">Label Base Title Case</p>
                  <p className="ds-caption font-mono">16PX DESKTOP • 14PX TABLET • 12PX MOBILE • LINE HEIGHT: 100% • LETTER SPACING: 0.015EM</p>
                </div>
                <div>
                  <p className="label-small mb-2">LABEL SMALL</p>
                  <p className="ds-caption font-mono">14PX DESKTOP • 12PX TABLET • 10PX MOBILE • LINE HEIGHT: 100% • LETTER SPACING: 0.02EM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Font Weights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">McQueen Grotesk</h3>
                <div className="space-y-2">
                  <p className="font-thin">Thin (100) - Used for headings</p>
                  <p className="font-light">Light (300) - Available weight</p>
                  <p className="font-normal">Regular (400) - Used for labels</p>
                  <p className="font-medium">Medium (500) - Available weight</p>
                  <p className="font-semibold">SemiBold (600) - Available weight</p>
                  <p className="font-bold">Bold (700) - Available weight</p>
                </div>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Argent CF</h3>
                <div className="space-y-2">
                  <p className="font-thin">Light (100) - Used for headings</p>
                  <p className="font-normal">Regular (400) - Available weight</p>
                  <p className="font-semibold">DemiBold (600) - Available weight</p>
                  <p className="font-bold">Bold (700) - Available weight</p>
                  <p className="font-extrabold">ExtraBold (800) - Available weight</p>
                  <p className="font-black">Super (900) - Available weight</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Typography Demo */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Responsive Typography Demo</h2>
            <p className="body-xl mb-4">
              This text demonstrates responsive typography using CSS clamp(). Resize your browser window to see how the text scales smoothly between breakpoints.
            </p>
            <p className="body-lg mb-4">
              The typography system automatically adjusts font sizes based on viewport width, ensuring optimal readability across all devices.
            </p>
            <p className="body-base">
              All text elements use this responsive approach, maintaining visual hierarchy and readability at every screen size.
            </p>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Usage Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Page Header</h3>
                <div className="space-y-2">
                  <h1 className="mb-2">Page Title</h1>
                  <p className="body-xl">This is the main description that explains what this page is about.</p>
                </div>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Content Section</h3>
                <div className="space-y-2">
                  <h2 className="mb-2">Section Heading</h2>
                  <p className="body-lg">This is the section content that provides detailed information.</p>
                  <p className="label-base">Section Label</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSS Classes Reference */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">CSS Classes Reference</h2>
            <div className="bg-gray-900 text-white p-6 rounded-lg font-mono">
              <h4 className="text-white mb-4">Available Typography Classes:</h4>
              <div className="space-y-2 text-sm">
                <p>• <span className="text-green-400">h1</span> through <span className="text-green-400">h6</span> - Large headings (Argent CF, Light 100)</p>
                <p>• <span className="text-green-400">h1-small</span> through <span className="text-green-400">h6-small</span> - Small headings (Argent CF, Light 100)</p>
                <p>• <span className="text-green-400">body-xl</span>, <span className="text-green-400">body-lg</span>, <span className="text-green-400">body-base</span>, <span className="text-green-400">body-small</span> - Body text (McQueen Grotesk, Light 100)</p>
                <p>• <span className="text-green-400">label-lg</span>, <span className="text-green-400">label-base</span>, <span className="text-green-400">label-small</span> - Labels (McQueen Grotesk, Regular 400)</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </DesignSystemLayout>
  );
}
