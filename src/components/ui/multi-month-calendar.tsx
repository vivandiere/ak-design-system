'use client'

import React from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MultiMonthCalendarProps {
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  numberOfMonths?: number
  disabled?: Date[] | ((date: Date) => boolean)
  className?: string
  startMonth?: Date
  showOutsideDays?: boolean
}

export const MultiMonthCalendar: React.FC<MultiMonthCalendarProps> = ({
  selected,
  onSelect,
  numberOfMonths = 2,
  disabled,
  className,
  startMonth = new Date(),
  showOutsideDays = true,
  ...props
}) => {
  const [month, setMonth] = React.useState<Date>(startMonth)

  return (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={onSelect}
      month={month}
      onMonthChange={setMonth}
      numberOfMonths={numberOfMonths}
      disabled={disabled}
      showOutsideDays={showOutsideDays}
      className={cn("rounded-lg border", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0 p-3",
        month: "space-y-3",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 w-7"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-burnt-sienna-100/50 [&:has([aria-selected])]:bg-burnt-sienna-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-burnt-sienna-50 hover:text-burnt-sienna-900 h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-burnt-sienna-500 text-white hover:bg-burnt-sienna-600 hover:text-white focus:bg-burnt-sienna-500 focus:text-white",
        day_today: "bg-burnt-sienna-50 text-burnt-sienna-900 font-semibold",
        day_outside: "day-outside text-gray-400 opacity-50 aria-selected:bg-burnt-sienna-100 aria-selected:text-burnt-sienna-900 aria-selected:opacity-30",
        day_disabled: "text-gray-400 opacity-50",
        day_range_middle: "aria-selected:bg-burnt-sienna-100 aria-selected:text-burnt-sienna-900",
        day_hidden: "invisible",
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" {...props} />
        },
      }}
      {...props}
    />
  )
}

// Export with displayName for better debugging
MultiMonthCalendar.displayName = "MultiMonthCalendar"
