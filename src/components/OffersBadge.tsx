'use client';

import React from 'react';
import { Percent, Gift } from 'react-feather';
import { cn } from '@/lib/utils';

interface Offer {
  id: string;
  type: 'price' | 'service';
  title: string;
  description: string;
  color?: 'forest' | 'cerulean' | 'sienna' | 'warm-sand';
}

interface OffersBadgeProps {
  offers: Offer[];
  className?: string;
  compact?: boolean; // For smaller displays
  inline?: boolean; // For single-line inline display
}

const OffersBadge: React.FC<OffersBadgeProps> = ({ 
  offers, 
  className = '',
  compact = false,
  inline = false 
}) => {
  if (!offers || offers.length === 0) return null;

  const getOfferStyles = (color: Offer['color'] = 'forest') => {
    const colorMap = {
      forest: 'bg-forest-100 text-forest-800 border-forest-200',
      cerulean: 'bg-cerulean-100 text-cerulean-800 border-cerulean-200',
      sienna: 'bg-burnt-sienna-100 text-burnt-sienna-800 border-burnt-sienna-200',
      'warm-sand': 'bg-warm-sand-100 text-warm-sand-800 border-warm-sand-200'
    };
    return colorMap[color];
  };

  const getOfferIcon = (type: Offer['type'], compact: boolean = false) => {
    const iconSize = compact ? 14 : 16;
    const iconProps = { size: iconSize, className: "flex-shrink-0" };
    
    if (type === 'price') {
      return <Percent {...iconProps} />;
    } else {
      return <Gift {...iconProps} />;
    }
  };

  if (inline) {
    // Inline mode: single line, space-separated offers
    return (
      <div className={cn("flex items-center gap-2 flex-wrap", className)}>
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium",
              getOfferStyles(offer.color)
            )}
          >
            {getOfferIcon(offer.type, true)}
            <span>{offer.title}</span>
            <span className="text-opacity-75">{offer.description}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {offers.map((offer, index) => (
        <div
          key={offer.id}
          className={cn(
            "rounded-lg border px-3 py-2 transition-all duration-200 hover:shadow-sm",
            getOfferStyles(offer.color),
            compact ? "px-2 py-1" : "px-3 py-2"
          )}
        >
          <div className={cn(
            "flex items-center gap-2",
            compact ? "flex-col items-start gap-1" : "flex-row"
          )}>
            {getOfferIcon(offer.type, compact)}
            <div className={cn(
              "flex items-center gap-2",
              compact ? "flex-col items-start gap-0" : "flex-row"
            )}>
              <span className={cn(
                "font-medium",
                compact ? "label-small" : "body-small"
              )}>
                {offer.title}
              </span>
              <span className={cn(
                "text-opacity-75",
                compact ? "label-small" : "body-small"
              )}>
                {offer.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OffersBadge;
