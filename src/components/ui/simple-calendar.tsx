'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRange {
  from?: Date;
  to?: Date;
}

interface SimpleCalendarProps {
  mode?: 'single' | 'range';
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange | undefined) => void;
  disabled?: Date[];
  numberOfMonths?: number;
  className?: string;
}

export function SimpleCalendar({
  mode = 'single',
  selected,
  onSelect,
  disabled = [],
  numberOfMonths = 1,
  className
}: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const isDateDisabled = (date: Date) => {
    return disabled.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    if (mode === 'single') {
      return selected instanceof Date && selected.toDateString() === date.toDateString();
    } else {
      const range = selected as DateRange;
      if (!range?.from) return false;
      if (!range.to) return range.from.toDateString() === date.toDateString();
      return date >= range.from && date <= range.to;
    }
  };

  const isDateRangeStart = (date: Date) => {
    if (mode !== 'range') return false;
    const range = selected as DateRange;
    return range?.from?.toDateString() === date.toDateString();
  };

  const isDateRangeEnd = (date: Date) => {
    if (mode !== 'range') return false;
    const range = selected as DateRange;
    return range?.to?.toDateString() === date.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (mode === 'single') {
      onSelect?.(date);
    } else {
      const range = selected as DateRange;
      if (!range?.from || (range.from && range.to)) {
        onSelect?.({ from: date, to: undefined });
      } else {
        if (date < range.from) {
          onSelect?.({ from: date, to: range.from });
        } else {
          onSelect?.({ from: range.from, to: date });
        }
      }
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + i, 1);
    months.push(monthDate);
  }

  return (
    <div className={cn("bg-white border rounded-lg p-4", className)}>
      <div className={cn(
        "flex gap-8",
        numberOfMonths === 1 ? "max-w-sm mx-auto" : "max-w-2xl mx-auto"
      )}>
        {months.map((monthDate, monthIndex) => {
          const days = getDaysInMonth(monthDate);
          const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

          return (
            <div key={monthIndex} className="flex-1">
              {/* Month Header */}
              <div className="flex items-center justify-between mb-4">
                {monthIndex === 0 && (
                  <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {monthIndex === 0 && numberOfMonths > 1 && <div className="w-10"></div>}
                
                <div className="label-lg text-onyx text-center flex-1">{monthName}</div>
                
                {monthIndex === numberOfMonths - 1 && (
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
                {monthIndex === numberOfMonths - 1 && numberOfMonths > 1 && <div className="w-10"></div>}
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="w-8 h-8 flex items-center justify-center">
                    <span className="body-small text-onyx-60 font-medium">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-10"></div>;
                  }

                  const isSelected = isDateSelected(date);
                  const isDisabled = isDateDisabled(date);
                  const isStart = isDateRangeStart(date);
                  const isEnd = isDateRangeEnd(date);
                  const isMiddle = isSelected && !isStart && !isEnd;

                  let cellClass = 'h-10 flex items-center justify-center text-sm transition-colors relative ';
                  
                  if (isDisabled) {
                    cellClass += 'text-gray-400 cursor-not-allowed bg-gray-100 opacity-60 rounded';
                  } else if (isSelected) {
                    if (mode === 'single' || (isStart && isEnd)) {
                      cellClass += 'bg-burnt-sienna-500 text-white rounded cursor-pointer';
                    } else if (isStart) {
                      cellClass += 'bg-burnt-sienna-500 text-white rounded-l -mr-px z-10 cursor-pointer';
                    } else if (isEnd) {
                      cellClass += 'bg-burnt-sienna-500 text-white rounded-r -ml-px z-10 cursor-pointer';
                    } else if (isMiddle) {
                      cellClass += 'bg-burnt-sienna-100 text-burnt-sienna-900 -mx-px z-10 cursor-pointer';
                    }
                  } else {
                    cellClass += 'hover:bg-burnt-sienna-50 rounded cursor-pointer border border-transparent hover:border-burnt-sienna-200';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      disabled={isDisabled}
                      className={cellClass}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
