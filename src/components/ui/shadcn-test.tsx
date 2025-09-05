'use client'

import React, { useState } from 'react'
import { type DateRange } from 'react-day-picker'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Test component using shadcn studio patterns with our design system
const ShadcnStudioTest = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 22),
    to: new Date(2025, 5, 17)
  })

  return (
    <div className="space-y-6 p-6">
      <h2 className="ds-heading">Shadcn Studio Integration Test</h2>
      
      {/* Test buttonVariants function */}
      <div className="space-y-4">
        <h3 className="label-lg text-onyx">Button Variants Test</h3>
        <div className="flex gap-4 flex-wrap">
          <button className={cn(buttonVariants({ variant: "default", size: "default" }))}>
            Default
          </button>
          <button className={cn(buttonVariants({ variant: "outline", size: "default" }))}>
            Outline
          </button>
          <button className={cn(buttonVariants({ variant: "ghost", size: "default" }))}>
            Ghost
          </button>
          <button className={cn(buttonVariants({ variant: "link", size: "default" }))}>
            Link
          </button>
        </div>
      </div>

      {/* Test date range state */}
      <div className="space-y-4">
        <h3 className="label-lg text-onyx">Date Range State Test</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="body-small text-onyx-60">
            Selected Range: {dateRange?.from?.toDateString()} - {dateRange?.to?.toDateString()}
          </p>
        </div>
      </div>

      {/* Test A&K design system classes */}
      <div className="space-y-4">
        <h3 className="label-lg text-onyx">A&K Design System Test</h3>
        <div className="space-y-2">
          <p className="ds-display">Display Text</p>
          <p className="ds-heading">Heading Text</p>
          <p className="ds-subheading">Subheading Text</p>
          <p className="label-lg text-onyx">Label Large</p>
          <p className="body-small text-onyx-60">Body Small</p>
        </div>
      </div>

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="body-small text-green-600 font-medium">
          ✅ Shadcn Studio + A&K Design System Integration Working!
        </p>
      </div>
    </div>
  )
}

export default ShadcnStudioTest
