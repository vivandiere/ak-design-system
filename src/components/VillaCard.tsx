'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import OffersBadge from '@/components/OffersBadge';

interface VillaCardProps {
  title: string;
  location: string;
  description: string;
  guests: number;
  bedrooms: number;
  priceFrom: number;
  pricePerNight: number;
  imageUrl?: string;
  imageAlt?: string;
  offers?: Array<{
    id: string;
    type: 'price' | 'service';
    title: string;
    description: string;
    color?: 'forest' | 'cerulean' | 'sienna' | 'warm-sand';
  }>;
  className?: string;
}

const VillaCard: React.FC<VillaCardProps> = ({
  title,
  location,
  description,
  guests,
  bedrooms,
  priceFrom,
  pricePerNight,
  imageUrl = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=1200&q=80',
  imageAlt,
  offers = [],
  className
}) => {
  return (
    <div className={cn("bg-white border border-gray-200", className)}>
      {/* Image Container - 3:2 Aspect Ratio */}
      <div className="p-2">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img 
            src={imageUrl}
            alt={imageAlt || `${title} - ${location}`}
            className="w-full h-full object-cover"
          />
          
          {/* Offers Badges - Top Left */}
          {offers.length > 0 && (
            <div className="absolute top-3 left-3">
              <div className="flex gap-2">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium text-white",
                      offer.type === 'price' && "bg-burnt-sienna-600",
                      offer.type === 'service' && "bg-onyx"
                    )}
                  >
                    {offer.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title - H5 */}
        <h3 className="h5 text-onyx mb-2">
          {title}
        </h3>

        {/* Location - Label Base */}
        <p className="label-base text-onyx-60 mb-3">
          {location}
        </p>

        {/* Description - Body Small */}
        <p className="body-small text-onyx-80 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Data - Label Base */}
        <div className="flex items-center gap-4 mb-4">
          <span className="label-base text-onyx-60">
            {guests} GUESTS
          </span>
          <span className="text-onyx-20">•</span>
          <span className="label-base text-onyx-60">
            {bedrooms} BEDROOMS
          </span>
        </div>

        {/* Pricing */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="label-base text-gray-500 uppercase tracking-wide">
                PRICE FROM
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-onyx">
                  £{priceFrom.toLocaleString()} week
                </span>
                <span className="text-sm text-onyx-60">
                  / £{pricePerNight.toLocaleString()} night
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;
