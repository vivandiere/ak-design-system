'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Popup } from '@/components/ui/popup';

interface Day {
  date: number | null;
  fullDate: Date | null;
  checkin: boolean;
  checkout: boolean;
  name?: string;
  isUnavailable?: boolean;
}

interface Week {
  days: Day[];
}

interface SelectedStay {
  start: Date | null;
  end: Date | null;
  weeks: number;
  nights: number;
}

interface ViewDate {
  month: number;
  year: number;
}

interface DatePickerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (startDate: Date, endDate: Date) => void;
  minStayNights?: number;
}

const DatePickerPopup: React.FC<DatePickerPopupProps> = ({
  isOpen,
  onClose,
  anchorRef,
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  minStayNights = 3
}) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const [bookingMode, setBookingMode] = useState<'weekly' | 'short'>('weekly');
  const [viewDate, setViewDate] = useState<ViewDate>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const [selectedStay, setSelectedStay] = useState<SelectedStay>({ 
    start: selectedStartDate, 
    end: selectedEndDate,
    weeks: 1,
    nights: minStayNights
  });

  const MIN_SHORT_STAY = minStayNights;

  // Mock booking data - in a real app this would come from an API
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
    
    // Add all booked dates (weekly and short stay bookings)
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

  // Update selectedStay when props change
  useEffect(() => {
    setSelectedStay(prev => ({
      ...prev,
      start: selectedStartDate,
      end: selectedEndDate
    }));
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (selectedStay.end) {
      const endMonth = selectedStay.end.getMonth();
      const endYear = selectedStay.end.getFullYear();
      
      if (endMonth !== viewDate.month || endYear !== viewDate.year) {
        setViewDate({
          month: endMonth,
          year: endYear
        });
      }
    }
  }, [selectedStay.end]);

  const handlePrevMonth = () => {
    setViewDate(prev => ({
      year: prev.month === 0 ? prev.year - 1 : prev.year,
      month: prev.month === 0 ? 11 : prev.month - 1
    }));
  };

  const handleNextMonth = () => {
    setViewDate(prev => ({
      year: prev.month === 11 ? prev.year + 1 : prev.year,
      month: prev.month === 11 ? 0 : prev.month + 1
    }));
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const updateStayDuration = (startDate: Date, weeks: number) => {
    if (!startDate) return null;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (weeks * 7) - 1);
    return endDate;
  };

  const updateShortStayDuration = (startDate: Date, nights: number) => {
    if (!startDate) return null;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nights - 1);
    return endDate;
  };

  const handleChangeWeeks = (increment: number) => {
    if (!selectedStay.start) return;
    
    const newWeeks = Math.max(1, selectedStay.weeks + increment);
    
    // Check if the new period is available
    if (!isWeeklyPeriodAvailable(selectedStay.start, newWeeks)) {
      alert('This extended period overlaps with existing bookings or unavailable dates.');
      return;
    }
    
    const newEndDate = updateStayDuration(selectedStay.start, newWeeks);
    
    setSelectedStay(prev => ({
      ...prev,
      weeks: newWeeks,
      end: newEndDate
    }));
  };

  const handleChangeNights = (increment: number) => {
    if (!selectedStay.start) return;
    
    const newNights = Math.max(MIN_SHORT_STAY, selectedStay.nights + increment);
    
    // Check if the new period is available
    if (!isShortStayPeriodAvailable(selectedStay.start, newNights)) {
      alert('This extended period overlaps with existing bookings or unavailable dates.');
      return;
    }
    
    const newEndDate = updateShortStayDuration(selectedStay.start, newNights);
    
    setSelectedStay(prev => ({
      ...prev,
      nights: newNights,
      end: newEndDate
    }));
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

  const handleDayClick = (day: Day) => {
    if (!day.date || !day.fullDate) return;
    
    // Prevent clicking on unavailable dates
    if (day.isUnavailable) return;
    
    if (bookingMode === 'weekly') {
      if (!day.checkin) return;
      
      // Check if the full week is available before allowing selection
      if (!isWeeklyPeriodAvailable(day.fullDate, 1)) {
        alert('This week overlaps with existing bookings or unavailable dates.');
        return;
      }
      
      const newEndDate = updateStayDuration(day.fullDate, 1);
      setSelectedStay({
        start: day.fullDate,
        end: newEndDate,
        weeks: 1,
        nights: 7
      });
    } else {
      // Check if the short stay period is available
      if (!isShortStayPeriodAvailable(day.fullDate, MIN_SHORT_STAY)) {
        alert('This stay period overlaps with existing bookings or unavailable dates.');
        return;
      }
      
      const newEndDate = updateShortStayDuration(day.fullDate, MIN_SHORT_STAY);
      setSelectedStay({
        start: day.fullDate,
        end: newEndDate,
        weeks: 1,
        nights: MIN_SHORT_STAY
      });
    }
  };

  const createMonthCalendar = (month: number, year: number): Week[] => {
    const weeks: Week[] = [];
    let currentDate = 1;
    const totalDays = getDaysInMonth(month, year);
    const firstDayOffset = getFirstDayOfMonth(month, year);
    
    for (let week = 0; week < 6; week++) {
      const weekDays: Day[] = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        if ((week === 0 && dayIndex < firstDayOffset) || currentDate > totalDays) {
          weekDays.push({
            date: null,
            fullDate: null,
            checkin: false,
            checkout: false
          });
        } else {
          const fullDate = new Date(year, month, currentDate);
          weekDays.push({
            date: currentDate,
            fullDate,
            checkin: dayIndex === 6, // Saturday
            checkout: dayIndex === 5, // Friday
            name: days[dayIndex],
            isUnavailable: isDateUnavailable(fullDate)
          });
          currentDate++;
        }
      }
      if (currentDate > totalDays && week > 3) break;
      weeks.push({ days: weekDays });
    }
    return weeks;
  };

  const isDateInStayPeriod = (date: number | null) => {
    if (!date || !selectedStay.start || !selectedStay.end) return false;
    const checkDate = new Date(viewDate.year, viewDate.month, date);
    return checkDate >= selectedStay.start && checkDate <= selectedStay.end;
  };

  const getStayPeriodPosition = (day: Day, weekIndex: number, dayIndex: number, weeks: Week[]) => {
    if (!day.date || !isDateInStayPeriod(day.date)) return null;
    
    const isStart = day.fullDate && selectedStay.start && day.fullDate.getTime() === selectedStay.start.getTime();
    const isEnd = day.fullDate && selectedStay.end && day.fullDate.getTime() === selectedStay.end.getTime();
    const isMiddle = !isStart && !isEnd;
    
    // Check if this is the first/last day of a week
    const isStartOfWeek = dayIndex === 0;
    const isEndOfWeek = dayIndex === 6;
    
    // Check if the previous/next day is also in the stay period (within the same week)
    const prevDayInPeriod = dayIndex > 0 && weeks[weekIndex] && weeks[weekIndex].days[dayIndex - 1].date && isDateInStayPeriod(weeks[weekIndex].days[dayIndex - 1].date);
    const nextDayInPeriod = dayIndex < 6 && weeks[weekIndex] && weeks[weekIndex].days[dayIndex + 1].date && isDateInStayPeriod(weeks[weekIndex].days[dayIndex + 1].date);
    
    return {
      isStart,
      isEnd,
      isMiddle,
      isStartOfWeek,
      isEndOfWeek,
      prevDayInPeriod,
      nextDayInPeriod
    };
  };

  const getStayPeriodText = () => {
    if (!selectedStay.start || !selectedStay.end) return '';
    
    const startMonth = months[selectedStay.start.getMonth()];
    const endMonth = months[selectedStay.end.getMonth()];
    const startDate = selectedStay.start.getDate();
    const endDate = selectedStay.end.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDate}-${endDate}`;
    }
    return `${startMonth} ${startDate} - ${endMonth} ${endDate}`;
  };

  const getNightlyPrice = () => 1400;
  const getWeeklyPrice = () => 8400;
  
  const getTotalPrice = () => {
    if (bookingMode === 'weekly') {
      return getWeeklyPrice() * selectedStay.weeks;
    } else {
      return getNightlyPrice() * selectedStay.nights;
    }
  };

  const handleConfirmSelection = () => {
    if (selectedStay.start && selectedStay.end) {
      onDateSelect(selectedStay.start, selectedStay.end);
    }
  };

  const weeks = createMonthCalendar(viewDate.month, viewDate.year);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      anchorRef={anchorRef}
      className="w-96 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-linen-50 rounded-full transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-onyx-60" />
        </button>
        
        <div className="text-center">
          <div className="label-base text-onyx">
            {months[viewDate.month]} {viewDate.year}
          </div>
        </div>
        
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-linen-50 rounded-full transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-onyx-60" />
        </button>
      </div>

      {/* Booking Mode Toggle */}
      <div className="flex justify-center mb-3">
        <div className="flex bg-linen-100 rounded-lg p-1">
          <button
            onClick={() => setBookingMode('weekly')}
            className={`px-3 py-1.5 rounded-md body-small transition-colors font-medium
              ${bookingMode === 'weekly' 
                ? 'bg-white text-burnt-sienna-600 shadow-sm' 
                : 'text-onyx-60 hover:text-onyx'}`}
          >
            Weekly Stays
          </button>
          <button
            onClick={() => setBookingMode('short')}
            className={`px-3 py-1.5 rounded-md body-small transition-colors font-medium
              ${bookingMode === 'short' 
                ? 'bg-white text-burnt-sienna-600 shadow-sm' 
                : 'text-onyx-60 hover:text-onyx'}`}
          >
            Short Stays
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="body-small text-onyx-80 text-center mb-3 font-medium">
        {bookingMode === 'weekly' 
          ? 'CLICK ANY SATURDAY TO START A STAY, THEN USE + / - TO ADJUST LENGTH'
          : `Select any date to start a ${MIN_SHORT_STAY}-night minimum stay`}
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div
            key={index}
            className="w-8 h-8 flex items-center justify-center"
          >
            <span className="body-small text-onyx-60 font-medium">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => {
            const stayPosition = getStayPeriodPosition(day, weekIndex, dayIndex, weeks);
            
            let borderRadiusClass = 'rounded-full';
            if (stayPosition) {
              const { isStart, isEnd, isStartOfWeek, isEndOfWeek } = stayPosition;
              
              if (isStart && isEnd) {
                // Single day stay
                borderRadiusClass = 'rounded-full';
              } else if (isStart) {
                // Start of stay - rounded left, square right unless end of week
                borderRadiusClass = isEndOfWeek ? 'rounded-full' : 'rounded-l-full';
              } else if (isEnd) {
                // End of stay - square left unless start of week, rounded right
                borderRadiusClass = isStartOfWeek ? 'rounded-full' : 'rounded-r-full';
              } else {
                // Middle of stay - square unless at week boundaries
                if (isStartOfWeek && isEndOfWeek) {
                  borderRadiusClass = 'rounded-full';
                } else if (isStartOfWeek) {
                  borderRadiusClass = 'rounded-l-full';
                } else if (isEndOfWeek) {
                  borderRadiusClass = 'rounded-r-full';
                } else {
                  borderRadiusClass = 'rounded-none';
                }
              }
            }
            
            return (
              <div key={`${weekIndex}-${dayIndex}`} className={`w-8 h-8 relative ${
                stayPosition && stayPosition.isMiddle && !stayPosition.isStartOfWeek && !stayPosition.isEndOfWeek ? '-mx-1.5' : ''
              } ${
                stayPosition && stayPosition.isStart && !stayPosition.isEnd && !stayPosition.isEndOfWeek ? '-mr-1.5' : ''
              } ${
                stayPosition && stayPosition.isEnd && !stayPosition.isStart && !stayPosition.isStartOfWeek ? '-ml-1.5' : ''
              }`}>
                {day.date ? (
                  <button
                    onClick={() => handleDayClick(day)}
                    disabled={day.isUnavailable || !((bookingMode === 'weekly' && day.checkin) || bookingMode === 'short')}
                    className={`w-full h-full text-sm transition-colors relative ${borderRadiusClass} ${
                      day.isUnavailable
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                        : day.fullDate && selectedStay.start && day.fullDate.getTime() === selectedStay.start.getTime()
                        ? 'bg-burnt-sienna-500 text-white z-20'
                        : day.fullDate && selectedStay.end && day.fullDate.getTime() === selectedStay.end.getTime()
                        ? 'bg-burnt-sienna-500 text-white z-20'
                        : isDateInStayPeriod(day.date)
                        ? 'bg-burnt-sienna-100 text-onyx z-10'
                        : (bookingMode === 'weekly' && day.checkin) || bookingMode === 'short'
                        ? 'hover:bg-burnt-sienna-50 text-onyx cursor-pointer'
                        : 'text-onyx-40 cursor-not-allowed'
                    }`}
                  >
                    {day.date}
                  </button>
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-2 justify-center mb-4 flex-wrap text-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-burnt-sienna-500 rounded-full"></div>
          <span className="body-small text-onyx-60">Check-in/out</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-burnt-sienna-100 rounded-full"></div>
          <span className="body-small text-onyx-60">Stay Period</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-full opacity-60"></div>
          <span className="body-small text-onyx-60">Unavailable</span>
        </div>
      </div>

      {/* Duration Controls and Pricing */}
      {selectedStay.start && (
        <div className="border-t pt-3 space-y-3">
          {/* Duration Controls */}
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => bookingMode === 'weekly' ? handleChangeWeeks(-1) : handleChangeNights(-1)}
              disabled={bookingMode === 'weekly' ? selectedStay.weeks <= 1 : selectedStay.nights <= MIN_SHORT_STAY}
              className="p-1 hover:bg-linen-50 rounded disabled:opacity-50"
            >
              <Minus className="w-3 h-3 text-onyx-60" />
            </button>
            <span className="body-base font-medium text-onyx">
              {bookingMode === 'weekly' 
                ? `${selectedStay.weeks} week${selectedStay.weeks > 1 ? 's' : ''}`
                : `${selectedStay.nights} night${selectedStay.nights > 1 ? 's' : ''}`}
            </span>
            <button 
              onClick={() => bookingMode === 'weekly' ? handleChangeWeeks(1) : handleChangeNights(1)}
              className="p-1 hover:bg-linen-50 rounded"
            >
              <Plus className="w-3 h-3 text-onyx-60" />
            </button>
          </div>
          
          {/* Date Range */}
          <div className="body-small text-onyx-60 text-center">
            {getStayPeriodText()}
          </div>

          {/* Pricing */}
          <div className="text-center">
            <div className="body-lg font-medium text-onyx">
              ${getTotalPrice().toLocaleString()}
            </div>
            <div className="body-small text-onyx-60">
              ${bookingMode === 'weekly' 
                ? `${getWeeklyPrice().toLocaleString()} per week`
                : `${getNightlyPrice().toLocaleString()} per night`}
            </div>
          </div>

          {/* Confirm Button */}
          <button 
            onClick={handleConfirmSelection}
            className="w-full bg-burnt-sienna-500 hover:bg-burnt-sienna-600 text-white py-2 px-4 rounded body-small font-medium transition-colors"
          >
            Confirm Dates
          </button>
        </div>
      )}
    </Popup>
  );
};

export default DatePickerPopup;
