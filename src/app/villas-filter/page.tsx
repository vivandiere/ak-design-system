import VillasFilter from '@/components/VillasFilter';
import CompleteVillasFilter from '@/components/CompleteVillasFilter';
import DesignSystemLayout from '@/components/DesignSystemLayout';

export default function VillasFilterPage() {
  return (
    <DesignSystemLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="ds-display mb-4">Villas Filter</h1>
          <p className="ds-body-large text-onyx-80">
            Comprehensive filter components for villa booking systems. Includes both a destination-focused filter and a complete filter sidebar with all search criteria.
          </p>
        </div>

        {/* Complete Filter Sidebar Demo */}
        <div className="space-y-4">
          <h2 className="ds-heading mb-4">Complete Filter Sidebar</h2>
          <p className="ds-body-base text-onyx-80">
            Full-featured filter sidebar with destination, dates, guests, bedrooms, price range, villa types, and amenities.
          </p>
          <div className="p-8 bg-linen-25 rounded-lg flex justify-center">
            <CompleteVillasFilter />
          </div>
        </div>

        {/* Destination Filter Demo */}
        <div className="space-y-4">
          <h2 className="ds-heading mb-4">Destination Filter Component</h2>
          <p className="ds-body-base text-onyx-80">
            Hierarchical destination filter for selecting countries and regions.
          </p>
          <div className="p-8 bg-linen-25 rounded-lg">
            <VillasFilter />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="ds-heading mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Hierarchical Selection</h3>
              <p className="ds-body-base text-onyx-80">Select entire countries or individual regions with smart checkbox states</p>
            </div>
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Expandable Sections</h3>
              <p className="ds-body-base text-onyx-80">Click countries to expand and see available regions</p>
            </div>
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Visual Feedback</h3>
              <p className="ds-body-base text-onyx-80">Clear indication of selected, partially selected, and unselected states</p>
            </div>
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Selection Summary</h3>
              <p className="ds-body-base text-onyx-80">Shows selected destinations with overflow handling</p>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <h2 className="ds-heading mb-4">Usage</h2>
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              <code>{`import VillasFilter from '@/components/VillasFilter';

// Basic usage
<VillasFilter />

// The component manages its own state
// No props required - fully self-contained`}</code>
            </pre>
          </div>
        </div>

        {/* Design System Integration */}
        <div className="space-y-4">
          <h2 className="ds-heading mb-4">Design System Integration</h2>
          <div className="space-y-4">
            <div>
              <h3 className="ds-subheading mb-2">Typography</h3>
              <ul className="space-y-2 ds-body-base text-onyx-80">
                <li>• Headers use <code className="bg-gray-100 px-1 rounded">ds-label-base</code> and <code className="bg-gray-100 px-1 rounded">ds-label-base-title</code></li>
                <li>• Country names use <code className="bg-gray-100 px-1 rounded">ds-label-base</code></li>
                <li>• Region names use <code className="bg-gray-100 px-1 rounded">ds-body-base</code></li>
                <li>• Counts and summaries use <code className="bg-gray-100 px-1 rounded">ds-body-small</code></li>
              </ul>
            </div>
            <div>
              <h3 className="ds-subheading mb-2">Colors</h3>
              <ul className="space-y-2 ds-body-base text-onyx-80">
                <li>• Primary: <code className="bg-gray-100 px-1 rounded">burnt-sienna-500</code> for selections</li>
                <li>• Borders: <code className="bg-gray-100 px-1 rounded">onyx-20</code> for subtle lines</li>
                <li>• Backgrounds: <code className="bg-gray-100 px-1 rounded">linen-50</code> and <code className="bg-gray-100 px-1 rounded">linen-25</code></li>
                <li>• Text: <code className="bg-gray-100 px-1 rounded">onyx</code> primary, <code className="bg-gray-100 px-1 rounded">onyx-60</code> secondary</li>
              </ul>
            </div>
            <div>
              <h3 className="ds-subheading mb-2">Spacing</h3>
              <ul className="space-y-2 ds-body-base text-onyx-80">
                <li>• Consistent 8px base unit spacing</li>
                <li>• Padding: <code className="bg-gray-100 px-1 rounded">p-4</code> for items, <code className="bg-gray-100 px-1 rounded">p-6</code> for headers</li>
                <li>• Margins: <code className="bg-gray-100 px-1 rounded">space-x-3</code> between elements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="space-y-4">
          <h2 className="ds-heading mb-4">Accessibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Keyboard Navigation</h3>
              <p className="ds-body-base text-onyx-80">Full keyboard support with proper focus management</p>
            </div>
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Screen Readers</h3>
              <p className="ds-body-base text-onyx-80">Proper ARIA labels and semantic HTML structure</p>
            </div>
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Visual States</h3>
              <p className="ds-body-base text-onyx-80">Clear visual feedback for all interactive states</p>
            </div>
            <div className="p-4 bg-white border border-onyx-20 rounded-lg">
              <h3 className="ds-subheading mb-2">Touch Targets</h3>
              <p className="ds-body-base text-onyx-80">Adequate sizing for mobile and touch devices</p>
            </div>
          </div>
        </div>
      </div>
    </DesignSystemLayout>
  );
}
