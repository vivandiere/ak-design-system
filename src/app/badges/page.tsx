import DesignSystemLayout from '@/components/DesignSystemLayout'
import OffersBadge from '@/components/OffersBadge'

export default function BadgesPage() {
  return (
    <DesignSystemLayout>
      <div className="p-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Badges</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Offer badges provide clear, visual feedback for discounts, promotions, and service inclusions. 
            They use brand colors and Feather icons to communicate value propositions effectively.
          </p>
        </header>

        {/* Offers Badge Component */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Offers Badge</h2>
            
            <div className="space-y-12">
              {/* Inline Format - Primary Usage */}
              <div>
                <h3 className="ds-subheading mb-6">Inline Format (Recommended)</h3>
                <p className="body-base text-gray-600 mb-6">
                  Compact, single-line badges perfect for pricing sections and tight layouts.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="label-base text-gray-700 mb-2">Price Offers</h4>
                    <div className="space-y-3">
                      <OffersBadge 
                        inline={true}
                        offers={[{
                          id: 'weekly-discount',
                          type: 'price',
                          title: '15% off',
                          description: 'for stays over 7 days',
                          color: 'forest'
                        }]} 
                      />
                      <OffersBadge 
                        inline={true}
                        offers={[{
                          id: 'early-bird',
                          type: 'price',
                          title: '20% off',
                          description: 'book 60 days early',
                          color: 'sienna'
                        }]} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="label-base text-gray-700 mb-2">Service Offers</h4>
                    <div className="space-y-3">
                      <OffersBadge 
                        inline={true}
                        offers={[{
                          id: 'concierge-service',
                          type: 'service',
                          title: 'Complimentary',
                          description: 'concierge service',
                          color: 'cerulean'
                        }]} 
                      />
                      <OffersBadge 
                        inline={true}
                        offers={[{
                          id: 'airport-transfer',
                          type: 'service',
                          title: 'Free airport',
                          description: 'transfer included',
                          color: 'warm-sand'
                        }]} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="label-base text-gray-700 mb-2">Multiple Offers</h4>
                    <OffersBadge 
                      inline={true}
                      offers={[
                        {
                          id: 'weekly-discount',
                          type: 'price',
                          title: '15% off',
                          description: 'for stays over 7 days',
                          color: 'forest'
                        },
                        {
                          id: 'concierge-service',
                          type: 'service',
                          title: 'Complimentary',
                          description: 'concierge service',
                          color: 'cerulean'
                        }
                      ]} 
                    />
                  </div>
                </div>
              </div>

              {/* Standard Format */}
              <div>
                <h3 className="ds-subheading mb-6">Standard Format</h3>
                <p className="body-base text-gray-600 mb-6">
                  Full-sized cards for prominent placement and detailed information.
                </p>
                <OffersBadge offers={[
                  {
                    id: 'weekly-discount',
                    type: 'price',
                    title: '15% off',
                    description: 'for stays over 7 days',
                    color: 'forest'
                  },
                  {
                    id: 'concierge-service',
                    type: 'service',
                    title: 'Complimentary',
                    description: 'concierge service',
                    color: 'cerulean'
                  }
                ]} />
              </div>
              
              {/* Compact Format */}
              <div>
                <h3 className="ds-subheading mb-6">Compact Format</h3>
                <p className="body-base text-gray-600 mb-6">
                  Smaller cards for sidebars and constrained spaces.
                </p>
                <OffersBadge 
                  compact={true}
                  offers={[
                    {
                      id: 'early-bird',
                      type: 'price',
                      title: '20% off',
                      description: 'book 60 days early',
                      color: 'sienna'
                    },
                    {
                      id: 'free-transfer',
                      type: 'service',
                      title: 'Free airport',
                      description: 'transfer included',
                      color: 'warm-sand'
                    }
                  ]} 
                />
              </div>
              
              {/* Brand Colors */}
              <div>
                <h3 className="ds-subheading mb-6">Brand Colors</h3>
                <p className="body-base text-gray-600 mb-6">
                  All badges use A&K design system colors for brand consistency.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="label-base text-gray-700 mb-3">Forest Scale</h4>
                    <OffersBadge 
                      inline={true}
                      offers={[{ 
                        id: 'forest-example', 
                        type: 'price', 
                        title: 'Forest', 
                        description: 'price discounts', 
                        color: 'forest' 
                      }]} 
                    />
                  </div>
                  <div>
                    <h4 className="label-base text-gray-700 mb-3">Cerulean Scale</h4>
                    <OffersBadge 
                      inline={true}
                      offers={[{ 
                        id: 'cerulean-example', 
                        type: 'service', 
                        title: 'Cerulean', 
                        description: 'service offers', 
                        color: 'cerulean' 
                      }]} 
                    />
                  </div>
                  <div>
                    <h4 className="label-base text-gray-700 mb-3">Burnt Sienna Scale</h4>
                    <OffersBadge 
                      inline={true}
                      offers={[{ 
                        id: 'sienna-example', 
                        type: 'price', 
                        title: 'Sienna', 
                        description: 'early bird offers', 
                        color: 'sienna' 
                      }]} 
                    />
                  </div>
                  <div>
                    <h4 className="label-base text-gray-700 mb-3">Warm Sand Scale</h4>
                    <OffersBadge 
                      inline={true}
                      offers={[{ 
                        id: 'warm-sand-example', 
                        type: 'service', 
                        title: 'Warm Sand', 
                        description: 'premium services', 
                        color: 'warm-sand' 
                      }]} 
                    />
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
                        <li>• Use inline format for pricing sections</li>
                        <li>• Pair Forest color with price discounts</li>
                        <li>• Pair Cerulean color with service offers</li>
                        <li>• Include descriptive text with percentages</li>
                        <li>• Use Feather icons for visual consistency</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="label-base text-red-700 mb-3">✗ Don't</h4>
                      <ul className="body-small text-gray-600 space-y-2">
                        <li>• Mix multiple formats in same context</li>
                        <li>• Use generic colors outside design system</li>
                        <li>• Stack multiple badges without spacing</li>
                        <li>• Use badges for non-promotional content</li>
                        <li>• Override badge typography</li>
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
