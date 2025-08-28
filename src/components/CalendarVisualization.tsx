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
    const newEndDate = updateShortStayDuration(selectedStay.start, newNights);
    
    setSelectedStay(prev => ({
      ...prev,
      nights: newNights,
      end: newEndDate
    }));
  };

  const handleDayClick = (day: Day) => {
    if (!day.date || !day.fullDate) return;
    
    if (bookingMode === 'weekly') {
      if (!day.checkin) return;
      const newEndDate = updateStayDuration(day.fullDate, 1);
      setSelectedStay({
        start: day.fullDate,
        end: newEndDate,
        weeks: 1,
        nights: 7
      });
    } else {
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
            name: days[dayIndex]
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
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.days.map((day, dayIndex) => (
                <div 
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => day.date && handleDayClick(day)}
                  className={`
                    p-4 rounded-lg text-center border
                    ${!day.date ? 'bg-gray-50 opacity-50' : ''}
                    ${(bookingMode === 'weekly' && day.checkin) || bookingMode === 'short' ? 'hover:bg-green-200 cursor-pointer' : ''}
                    ${isDateInStayPeriod(day.date) ? 'bg-yellow-100 border-yellow-500' : ''}
                    ${day.fullDate && selectedStay.start && day.fullDate.getTime() === selectedStay.start.getTime() ? 'bg-green-100 border-green-500' : ''}
                    ${day.fullDate && selectedStay.end && day.fullDate.getTime() === selectedStay.end.getTime() ? 'bg-blue-100 border-blue-500' : ''}
                    ${day.date && !isDateInStayPeriod(day.date) && (!day.fullDate || 
                      (day.fullDate.getTime() !== selectedStay?.start?.getTime() && 
                       day.fullDate.getTime() !== selectedStay?.end?.getTime())) 
                      ? 'bg-gray-50' : ''}
                  `}
                >
                  {day.date && (
                    <>
                      <div className="mb-1 body-base">{day.date}</div>
                      {day.fullDate && selectedStay.start && day.fullDate.getTime() === selectedStay.start.getTime() && 
                        <div className="text-green-700 text-sm label-sm">Check-in</div>}
                      {day.fullDate && selectedStay.end && day.fullDate.getTime() === selectedStay.end.getTime() && 
                        <div className="text-blue-700 text-sm label-sm">Check-out</div>}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
              <span className="label-sm">Check-in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded"></div>
              <span className="label-sm">Stay Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-500 rounded"></div>
              <span className="label-sm">Check-out</span>
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
