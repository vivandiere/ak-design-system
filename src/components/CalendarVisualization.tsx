'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus, Minus, Star } from 'lucide-react';

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

const CalendarVisualization = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const [bookingMode, setBookingMode] = React.useState<'weekly' | 'short'>('weekly');
  const [viewDate, setViewDate] = React.useState<ViewDate>({
    month: 3,
    year: 2025
  });
  const [selectedStay, setSelectedStay] = React.useState<SelectedStay>({ 
    start: null, 
    end: null,
    weeks: 1,
    nights: 3
  });

  const MIN_SHORT_STAY = 3;

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

  React.useEffect(() => {
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
            checkin: dayIndex === 6,
            checkout: dayIndex === 5,
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
    
    // Check if this is the first day of a week (Saturday, dayIndex 6 in our layout)
    const isStartOfWeek = dayIndex === 0;
    const isEndOfWeek = dayIndex === 6;
    
    // Check if the previous/next day is also in the stay period
    const prevDayInPeriod = dayIndex > 0 && weeks[weekIndex].days[dayIndex - 1].date && isDateInStayPeriod(weeks[weekIndex].days[dayIndex - 1].date);
    const nextDayInPeriod = dayIndex < 6 && weeks[weekIndex].days[dayIndex + 1].date && isDateInStayPeriod(weeks[weekIndex].days[dayIndex + 1].date);
    
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

  const weeks = createMonthCalendar(viewDate.month, viewDate.year);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <button 
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <CardTitle className="text-3xl">
            {months[viewDate.month]} {viewDate.year}
          </CardTitle>
          <button 
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBookingMode('weekly')}
              className={`px-4 py-2 rounded-md text-sm transition-colors
                ${bookingMode === 'weekly' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              Weekly Stays
            </button>
            <button
              onClick={() => setBookingMode('short')}
              className={`px-4 py-2 rounded-md text-sm transition-colors
                ${bookingMode === 'short' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              Short Stays
            </button>
          </div>

          <div className="label-lg text-black uppercase text-center">
            {bookingMode === 'weekly' 
              ? 'Click any Saturday to start a stay, then use + / - to adjust length'
              : `Select any date to start a ${MIN_SHORT_STAY}-night minimum stay`}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
              <div key={day} className="text-center p-2 label-base">
                {day}
              </div>
            ))}
          </div>
          
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-0">
              {week.days.map((day, dayIndex) => {
                const stayPosition = getStayPeriodPosition(day, weekIndex, dayIndex, weeks);
                const isInStayPeriod = isDateInStayPeriod(day.date);
                const isStartDate = day.fullDate && selectedStay.start && day.fullDate.getTime() === selectedStay.start.getTime();
                const isEndDate = day.fullDate && selectedStay.end && day.fullDate.getTime() === selectedStay.end.getTime();
                
                let borderRadiusClass = '';
                let marginClass = '';
                
                if (stayPosition) {
                  const { isStart, isEnd, isStartOfWeek, isEndOfWeek } = stayPosition;
                  
                  // Handle border radius for connected ranges
                  if (isStart && isEnd) {
                    borderRadiusClass = 'rounded-lg';
                  } else if (isStart) {
                    borderRadiusClass = isEndOfWeek ? 'rounded-lg' : 'rounded-l-lg rounded-r-none';
                    if (!isEndOfWeek) marginClass = '-mr-px relative z-10';
                  } else if (isEnd) {
                    borderRadiusClass = isStartOfWeek ? 'rounded-lg' : 'rounded-r-lg rounded-l-none';
                    if (!isStartOfWeek) marginClass = '-ml-px relative z-10';
                  } else {
                    // Middle of range
                    if (isStartOfWeek && isEndOfWeek) {
                      borderRadiusClass = 'rounded-lg';
                    } else if (isStartOfWeek) {
                      borderRadiusClass = 'rounded-l-lg rounded-r-none';
                      marginClass = '-mr-px relative z-10';
                    } else if (isEndOfWeek) {
                      borderRadiusClass = 'rounded-r-lg rounded-l-none';
                      marginClass = '-ml-px relative z-10';
                    } else {
                      borderRadiusClass = 'rounded-none';
                      marginClass = '-mx-px relative z-10';
                    }
                  }
                } else {
                  borderRadiusClass = 'rounded-lg';
                }
                
                return (
                  <div 
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => day.date && handleDayClick(day)}
                    className={`
                      h-20 p-4 text-center transition-colors cursor-pointer ${borderRadiusClass} ${marginClass}
                      ${!day.date ? 'bg-gray-50 opacity-50' : ''}
                      ${day.isUnavailable ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
                      ${!day.isUnavailable && ((bookingMode === 'weekly' && day.checkin) || bookingMode === 'short') ? 'hover:bg-burnt-sienna-50' : ''}
                      ${isInStayPeriod ? 'bg-burnt-sienna-100' : ''}
                      ${isStartDate ? 'bg-burnt-sienna-500 text-white' : ''}
                      ${isEndDate ? 'bg-burnt-sienna-500 text-white' : ''}
                      ${day.date && !day.isUnavailable && !isInStayPeriod && !isStartDate && !isEndDate 
                        ? 'bg-gray-50 border border-gray-200' : ''}
                    `}
                  >
                    {day.date && (
                      <>
                        <div className={`mb-1 body-base ${day.isUnavailable ? 'text-gray-400' : ''}`}>{day.date}</div>
                        {day.isUnavailable && <div className="text-gray-500 text-xs label-sm">Unavailable</div>}
                        {!day.isUnavailable && isStartDate && 
                          <div className="text-white text-sm label-sm">Check-in</div>}
                        {!day.isUnavailable && isEndDate && 
                          <div className="text-white text-sm label-sm">Check-out</div>}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex gap-3 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-burnt-sienna-500 rounded"></div>
              <span className="label-sm">Check-in/Check-out</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-burnt-sienna-100 border border-burnt-sienna-300 rounded"></div>
              <span className="label-sm">Stay Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded opacity-60"></div>
              <span className="label-sm">Unavailable</span>
            </div>
          </div>

          {selectedStay.start && (
            <div className="flex justify-between items-center border-t pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => bookingMode === 'weekly' ? handleChangeWeeks(-1) : handleChangeNights(-1)}
                    disabled={bookingMode === 'weekly' ? selectedStay.weeks <= 1 : selectedStay.nights <= MIN_SHORT_STAY}
                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="label-lg">
                    {bookingMode === 'weekly' 
                      ? `${selectedStay.weeks} week${selectedStay.weeks > 1 ? 's' : ''}`
                      : `${selectedStay.nights} night${selectedStay.nights > 1 ? 's' : ''}`}
                  </span>
                  <button 
                    onClick={() => bookingMode === 'weekly' ? handleChangeWeeks(1) : handleChangeNights(1)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="label-base text-gray-600">
                  {getStayPeriodText()}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg text-gray-900 body-lg">
                    ${getTotalPrice().toLocaleString()}
                  </div>
                  <div className="label-base text-gray-500">
                    ${bookingMode === 'weekly' 
                      ? `${getWeeklyPrice().toLocaleString()} per week`
                      : `${getNightlyPrice().toLocaleString()} per night`}
                  </div>
                </div>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors label-lg"
                  onClick={() => alert('Enquiry form would open here')}
                >
                  Enquire
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarVisualization;
