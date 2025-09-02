'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const VillasFilter = () => {
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({});
  const [selectedDestinations, setSelectedDestinations] = useState(new Set<string>());

  const destinations: Record<string, { regions: string[] }> = {
    'Italy': {
      regions: ['Sicily', 'Puglia', 'Tuscany', 'Umbria', 'Amalfi Coast', 'Lake Como']
    },
    'France': {
      regions: ['Côte d\'Azur', 'Provence', 'Normandy', 'Loire Valley', 'Dordogne', 'Brittany']
    },
    'Greece': {
      regions: ['Santorini', 'Mykonos', 'Crete', 'Rhodes', 'Corfu', 'Paros']
    },
    'Spain': {
      regions: ['Costa del Sol', 'Balearic Islands', 'Canary Islands', 'Costa Brava', 'Andalusia']
    },
    'Portugal': {
      regions: ['Algarve', 'Porto', 'Madeira', 'Azores', 'Central Portugal']
    }
  };

  const toggleCountry = (country: string) => {
    setExpandedCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  const toggleDestination = (destination: string) => {
    const newSelected = new Set(selectedDestinations);
    if (newSelected.has(destination)) {
      newSelected.delete(destination);
    } else {
      newSelected.add(destination);
    }
    setSelectedDestinations(newSelected);
  };

  const toggleCountryAndRegions = (country: string) => {
    const newSelected = new Set(selectedDestinations);
    const allRegions = destinations[country].regions;
    
    // Check if all regions are selected
    const allSelected = allRegions.every(region => newSelected.has(region));
    
    if (allSelected) {
      // Unselect all regions
      allRegions.forEach(region => newSelected.delete(region));
      newSelected.delete(country);
    } else {
      // Select all regions
      allRegions.forEach(region => newSelected.add(region));
      newSelected.add(country);
    }
    
    setSelectedDestinations(newSelected);
  };

  const isCountrySelected = (country: string) => {
    return destinations[country].regions.every(region => 
      selectedDestinations.has(region)
    );
  };

  const isCountryPartiallySelected = (country: string) => {
    const selectedRegions = destinations[country].regions.filter(region => 
      selectedDestinations.has(region)
    );
    return selectedRegions.length > 0 && selectedRegions.length < destinations[country].regions.length;
  };

  const getSelectedCount = () => selectedDestinations.size;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-onyx-20">
      {/* Header */}
      <div className="p-6 border-b border-onyx-20 bg-linen-50">
        <h3 className="label-base text-center text-onyx">FILTER BY</h3>
        <h4 className="label-base-title mt-2 text-center text-onyx">DESTINATIONS</h4>
        {getSelectedCount() > 0 && (
          <p className="body-small text-center mt-2 text-burnt-sienna-600">{getSelectedCount()} selected</p>
        )}
      </div>

      {/* Filter List */}
      <div className="max-h-80 overflow-y-auto">
        {Object.entries(destinations).map(([country, data]) => (
          <div key={country} className="border-b border-onyx-20 last:border-b-0">
            {/* Country Header */}
            <div 
              className="flex items-center justify-between p-4 hover:bg-linen-50 cursor-pointer select-none transition-colors"
              onClick={() => toggleCountry(country)}
            >
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCountryAndRegions(country);
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isCountrySelected(country) 
                      ? 'bg-burnt-sienna-500 border-burnt-sienna-500' 
                      : isCountryPartiallySelected(country)
                        ? 'bg-burnt-sienna-100 border-burnt-sienna-300'
                        : 'border-onyx-20 hover:border-onyx-40'
                  }`}
                >
                  {isCountrySelected(country) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isCountryPartiallySelected(country) && !isCountrySelected(country) && (
                    <div className="w-2 h-2 bg-burnt-sienna-500 rounded"></div>
                  )}
                </button>
                <span className="label-base text-onyx">{country}</span>
                <span className="body-small text-onyx-60">({data.regions.length})</span>
              </div>
              {expandedCountries[country] ? (
                <ChevronDown className="w-5 h-5 text-onyx-40" />
              ) : (
                <ChevronRight className="w-5 h-5 text-onyx-40" />
              )}
            </div>

            {/* Regions */}
            {expandedCountries[country] && (
              <div className="bg-linen-25">
                {data.regions.map((region) => (
                  <label 
                    key={region}
                    className="flex items-center space-x-3 p-3 pl-12 hover:bg-linen-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDestinations.has(region)}
                      onChange={() => toggleDestination(region)}
                      className="w-4 h-4 text-burnt-sienna-500 border-onyx-20 rounded focus:ring-burnt-sienna-500 focus:ring-2"
                    />
                    <span className="body-base text-onyx flex-1">{region}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Summary */}
      {getSelectedCount() > 0 && (
        <div className="p-4 bg-burnt-sienna-50 border-t border-burnt-sienna-100">
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedDestinations).slice(0, 3).map(destination => (
              <span key={destination} className="px-2 py-1 bg-burnt-sienna-100 text-burnt-sienna-800 text-xs rounded-full label-small">
                {destination}
              </span>
            ))}
            {getSelectedCount() > 3 && (
              <span className="px-2 py-1 bg-onyx-100 text-onyx-600 text-xs rounded-full label-small">
                +{getSelectedCount() - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VillasFilter;

