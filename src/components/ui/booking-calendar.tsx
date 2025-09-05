'use client'

import React, { useState } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

// === BOOKING LOGIC TYPES ===
interface SelectedStay {
  start: Date | null;
  end: Date | null;
  weeks: number;
  nights: number;
}

interface BookingCalendarProps {
  className?: string;
  onDateRangeSelect?: (range: DateRange | undefined) => void;
  initialMode?: 'weekly' | 'short';
}

// === BOOKING BUSINESS LOGIC ===
const MIN_SHORT_STAY = 3;

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
  endDate.setDate(startDate.getDate() + nights - 1);
  return endDate;
};

// === MAIN COMPONENT ===
export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  className,
  onDateRangeSelect,
  initialMode = 'weekly'
}) => {
  const [month, setMonth] = useState<Date>(new Date(2025, 3)) // April 2025
  const [bookingMode, setBookingMode] = useState<'weekly' | 'short'>(initialMode)
  const [selectedStay, setSelectedStay] = useState<SelectedStay>({ 
    start: null, 
    end: null,
    weeks: 1,
    nights: MIN_SHORT_STAY
  })

  // Generate array of unavailable dates for react-day-picker
  const unavailableDates = getAllUnavailableDates()

  // Convert SelectedStay to DateRange for react-day-picker
  const dateRange: DateRange | undefined = selectedStay.start && selectedStay.end ? {
    from: selectedStay.start,
    to: selectedStay.end
  } : undefined

  // Saturday check-in validation for weekly bookings
  const isSaturday = (date: Date) => date.getDay() === 6

  const handleDayClick = (day: Date | undefined) => {
    if (!day) return
    
    // Prevent clicking on unavailable dates
    if (isDateUnavailable(day)) return

    if (bookingMode === 'weekly') {
      // Weekly bookings must start on Saturday
      if (!isSaturday(day)) {
        alert('Weekly bookings must start on Saturday');
        return;
      }
      
      // Check if the full week is available
      if (!isWeeklyPeriodAvailable(day, selectedStay.weeks)) {
        alert('This week overlaps with existing bookings or unavailable dates.');
        return;
      }
      
      const newEndDate = updateStayDuration(day, selectedStay.weeks);
      const newStay = {
        start: day,
        end: newEndDate,
        weeks: selectedStay.weeks,
        nights: selectedStay.weeks * 7
      };
      setSelectedStay(newStay);
      
      onDateRangeSelect?.({
        from: day,
        to: newEndDate
      });
    } else {
      // Short stay bookings
      if (!isShortStayPeriodAvailable(day, selectedStay.nights)) {
        alert('This stay period overlaps with existing bookings or unavailable dates.');
        return;
      }
      
      const newEndDate = updateShortStayDuration(day, selectedStay.nights);
      const newStay = {
        start: day,
        end: newEndDate,
        weeks: 1,
        nights: selectedStay.nights
      };
      setSelectedStay(newStay);
      
      onDateRangeSelect?.({
        from: day,
        to: newEndDate
      });
    }
  }

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
        
        onDateRangeSelect?.({
          from: selectedStay.start,
          to: newEndDate
        });
      } else {
        alert('Cannot extend to this duration - conflicts with existing bookings.');
      }
    } else {
      setSelectedStay(prev => ({ ...prev, weeks: newWeeks }));
    }
  };

  const handleNightsChange = (increment: number) => {
    const newNights = Math.max(MIN_SHORT_STAY, selectedStay.nights + increment);
    
    if (selectedStay.start) {
      const newEndDate = updateShortStayDuration(selectedStay.start, newNights);
      
      if (isShortStayPeriodAvailable(selectedStay.start, newNights)) {
        const newStay = {
          ...selectedStay,
          nights: newNights,
          end: newEndDate
        };
        setSelectedStay(newStay);
        
        onDateRangeSelect?.({
          from: selectedStay.start,
          to: newEndDate
        });
      } else {
        alert('Cannot extend to this duration - conflicts with existing bookings.');
      }
    } else {
      setSelectedStay(prev => ({ ...prev, nights: newNights }));
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Booking Mode Controls */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setBookingMode('weekly')}
            className={cn(
              buttonVariants({ 
                variant: bookingMode === 'weekly' ? 'default' : 'outline',
                size: 'default' 
              })
            )}
          >
            Weekly Stays
          </button>
          <button
            onClick={() => setBookingMode('short')}
            className={cn(
              buttonVariants({ 
                variant: bookingMode === 'short' ? 'default' : 'outline',
                size: 'default' 
              })
            )}
          >
            Short Stays
          </button>
        </div>

        {/* Duration Controls */}
        {bookingMode === 'weekly' ? (
          <div className="flex items-center gap-4">
            <span className="label-base text-onyx">Weeks:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleWeeksChange(-1)}
                className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
                disabled={selectedStay.weeks <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{selectedStay.weeks}</span>
              <button
                onClick={() => handleWeeksChange(1)}
                className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="body-small text-onyx-60">
              Saturday check-in required • {selectedStay.weeks * 7} nights
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="label-base text-onyx">Nights:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNightsChange(-1)}
                className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
                disabled={selectedStay.nights <= MIN_SHORT_STAY}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{selectedStay.nights}</span>
              <button
                onClick={() => handleNightsChange(1)}
                className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="body-small text-onyx-60">
              Minimum {MIN_SHORT_STAY} nights • Any day check-in
            </span>
          </div>
        )}

        {/* Selection Status */}
        {selectedStay.start && selectedStay.end && (
          <div className="p-4 bg-burnt-sienna-50 border border-burnt-sienna-200 rounded-lg">
            <p className="body-small text-burnt-sienna-800 font-medium">
              Selected: {selectedStay.start.toLocaleDateString()} - {selectedStay.end.toLocaleDateString()}
              {bookingMode === 'weekly' && ` (${selectedStay.weeks} week${selectedStay.weeks > 1 ? 's' : ''})`}
              {bookingMode === 'short' && ` (${selectedStay.nights} nights)`}
            </p>
          </div>
        )}
      </div>

      {/* Two-Month Calendar */}
      <DayPicker
        mode="range"
        selected={dateRange}
        onDayClick={handleDayClick}
        month={month}
        onMonthChange={setMonth}
        numberOfMonths={2}
        disabled={unavailableDates}
        className={cn("border rounded-lg", className)}
        classNames={{
          months: "grid grid-cols-2 gap-8 p-6",
          month_grid: "grid grid-cols-7 gap-0 mt-4",
          weekdays: "grid grid-cols-7 gap-0 mb-2",
          weekday: "body-small text-onyx-60 font-medium p-2 text-center",
          day: "relative h-12 w-12 text-center text-sm flex items-center justify-center cursor-pointer transition-colors",
          range_start: "bg-burnt-sienna-500 text-white rounded-l-lg relative z-10 -mr-px",
          range_middle: "bg-burnt-sienna-100 text-burnt-sienna-900 relative z-10 -mx-px",
          range_end: "bg-burnt-sienna-500 text-white rounded-r-lg relative z-10 -ml-px",
          selected: "bg-burnt-sienna-500 text-white",
          today: "font-bold text-burnt-sienna-600",
          disabled: "text-gray-400 cursor-not-allowed opacity-50",
          outside: "text-gray-400",
          hidden: "invisible",
          nav: "flex items-center justify-between mb-4",
          button_previous: cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-8 w-8"
          ),
          button_next: cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-8 w-8"
          ),
          month_caption: "label-lg text-onyx text-center flex-1",
        }}
        components={{
          Chevron: ({ orientation }) => 
            orientation === "left" ? 
              <ChevronLeft className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
        }}
      />

      {/* Info Panel */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="label-base text-onyx mb-2">Booking Rules</h3>
        <div className="space-y-1">
          <p className="body-small text-onyx-60">
            • Weekly stays: Saturday check-in only, 7-day blocks
          </p>
          <p className="body-small text-onyx-60">
            • Short stays: Any day check-in, minimum {MIN_SHORT_STAY} nights
          </p>
          <p className="body-small text-onyx-60">
            • Gray dates are unavailable (booked or maintenance)
          </p>
          <p className="body-small text-onyx-60">
            • Sienna highlighting shows your selected period
          </p>
        </div>
      </div>
    </div>
  )
}
