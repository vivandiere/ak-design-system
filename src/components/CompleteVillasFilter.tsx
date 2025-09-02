'use client';

import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import CompactDestinationFilter from './CompactDestinationFilter';
import DateRangeSelector from './DateRangeSelector';

const CompleteVillasFilter = () => {
  const [guests, setGuests] = useState<string>('Any');
  const [bedrooms, setBedrooms] = useState<string>('Any');
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [selectedVillaType, setSelectedVillaType] = useState('All');
  const [selectedAmenities, setSelectedAmenities] = useState(new Set<string>());

  const villaTypes = [
    'All', 'Beach Villas', 'Family Villas', 'Large Group', 'Amazing Pools', 
    'Tennis Courts', 'Honeymoon', 'Spa & Wellness', 'Wedding'
  ];

  const amenities = [
    'Catered Villa', 'Indoor Pool', 'Direct beach / sea access', 
    'Walking distance to beach / sea', 'Short walk to shop(s) / restaurant(s)',
    'In villa cook', 'Infinity Pool', 'Hot tub', 'Sea View', 
    'Tennis Court', 'Gym', 'Gated Entry'
  ];

  const handleGuestChange = (direction: 'increase' | 'decrease') => {
    if (direction === 'decrease' && guests !== 'Any') {
      const current = parseInt(guests);
      setGuests(current > 1 ? (current - 1).toString() : 'Any');
    } else if (direction === 'increase' && guests !== 'Any') {
      const current = parseInt(guests);
      setGuests((current + 1).toString());
    } else if (direction === 'increase' && guests === 'Any') {
      setGuests('1');
    }
  };

  const handleBedroomChange = (direction: 'increase' | 'decrease') => {
    if (direction === 'decrease' && bedrooms !== 'Any') {
      const current = parseInt(bedrooms);
      setBedrooms(current > 1 ? (current - 1).toString() : 'Any');
    } else if (direction === 'increase' && bedrooms !== 'Any') {
      const current = parseInt(bedrooms);
      setBedrooms((current + 1).toString());
    } else if (direction === 'increase' && bedrooms === 'Any') {
      setBedrooms('1');
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    const newSelected = new Set(selectedAmenities);
    if (newSelected.has(amenity)) {
      newSelected.delete(amenity);
    } else {
      newSelected.add(amenity);
    }
    setSelectedAmenities(newSelected);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-onyx-20 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-onyx-20">
        <h2 className="label-lg text-onyx">ALL FILTERS</h2>
        <button className="p-2 hover:bg-linen-50 rounded-full transition-colors">
          <X className="w-5 h-5 text-onyx-60" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Destination Section */}
        <div className="space-y-3">
          <h3 className="label-base text-onyx">DESTINATION</h3>
          <CompactDestinationFilter />
        </div>

        {/* When Section */}
        <div className="space-y-3">
          <h3 className="label-base text-onyx">WHEN</h3>
          <DateRangeSelector 
            placeholder="Add Dates"
            onDateRangeChange={(startDate, endDate) => {
              console.log('Date range selected:', { startDate, endDate });
            }}
          />
        </div>

        {/* Guests and Bedrooms Section */}
        <div className="space-y-4">
          <h3 className="label-base text-onyx">GUESTS AND BEDROOMS</h3>
          
          {/* Number of Guests */}
          <div className="space-y-2">
            <label className="body-base text-onyx-80">Number of Guests</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleGuestChange('decrease')}
                className="w-8 h-8 rounded-full border border-onyx-20 flex items-center justify-center hover:bg-linen-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-onyx-60" />
              </button>
              <span className="w-16 text-center body-base text-onyx">{guests}</span>
              <button
                onClick={() => handleGuestChange('increase')}
                className="w-8 h-8 rounded-full border border-onyx-20 flex items-center justify-center hover:bg-linen-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-onyx-60" />
              </button>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <label className="body-base text-onyx-80">Bedrooms</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBedroomChange('decrease')}
                className="w-8 h-8 rounded-full border border-onyx-20 flex items-center justify-center hover:bg-linen-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-onyx-60" />
              </button>
              <span className="w-16 text-center body-base text-onyx">{bedrooms}</span>
              <button
                onClick={() => handleBedroomChange('increase')}
                className="w-8 h-8 rounded-full border border-onyx-20 flex items-center justify-center hover:bg-linen-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-onyx-60" />
              </button>
            </div>
          </div>
        </div>

        {/* Price Per Week Section */}
        <div className="space-y-4">
          <h3 className="label-base text-onyx">PRICE PER WEEK</h3>
          <p className="body-small text-onyx-60">The average weekly price is $16600</p>
          
          {/* Price Range Slider */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="body-small text-onyx-60">${priceRange[0]}</span>
              <span className="body-small text-onyx-60">${priceRange[1]}</span>
            </div>
            
            {/* Custom Range Slider */}
            <div className="relative">
              {/* Background Track */}
              <div className="h-2 bg-gray-100 border border-gray-200 rounded-full">
                {/* Selected Range */}
                <div 
                  className="h-2 bg-onyx rounded-full absolute"
                  style={{ 
                    left: `${(priceRange[0] / 10000) * 100}%`, 
                    right: `${100 - (priceRange[1] / 10000) * 100}%` 
                  }}
                ></div>
              </div>
              
              {/* Min Handle */}
              <div 
                className="absolute w-6 h-6 bg-white border-2 border-onyx rounded-full shadow-md cursor-pointer transform -translate-y-1/2 top-1/2"
                style={{ left: `${(priceRange[0] / 10000) * 100}%` }}
                onMouseDown={(e) => {
                  const sliderContainer = e.currentTarget.closest('.relative');
                  if (!sliderContainer) return;
                  
                  const handleDrag = (moveEvent: MouseEvent) => {
                    const rect = sliderContainer.getBoundingClientRect();
                    const x = moveEvent.clientX - rect.left;
                    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                    const value = Math.round((percent / 100) * 10000);
                    if (value < priceRange[1]) {
                      handlePriceChange(0, value);
                    }
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleDrag);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleDrag);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />
              
              {/* Max Handle */}
              <div 
                className="absolute w-6 h-6 bg-white border-2 border-onyx rounded-full shadow-md cursor-pointer transform -translate-y-1/2 top-1/2"
                style={{ left: `${(priceRange[1] / 10000) * 100}%` }}
                onMouseDown={(e) => {
                  const sliderContainer = e.currentTarget.closest('.relative');
                  if (!sliderContainer) return;
                  
                  const handleDrag = (moveEvent: MouseEvent) => {
                    const rect = sliderContainer.getBoundingClientRect();
                    const x = moveEvent.clientX - rect.left;
                    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                    const value = Math.round((percent / 100) * 10000);
                    if (value > priceRange[0]) {
                      handlePriceChange(1, value);
                    }
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleDrag);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleDrag);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />
            </div>

            {/* Price Distribution Chart */}
            <div className="flex items-end space-x-1 h-8">
              {[20, 40, 60, 80, 100, 80, 60, 40, 20, 10].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 bg-onyx-20 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Villa Types Section */}
        <div className="space-y-4">
          <h3 className="label-base text-onyx">VILLA TYPES</h3>
          <div className="flex flex-wrap gap-2">
            {villaTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedVillaType(type)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedVillaType === type
                    ? 'bg-onyx text-white'
                    : 'bg-linen-100 text-onyx hover:bg-linen-200'
                } body-small`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Featured & Amenities Section */}
        <div className="space-y-4">
          <h3 className="label-base text-onyx">FEATURED & AMENITIES</h3>
          <div className="space-y-3">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.has(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-burnt-sienna-500 border-onyx-20 rounded focus:ring-burnt-sienna-500 focus:ring-2"
                />
                <span className="body-base text-onyx-80">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteVillasFilter;
