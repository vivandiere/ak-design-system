'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangeSelectorProps {
  onDateRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
}

const DateRangeSelector = ({ onDateRangeChange, placeholder = "Add Dates" }: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const generateCalendarDays = (date: Date) => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // First selection or reset selection
      setStartDate(date);
      setEndDate(null);
    } else {
      // Second selection
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isStartDate = (date: Date) => {
    return startDate && date.getTime() === startDate.getTime();
  };

  const isEndDate = (date: Date) => {
    return endDate && date.getTime() === endDate.getTime();
  };

  const isHovered = (date: Date) => {
    if (!startDate || endDate || !hoverDate) return false;
    return date >= startDate && date <= hoverDate;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateRange = () => {
    if (!startDate) return placeholder;
    if (!endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange?.(null, null);
  };

  const applySelection = () => {
    onDateRangeChange?.(startDate, endDate);
    setIsOpen(false);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const calendarDays = generateCalendarDays(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="relative">
      {/* Input Field */}
      <div 
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={formatDateRange()}
          readOnly
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-onyx-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-burnt-sienna-500 focus:border-transparent body-base text-onyx placeholder-onyx-40 cursor-pointer"
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-onyx-40" />
      </div>

      {/* Date Picker Popup */}
      {isOpen && (
        <div 
          ref={popupRef}
          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-onyx-20 z-50"
          style={{
            maxWidth: 'calc(100vw - 2rem)',
            left: '0',
            right: '0'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-onyx-20">
            <h3 className="label-base text-onyx">Select Dates</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-linen-50 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-onyx-60" />
            </button>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between p-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-linen-50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-onyx-60" />
            </button>
            <h4 className="label-base text-onyx">{monthName}</h4>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-linen-50 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-onyx-60" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="px-4 pb-4">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="w-8 h-8 flex items-center justify-center">
                  <span className="body-small text-onyx-60 font-medium">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => (
                <div key={index} className="w-8 h-8">
                  {date ? (
                    <button
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoverDate(date)}
                      onMouseLeave={() => setHoverDate(null)}
                      className={`w-full h-full rounded-full text-sm transition-colors ${
                        isStartDate(date)
                          ? 'bg-burnt-sienna-500 text-white'
                          : isEndDate(date)
                          ? 'bg-burnt-sienna-500 text-white'
                          : isInRange(date)
                          ? 'bg-burnt-sienna-100 text-onyx'
                          : isHovered(date)
                          ? 'bg-burnt-sienna-50 text-onyx'
                          : 'hover:bg-linen-50 text-onyx'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  ) : (
                    <div className="w-8 h-8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4 border-t border-onyx-20">
            <button
              onClick={clearSelection}
              className="body-small text-onyx-60 hover:text-onyx transition-colors"
            >
              Clear
            </button>
            <button
              onClick={applySelection}
              disabled={!startDate || !endDate}
              className={`px-4 py-2 rounded-lg transition-colors ${
                startDate && endDate
                  ? 'bg-burnt-sienna-500 text-white hover:bg-burnt-sienna-600'
                  : 'bg-onyx-20 text-onyx-40 cursor-not-allowed'
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
