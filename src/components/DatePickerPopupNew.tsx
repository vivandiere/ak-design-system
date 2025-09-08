'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { Popup } from '@/components/ui/popup';
import { MultiMonthCalendar } from '@/components/ui/multi-month-calendar';
import OffersBadge from '@/components/OffersBadge';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DatePickerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (startDate: Date, endDate: Date) => void;
  onConfirm?: () => void;
  minStayNights?: number;
}

interface SelectedStay {
  start: Date | null;
  end: Date | null;
  weeks: number;
  nights: number;
}

// === BOOKING BUSINESS LOGIC ===
const MIN_SHORT_STAY = 3;
const MAX_SHORT_STAY = 21; // Max 3 weeks for short stays

// Mock booking data - Saturday check-ins for weekly bookings
const getWeeklyBookings = (): { start: Date; weeks: number }[] => {
  return [
    { start: new Date(2025, 3, 12), weeks: 1 }, // April 12-18 (1 week)
    { start: new Date(2025, 3, 26), weeks: 2 }, // April 26 - May 9 (2 weeks)
    { start: new Date(2025, 4, 17), weeks: 1 }, // May 17-23 (1 week)
  ];
};

const getShortStayBookings = (): { start: Date; nights: number }[] => {
  return [
    { start: new Date(2025, 4, 3), nights: 4 },  // May 3-6 (4 nights)
    { start: new Date(2025, 4, 31), nights: 3 }, // May 31 - June 2 (3 nights)
  ];
};

const getBookedDates = (): Date[] => {
  const bookedDates: Date[] = [];
  
  // Add weekly bookings (Saturday to Friday blocks)
  getWeeklyBookings().forEach(booking => {
    for (let week = 0; week < booking.weeks; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(booking.start);
        date.setDate(booking.start.getDate() + (week * 7) + day);
        bookedDates.push(date);
      }
    }
  });

  // Add short stay bookings
  getShortStayBookings().forEach(booking => {
    for (let day = 0; day < booking.nights; day++) {
      const date = new Date(booking.start);
      date.setDate(booking.start.getDate() + day);
      bookedDates.push(date);
    }
  });

  return bookedDates;
};

const getAllUnavailableDates = (): Date[] => {
  const unavailableDates: Date[] = [];
  
  // Add all booked dates
  unavailableDates.push(...getBookedDates());
  
  // Add maintenance/unavailable periods
  unavailableDates.push(
    new Date(2025, 3, 1),  // April 1
    new Date(2025, 3, 2),  // April 2 
    new Date(2025, 3, 3),  // April 3
    new Date(2025, 5, 10), // June 10
    new Date(2025, 5, 11), // June 11
  );
  
  return unavailableDates;
};

const isDateUnavailable = (date: Date): boolean => {
  const unavailableDates = getAllUnavailableDates();
  return unavailableDates.some(unavailableDate => 
    unavailableDate.getTime() === date.getTime()
  );
};

const isWeeklyPeriodAvailable = (startDate: Date, weeks: number): boolean => {
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      const checkDate = new Date(startDate);
      checkDate.setDate(startDate.getDate() + (week * 7) + day);
      if (isDateUnavailable(checkDate)) {
        return false;
      }
    }
  }
  return true;
};

const isShortStayPeriodAvailable = (startDate: Date, nights: number): boolean => {
  for (let day = 0; day < nights; day++) {
    const checkDate = new Date(startDate);
    checkDate.setDate(startDate.getDate() + day);
    if (isDateUnavailable(checkDate)) {
      return false;
    }
  }
  return true;
};

const updateStayDuration = (startDate: Date, weeks: number): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (weeks * 7) - 1);
  return endDate;
};

const updateShortStayDuration = (startDate: Date, nights: number): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + nights);
  return endDate;
};

