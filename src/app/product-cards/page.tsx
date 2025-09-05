import DesignSystemLayout from '@/components/DesignSystemLayout'
import VillaCard from '@/components/VillaCard'

export default function ProductCardsPage() {
  return (
    <DesignSystemLayout>
      <div className="p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Product Cards</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Product cards showcase villas, experiences, and other A&K offerings with consistent 
            layout, typography, and visual hierarchy. Each card includes imagery, key details, 
            and pricing information in a scannable format.
          </p>
        </header>

        {/* Villa Cards Section */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Villa Cards</h2>
            
            <div className="space-y-12">
              {/* Standard Villa Card */}
              <div>
                <h3 className="ds-subheading mb-6">Standard Villa Card</h3>
                <p className="body-base text-gray-600 mb-6">
                  Primary villa card featuring hero image, essential details, and pricing. 
                  Fixed 3:2 aspect ratio ensures consistent layout across all cards.
                </p>
                
                <div className="max-w-sm">
                  <VillaCard
                    title="Château De La Baie"
                    location="CÔTE D'AZUR, FRANCE"
                    description="A tranquil, east-meets-west escape above La Seyne-sur-Mer"
                    guests={12}
                    bedrooms={8}
                    priceFrom={12975}
                    pricePerNight={1568}
                    imageUrl="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=1200&q=80"
                    offers={[
                      {
                        id: 'new',
                        type: 'service',
                        title: 'NEW',
                        color: 'cerulean'
                      },
                      {
                        id: 'offer',
                        type: 'price',
                        title: 'OFFER',
                        color: 'sienna'
                      }
                    ]}
                  />
                </div>
              </div>

              {/* Villa Card Variations */}
              <div>
                <h3 className="ds-subheading mb-6">Variations</h3>
                <p className="body-base text-gray-600 mb-6">
                  Different configurations showing various offer states and pricing models.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card with Single Offer */}
                  <VillaCard
                    title="Villa Mediterra"
                    location="TUSCANY, ITALY"
                    description="Stunning hillside retreat with panoramic views of the Mediterranean coastline and private vineyard"
                    guests={8}
                    bedrooms={4}
                    priceFrom={8500}
                    pricePerNight={1200}
                    imageUrl="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=1200&q=80"
                    offers={[
                      {
                        id: 'early-bird',
                        type: 'price',
                        title: 'EARLY BIRD',
                        color: 'forest'
                      }
                    ]}
                  />

                  {/* Card without Offers */}
                  <VillaCard
                    title="Casa del Sol"
                    location="MARBELLA, SPAIN"
                    description="Modern luxury villa with infinity pool and direct beach access in exclusive Puerto Banús"
                    guests={10}
                    bedrooms={5}
                    priceFrom={15200}
                    pricePerNight={2100}
                    imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=1200&q=80"
                  />

                  {/* Card with Service Offer */}
                  <VillaCard
                    title="Alpine Chalet Blanc"
                    location="COURCHEVEL, FRANCE"
                    description="Exclusive ski-in, ski-out chalet with world-class amenities and mountain views"
                    guests={14}
                    bedrooms={7}
                    priceFrom={25000}
                    pricePerNight={3500}
                    imageUrl="https://images.unsplash.com/photo-1544957992-20514f595d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=1200&q=80"
                    offers={[
                      {
                        id: 'concierge',
                        type: 'service',
                        title: 'CONCIERGE',
                        color: 'warm-sand'
                      }
                    ]}
                  />
                </div>
              </div>

              {/* Typography Specifications */}
              <div>
                <h3 className="ds-subheading mb-6">Typography Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="label-base text-gray-700 mb-3">Text Elements</h4>
                      <ul className="body-small text-gray-600 space-y-2">
                        <li>• <span className="font-medium">Product Title:</span> Heading H5</li>
                        <li>• <span className="font-medium">Location:</span> Label Base</li>
                        <li>• <span className="font-medium">Description:</span> Body Small</li>
                        <li>• <span className="font-medium">Meta Data:</span> Label Base</li>
                        <li>• <span className="font-medium">Pricing:</span> Label Base + Text SM</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="label-base text-gray-700 mb-3">Layout Specifications</h4>
                      <ul className="body-small text-gray-600 space-y-2">
                        <li>• <span className="font-medium">Image Ratio:</span> Fixed 3:2 aspect ratio</li>
                        <li>• <span className="font-medium">Image Padding:</span> 8px (p-2) around image</li>
                        <li>• <span className="font-medium">Content Padding:</span> 16px (p-4)</li>
                        <li>• <span className="font-medium">Border Radius:</span> None (sharp corners)</li>
                        <li>• <span className="font-medium">Hover State:</span> None (static)</li>
                        <li>• <span className="font-medium">Badges:</span> Top-left absolute positioning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Guidelines */}
              <div>
                <h3 className="ds-subheading mb-6">Usage Guidelines</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="label-base text-green-700 mb-3">✓ Do</h4>
                      <ul className="body-small text-gray-600 space-y-2">
                        <li>• Use high-quality, professional imagery</li>
                        <li>• Maintain consistent 3:2 aspect ratio</li>
                        <li>• Keep descriptions concise and compelling</li>
                        <li>• Use appropriate offer badges sparingly</li>
                        <li>• Ensure pricing information is clear</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="label-base text-red-700 mb-3">✗ Don't</h4>
                      <ul className="body-small text-gray-600 space-y-2">
                        <li>• Overcrowd cards with too many badges</li>
                        <li>• Use inconsistent image ratios</li>
                        <li>• Include overly lengthy descriptions</li>
                        <li>• Mix different card heights in grids</li>
                        <li>• Omit essential pricing information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  );
}
