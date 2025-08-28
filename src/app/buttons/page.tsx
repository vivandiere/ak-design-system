import DesignSystemLayout from '@/components/DesignSystemLayout'
import { Button } from '@/components/ui/button'

export default function ButtonShowcase() {
  return (
    <DesignSystemLayout>
      <div className="p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Button System</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Complete button component library for A&K Design System. This guide showcases all button 
            variants, sizes, and states used throughout the application.
          </p>
        </header>

        {/* Primary Buttons */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Primary Buttons</h2>
            <div className="space-y-6">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Primary (Burnt Sienna)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="sm">Small Primary</Button>
                  <Button variant="primary" size="md">Base Primary</Button>
                  <Button variant="primary" size="lg">Large Primary</Button>
                </div>
                <p className="ds-body mt-3 text-gray-600">Uses burnt-sienna-500 background with white text</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Secondary Buttons</h2>
            <div className="space-y-6">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Secondary (Onyx Outline)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="sm">Small Secondary</Button>
                  <Button variant="secondary" size="md">Base Secondary</Button>
                  <Button variant="secondary" size="lg">Large Secondary</Button>
                </div>
                <p className="ds-body mt-3 text-gray-600">Uses transparent background with onyx border and onyx text</p>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Secondary White (For Dark Backgrounds)</h3>
                <div className="bg-black p-6 rounded-lg">
                  <p className="ds-body-base text-white mb-4">This simulates a dark background or image overlay.</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="secondary-white" size="sm">Small White</Button>
                    <Button variant="secondary-white" size="md">Base White</Button>
                    <Button variant="secondary-white" size="lg">Large White</Button>
                  </div>
                </div>
                <p className="ds-body mt-3 text-gray-600">Uses transparent background with white border and white text for dark surfaces</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tertiary Buttons */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Tertiary Buttons</h2>
            <div className="space-y-6">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Tertiary (ONYX Text)</h3>
                <div className="space-y-4">
                  <p className="ds-body-base text-gray-600">This is example paragraph text. <Button variant="tertiary" size="sm">Small Tertiary</Button> The button aligns with the text baseline.</p>
                  <p className="ds-body-base text-gray-600">Another paragraph example. <Button variant="tertiary" size="md">Base Tertiary</Button> No padding ensures proper text alignment.</p>
                </div>
                <p className="ds-body mt-3 text-gray-600">Uses ONYX text with transparent background, underline, and no padding for text alignment</p>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Tertiary White (For Image Overlays)</h3>
                <div className="bg-black p-6 rounded-lg">
                  <p className="ds-body-base text-white mb-4">This simulates text over a dark image or background.</p>
                  <p className="ds-body-base text-white">Example text with <Button variant="tertiary-white" size="sm">Small White</Button> button that's visible on dark surfaces.</p>
                </div>
                <p className="ds-body mt-3 text-gray-600">Uses white text with transparent background for overlaying on images or dark backgrounds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Size Variations */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Size Variations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">All Sizes - Primary Variant</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">Small (px-8 py-5)</Button>
                  <Button variant="primary" size="md">Base (px-8 py-5)</Button>
                  <Button variant="primary" size="lg">Large (px-8 py-5)</Button>
                </div>
                <p className="ds-body mt-3 text-gray-600">
                  All sizes use consistent padding (px-8 py-5) with responsive typography: 
                  Small uses label-small, Base uses label-base, Large uses label-lg
                </p>
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
                <h3 className="ds-subheading mb-4">Form Actions</h3>
                <div className="flex gap-3">
                  <Button variant="primary" size="md">Submit</Button>
                  <Button variant="secondary" size="md">Cancel</Button>
                </div>
                <p className="ds-body mt-3 text-gray-600">Primary for main action, secondary for secondary</p>
              </div>
              <div className="bg-canvas-100 p-6 rounded-lg">
                <h3 className="ds-subheading mb-4">Navigation</h3>
                <div className="flex gap-3">
                  <Button variant="secondary" size="md">Sign In</Button>
                  <Button variant="tertiary" size="md">Learn More</Button>
                </div>
                <p className="ds-body mt-3 text-gray-600">Secondary for main nav, tertiary for subtle links</p>
              </div>
            </div>
            <div className="mt-6 bg-amber-50 p-6 rounded-lg">
              <h3 className="ds-subheading mb-4">Size Hierarchy Example</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg">Large Primary</Button>
                <Button variant="primary" size="md">Base Primary</Button>
                <Button variant="primary" size="sm">Small Primary</Button>
              </div>
              <p className="ds-body mt-3 text-gray-600">Use large for hero sections, base for standard actions, small for compact interfaces</p>
            </div>
          </div>
        </section>

        {/* CSS Classes Reference */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">CSS Classes Reference</h2>
            <div className="bg-gray-800 text-white p-6 rounded-lg font-mono">
              <h4 className="text-white mb-4">Available Button Variants:</h4>
              <div className="space-y-2 text-sm">
                <p>• <span className="text-green-400">variant="primary"</span> - Burnt Sienna background with white text</p>
                <p>• <span className="text-green-400">variant="secondary"</span> - Transparent background with onyx border and text</p>
                <p>• <span className="text-green-400">variant="secondary-white"</span> - Transparent background with white border and text (for dark backgrounds)</p>
                <p>• <span className="text-green-400">variant="tertiary"</span> - ONYX text with transparent background and underline (no padding)</p>
                <p>• <span className="text-green-400">variant="tertiary-white"</span> - White text with transparent background and underline (no padding, for image overlays)</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white mb-2">Available Sizes:</h4>
                <div className="space-y-1 text-sm">
                  <p>• <span className="text-green-400">size="sm"</span> - Small (label-small typography)</p>
                  <p>• <span className="text-green-400">size="md"</span> - Base (label-base typography)</p>
                  <p>• <span className="text-green-400">size="lg"</span> - Large (label-lg typography)</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white mb-2">Typography & Styling:</h4>
                <div className="space-y-1 text-sm">
                  <p>• Small buttons use <span className="text-green-400">label-small</span> (14px Desktop, 12px Tablet, 10px Mobile)</p>
                  <p>• Base buttons use <span className="text-green-400">label-base</span> (16px Desktop, 14px Tablet, 12px Mobile)</p>
                  <p>• Large buttons use <span className="text-green-400">label-lg</span> (18px Desktop, 16px Tablet, 14px Mobile)</p>
                  <p>• All labels use McQueen Grotesk Regular 400 weight, 100% line height, uppercase</p>
                  <p>• Consistent padding: px-8 py-5 for all sizes</p>
                  <p>• Primary & Secondary: 5px corner radius (rounded-md)</p>
                  <p>• Min-width: 120px for primary/secondary, content-based for tertiary</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  );
}