const DatePickerPopup: React.FC<DatePickerPopupProps> = ({
  isOpen,
  onClose,
  anchorRef,
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  onConfirm,
  minStayNights = 3
}) => {
  const [bookingMode, setBookingMode] = useState<'weekly' | 'short'>('weekly');
  const [selectedStay, setSelectedStay] = useState<SelectedStay>({ 
    start: selectedStartDate, 
    end: selectedEndDate,
    weeks: 1,
    nights: minStayNights
  });

  // Generate array of unavailable dates for react-day-picker
  const unavailableDates = getAllUnavailableDates();

  // Pricing constants
  const baseWeeklyRate = 8400;
  const baseNightlyRate = 1200;
  const weeklyDiscountPercent = 0.15; // 15% off for 7+ days

  // Calculate pricing with offers
  const calculatePricing = () => {
    const basePrice = bookingMode === 'weekly' 
      ? selectedStay.weeks * baseWeeklyRate 
      : selectedStay.nights * baseNightlyRate;
    
    // Apply discount for weekly stays (2+ weeks)
    const discountedPrice = (bookingMode === 'weekly' && selectedStay.weeks >= 2) 
      ? basePrice * (1 - weeklyDiscountPercent)
      : basePrice;
    
    const savings = basePrice - discountedPrice;
    
    return {
      basePrice,
      finalPrice: discountedPrice,
      savings,
      hasDiscount: savings > 0,
      discountPercent: weeklyDiscountPercent
    };
  };

  // Get applicable offers
  const getApplicableOffers = () => {
    const offers = [];
    
    if (selectedStay.start && selectedStay.end && selectedStay.weeks >= 2 && bookingMode === 'weekly') {
      offers.push({
        id: 'weekly-discount',
        type: 'price' as const,
        title: '15% off',
        description: 'for stays over 7 days',
        color: 'forest' as const
      });
    }
    
    return offers;
  };

  // Convert SelectedStay to DateRange for react-day-picker
  const dateRange: DateRange | undefined = selectedStay.start && selectedStay.end ? {
    from: selectedStay.start,
    to: selectedStay.end
  } : undefined;

  // Saturday check-in validation for weekly bookings
  const isSaturday = (date: Date) => date.getDay() === 6;

  // Update stay when external props change
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setSelectedStay({
        start: selectedStartDate,
        end: selectedEndDate,
        weeks: Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24 * 7)),
        nights: Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))
      });
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (!range?.from) return;

    // Prevent clicking on unavailable dates
    if (isDateUnavailable(range.from)) return;

    if (bookingMode === 'weekly') {
      // Weekly bookings must start on Saturday
      if (!isSaturday(range.from)) {
        alert('Weekly bookings must start on Saturday');
        return;
      }
      
      // Check if the full week is available
      if (!isWeeklyPeriodAvailable(range.from, selectedStay.weeks)) {
        alert('This week overlaps with existing bookings or unavailable dates.');
        return;
      }
      
      const newEndDate = updateStayDuration(range.from, selectedStay.weeks);
      const newStay = {
        start: range.from,
        end: newEndDate,
        weeks: selectedStay.weeks,
        nights: selectedStay.weeks * 7
      };
      setSelectedStay(newStay);
      onDateSelect(range.from, newEndDate);
    } else {
      // Short stay bookings - simplified logic
      
      // If we already have a start date and clicked a different date after it
      if (selectedStay.start && range.from.getTime() > selectedStay.start.getTime()) {
        // Calculate nights between start and clicked date
        const timeDiff = range.from.getTime() - selectedStay.start.getTime();
        const calculatedNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        // Check minimum stay requirement
        if (calculatedNights < minStayNights) {
          alert(`Minimum stay is ${minStayNights} nights`);
          return;
        }
        
        // Check if the period is available
        if (!isShortStayPeriodAvailable(selectedStay.start, calculatedNights)) {
          alert('This stay period overlaps with existing bookings or unavailable dates.');
          return;
        }
        
        const newStay = {
          start: selectedStay.start,
          end: range.from,
          weeks: 1,
          nights: calculatedNights
        };
        setSelectedStay(newStay);
        onDateSelect(selectedStay.start, range.from);
        return;
      }
      
      // For all other cases (first click, same date, or earlier date), treat as new start date
      const newNights = selectedStay.nights;
      const newEndDate = updateShortStayDuration(range.from, newNights);
      
      // Check if the period is available
      if (!isShortStayPeriodAvailable(range.from, newNights)) {
        alert('This stay period overlaps with existing bookings or unavailable dates.');
        return;
      }
      
      const newStay = {
        start: range.from,
        end: newEndDate,
        weeks: 1,
        nights: newNights
      };
      setSelectedStay(newStay);
      onDateSelect(range.from, newEndDate);
    }
  };

  const handleWeeksChange = (increment: number) => {
    const newWeeks = Math.max(1, selectedStay.weeks + increment);
    
    if (selectedStay.start) {
      const newEndDate = updateStayDuration(selectedStay.start, newWeeks);
      
      if (isWeeklyPeriodAvailable(selectedStay.start, newWeeks)) {
        const newStay = {
          ...selectedStay,
          weeks: newWeeks,
          nights: newWeeks * 7,
          end: newEndDate
        };
        setSelectedStay(newStay);
        onDateSelect(selectedStay.start, newEndDate);
      } else {
        alert('Cannot extend to this duration - conflicts with existing bookings.');
      }
    } else {
      setSelectedStay(prev => ({ ...prev, weeks: newWeeks }));
    }
  };

  const handleNightsChange = (increment: number) => {
    const newNights = Math.max(MIN_SHORT_STAY, Math.min(MAX_SHORT_STAY, selectedStay.nights + increment));
    
    // If no change (already at limits), return early
    if (newNights === selectedStay.nights) {
      return;
    }
    
    if (selectedStay.start) {
      const newEndDate = updateShortStayDuration(selectedStay.start, newNights);
      
      if (isShortStayPeriodAvailable(selectedStay.start, newNights)) {
        const newStay = {
          ...selectedStay,
          nights: newNights,
          end: newEndDate
        };
        setSelectedStay(newStay);
        onDateSelect(selectedStay.start, newEndDate);
      } else {
        alert('Cannot extend to this duration - conflicts with existing bookings.');
      }
    } else {
      setSelectedStay(prev => ({ ...prev, nights: newNights }));
    }
  };

  const resetSelection = () => {
    setSelectedStay({
      start: null,
      end: null,
      weeks: 1,
      nights: minStayNights
    });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} anchorRef={anchorRef} centerInViewport={true}>
      <div className="w-auto max-w-[95vw] sm:max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header with booking mode toggles */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex justify-center mb-4">
            <Tabs 
              value={bookingMode} 
              onValueChange={(value) => {
                setBookingMode(value as 'weekly' | 'short');
                resetSelection();
              }}
            >
              <TabsList className="bg-background gap-1 border p-1">
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-onyx data-[state=active]:text-white"
                >
                  Weekly Stays
                </TabsTrigger>
                <TabsTrigger
                  value="short"
                  className="data-[state=active]:bg-onyx data-[state=active]:text-white"
                >
                  Short Stays
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Instructions */}
          <div className="text-center">
            <p className="body-large text-onyx font-medium mb-1">
              {bookingMode === 'weekly' 
                ? 'Click any Saturday to start a stay'
                : 'Select your check-in date'
              }
            </p>
            <p className="body-small text-burnt-sienna-500">
              {bookingMode === 'weekly' 
                ? 'Weekly stays must begin on Saturday (7-day blocks)'
                : `Minimum stay: ${minStayNights} nights`
              }
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-2 sm:p-4">
          <MultiMonthCalendar
            numberOfMonths={2}
            selected={dateRange}
            onSelect={handleDateRangeSelect}
            disabled={unavailableDates}
            startMonth={new Date(2025, 3)} // April 2025
            className="border-0 shadow-none"
          />
          
          {/* Legend - positioned right below calendar */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-burnt-sienna-500 rounded-sm"></div>
              <span className="body-small text-onyx-60">Check-in/out</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-burnt-sienna-200 rounded-sm"></div>
              <span className="body-small text-onyx-60">Stay Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
              <span className="body-small text-onyx-60">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Duration controls */}
        <div className="px-3 py-4 sm:px-4 bg-gray-50 border-b border-gray-200">
          {bookingMode === 'weekly' ? (
            <div className="flex items-center justify-center gap-4">
              <span className="label-base text-onyx">Weeks:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWeeksChange(-1)}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "h-7 w-7")}
                  disabled={selectedStay.weeks <= 1}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center font-medium text-sm">{selectedStay.weeks}</span>
                <button
                  onClick={() => handleWeeksChange(1)}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "h-7 w-7")}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <span className="body-small text-onyx-60">
                = {selectedStay.weeks * 7} nights
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="label-base text-onyx">Nights:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNightsChange(-1)}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "h-7 w-7")}
                  disabled={selectedStay.nights <= MIN_SHORT_STAY}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-8 text-center font-medium text-sm">{selectedStay.nights}</span>
                <button
                  onClick={() => handleNightsChange(1)}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "h-7 w-7")}
                  disabled={selectedStay.nights >= MAX_SHORT_STAY}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selection status and pricing */}
        <div className="px-3 py-4 sm:px-4 border-t border-gray-200 bg-gray-50">
          {selectedStay.start && selectedStay.end && (
            <>
              {/* Offers Badge - Inline above pricing */}
              {(() => {
                const offers = getApplicableOffers();
                return offers.length > 0 && (
                  <div className="mb-3">
                    <OffersBadge offers={offers} inline={true} />
                  </div>
                );
              })()}
              
              <div className="flex items-center justify-between">
              {/* Date Range - Left Column */}
              <div className="text-left">
                <p className="text-lg font-medium text-onyx">
                  {selectedStay.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {selectedStay.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className="body-small text-onyx-60">
                  {bookingMode === 'weekly' ? `${selectedStay.weeks} week${selectedStay.weeks > 1 ? 's' : ''}` : `${selectedStay.nights} night${selectedStay.nights > 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Pricing - Right Column */}
              <div className="text-right">
                {(() => {
                  const pricing = calculatePricing();
                  return (
                    <>
                      {pricing.hasDiscount && (
                        <p className="text-sm text-onyx-60 line-through">
                          ${pricing.basePrice.toLocaleString()}
                        </p>
                      )}
                      <p className="text-2xl font-semibold text-onyx">
                        ${pricing.finalPrice.toLocaleString()}
                      </p>
                      {pricing.hasDiscount && (
                        <p className="body-small text-forest-600 font-medium">
                          Save ${pricing.savings.toLocaleString()}
                        </p>
                      )}
                      <p className="body-small text-onyx-60">
                        ${bookingMode === 'weekly' ? baseWeeklyRate.toLocaleString() : baseNightlyRate.toLocaleString()} per {bookingMode === 'weekly' ? 'week' : 'night'}
                      </p>
                    </>
                  );
                })()}
              </div>
              </div>
            </>
          )}

        </div>


        {/* Footer actions */}
        <div className="px-3 py-3 sm:px-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            onClick={resetSelection}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Clear Selection
          </button>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
            <button
              onClick={onClose}
              className={cn(buttonVariants({ variant: 'outline' }), "w-full sm:w-auto")}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedStay.start && selectedStay.end) {
                  onConfirm?.();
                  onClose();
                }
              }}
              disabled={!selectedStay.start || !selectedStay.end}
              className={cn(buttonVariants({ variant: 'default' }), "w-full sm:w-auto")}
            >
              Confirm Dates
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default DatePickerPopup;
