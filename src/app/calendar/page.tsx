'use client';

import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import DesignSystemLayout from '@/components/DesignSystemLayout';
import { MultiMonthCalendar } from '@/components/ui/multi-month-calendar';

export default function CalendarSystemPage() {
  const [singleMonthRange, setSingleMonthRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 15),
    to: new Date(2025, 4, 22)
  });

  const [doubleMonthRange, setDoubleMonthRange] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 22),
    to: new Date(2025, 4, 5)
  });

  const [tripleMonthRange, setTripleMonthRange] = useState<DateRange | undefined>();

  // Mock disabled dates for demonstration
  const disabledDates = [
    new Date(2025, 4, 10),
    new Date(2025, 4, 11),
    new Date(2025, 4, 25),
    new Date(2025, 5, 5),
    new Date(2025, 5, 6),
  ];

  return (
    <DesignSystemLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="ds-display mb-4">Calendar System</h1>
        <p className="ds-subheading text-onyx-60 mb-12">
          Multi-month calendar components with range selection, built on react-day-picker with A&K design system integration.
        </p>

        {/* Single Month Calendar */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="ds-heading mb-2">Single Month Calendar</h2>
            <p className="body-small text-onyx-60 mb-6">
              Perfect for simple date picking or when space is limited.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <MultiMonthCalendar
                  numberOfMonths={1}
                  selected={singleMonthRange}
                  onSelect={setSingleMonthRange}
                  startMonth={new Date(2025, 4)}
                />
              </div>
              
              <div className="lg:w-80">
                <h3 className="label-lg text-onyx mb-4">Selection Status</h3>
                <div className="space-y-3">
                  {singleMonthRange?.from && (
                    <div className="p-3 bg-burnt-sienna-50 border border-burnt-sienna-200 rounded-lg">
                      <p className="body-small text-burnt-sienna-800 font-medium">From</p>
                      <p className="body-small text-burnt-sienna-600">
                        {singleMonthRange.from.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {singleMonthRange?.to && (
                    <div className="p-3 bg-burnt-sienna-50 border border-burnt-sienna-200 rounded-lg">
                      <p className="body-small text-burnt-sienna-800 font-medium">To</p>
                      <p className="body-small text-burnt-sienna-600">
                        {singleMonthRange.to.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {singleMonthRange?.from && singleMonthRange?.to && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="body-small text-green-800 font-medium">Duration</p>
                      <p className="body-small text-green-600">
                        {Math.ceil((singleMonthRange.to.getTime() - singleMonthRange.from.getTime()) / (1000 * 60 * 60 * 24))} nights
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Double Month Calendar */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="ds-heading mb-2">Two-Month Calendar</h2>
            <p className="body-small text-onyx-60 mb-6">
              Ideal for booking systems where users need to see multiple months for better planning.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="mb-6">
              <MultiMonthCalendar
                numberOfMonths={2}
                selected={doubleMonthRange}
                onSelect={setDoubleMonthRange}
                startMonth={new Date(2025, 3)}
              />
            </div>
            
            {doubleMonthRange?.from && doubleMonthRange?.to && (
              <div className="bg-burnt-sienna-50 border border-burnt-sienna-200 rounded-lg p-4">
                <p className="body-small text-burnt-sienna-800 font-medium">
                  Selected Range: {doubleMonthRange.from.toLocaleDateString()} - {doubleMonthRange.to.toLocaleDateString()}
                </p>
                <p className="body-small text-burnt-sienna-600">
                  {Math.ceil((doubleMonthRange.to.getTime() - doubleMonthRange.from.getTime()) / (1000 * 60 * 60 * 24))} nights selected
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Three Month Calendar */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="ds-heading mb-2">Three-Month Calendar</h2>
            <p className="body-small text-onyx-60 mb-6">
              Maximum visibility for complex planning and long-term bookings.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="mb-6">
              <MultiMonthCalendar
                numberOfMonths={3}
                selected={tripleMonthRange}
                onSelect={setTripleMonthRange}
                startMonth={new Date(2025, 3)}
              />
            </div>
            
            {tripleMonthRange?.from && tripleMonthRange?.to && (
              <div className="bg-burnt-sienna-50 border border-burnt-sienna-200 rounded-lg p-4">
                <p className="body-small text-burnt-sienna-800 font-medium">
                  Selected Range: {tripleMonthRange.from.toLocaleDateString()} - {tripleMonthRange.to.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Disabled Dates Demo */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="ds-heading mb-2">Calendar with Disabled Dates</h2>
            <p className="body-small text-onyx-60 mb-6">
              Demonstrates unavailable dates (e.g., booked periods, maintenance windows).
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="mb-6">
              <MultiMonthCalendar
                numberOfMonths={2}
                selected={undefined}
                onSelect={() => {}}
                disabled={disabledDates}
                startMonth={new Date(2025, 4)}
              />
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="label-base text-onyx mb-2">Disabled Dates</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {disabledDates.map((date, index) => (
                  <p key={index} className="body-small text-onyx-60">
                    {date.toLocaleDateString()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design Specifications */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="ds-heading mb-2">Design Specifications</h2>
            <p className="body-small text-onyx-60 mb-6">
              Component styling and behavior specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="label-lg text-onyx mb-4">Color System</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-burnt-sienna-500 rounded-sm"></div>
                  <span className="body-small text-onyx-60">Primary: burnt-sienna-500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-burnt-sienna-100 rounded-sm"></div>
                  <span className="body-small text-onyx-60">Range middle: burnt-sienna-100</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-burnt-sienna-50 rounded-sm"></div>
                  <span className="body-small text-onyx-60">Hover: burnt-sienna-50</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-onyx-30 rounded-sm"></div>
                  <span className="body-small text-onyx-60">Disabled: onyx-30</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="label-lg text-onyx mb-4">Typography</h3>
              <div className="space-y-3">
                <div>
                  <p className="body-small text-onyx font-medium">Month headers</p>
                  <p className="body-small text-onyx-60">label-lg, McQueen Grotesk</p>
                </div>
                <div>
                  <p className="body-small text-onyx font-medium">Day labels</p>
                  <p className="body-small text-onyx-60">body-small, medium weight</p>
                </div>
                <div>
                  <p className="body-small text-onyx font-medium">Date numbers</p>
                  <p className="body-small text-onyx-60">text-sm, normal weight</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Notes */}
        <section className="mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="label-lg text-onyx mb-4">Integration Ready</h3>
            <div className="space-y-2">
              <p className="body-small text-onyx-60">
                ✅ Built with react-day-picker for reliability and accessibility
              </p>
              <p className="body-small text-onyx-60">
                ✅ Full A&K design system integration (colors, typography, spacing)
              </p>
              <p className="body-small text-onyx-60">
                ✅ Shadcn studio compatible (uses buttonVariants)
              </p>
              <p className="body-small text-onyx-60">
                ✅ TypeScript with full type safety
              </p>
              <p className="body-small text-onyx-60">
                ✅ Responsive layout support (1-3 months)
              </p>
              <p className="body-small text-onyx-60">
                ✅ Ready for custom booking logic integration
              </p>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  );
}
