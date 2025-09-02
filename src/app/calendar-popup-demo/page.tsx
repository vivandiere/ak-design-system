'use client';

import DesignSystemLayout from '@/components/DesignSystemLayout'
import DatePickerPopup from '@/components/DatePickerPopup'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { useState, useRef } from 'react'

export default function CalendarPopupDemo() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'silver' | 'personalised'>('silver');
  const dateInputRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    setIsDatePickerOpen(false);
  };

  const formatDateRange = () => {
    if (!selectedStartDate) return 'Select Dates';
    if (!selectedEndDate) return selectedStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const startStr = selectedStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = selectedEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  const getNightsCount = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    return Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const getWeeklyPrice = () => {
    if (selectedLevel === 'silver') return 12640;
    return 23830;
  };

  const getTotalPrice = () => {
    if (!selectedStartDate || !selectedEndDate) return getWeeklyPrice();
    
    const nights = getNightsCount();
    const weeklyPrice = getWeeklyPrice();
    const weeklyRate = weeklyPrice / 7; // Convert weekly price to nightly rate
    
    return Math.round(weeklyRate * nights);
  };

  const getPriceRange = () => {
    const silverPrice = 12640;
    const personalisedPrice = 23830;
    return `$${silverPrice.toLocaleString()}—$${personalisedPrice.toLocaleString()}`;
  };

  return (
    <DesignSystemLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Date Picker Popup</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            A comprehensive calendar popup component for date selection in booking interfaces. Features include 
            weekly/short stay modes, duration controls, real-time pricing, and full A&K design system integration.
          </p>
        </header>

        {/* Complete Booking Module Demo */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Complete Booking Module Demo</h2>
            
            <div className="flex justify-center">
              {/* Booking Module Container */}
              <div className="w-96 bg-linen-100 p-6 rounded-lg">
                {/* DATES Section */}
                <div className="mb-6">
                  <h4 className="label-lg text-onyx mb-4">DATES</h4>
                  
                  {/* Date Input Field */}
                  <div 
                    ref={dateInputRef}
                    className="relative mb-4"
                  >
                    <button
                      onClick={() => setIsDatePickerOpen(true)}
                      className="w-full text-left p-3 border border-gray-300 rounded bg-white hover:border-gray-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={selectedStartDate ? 'text-gray-900' : 'text-gray-500'}>
                          {formatDateRange()}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {selectedStartDate && selectedEndDate && (
                      <div className="mt-2 text-xs text-gray-600">
                        {getNightsCount()} nights
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Level Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {/* Radio Buttons */}
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="level" 
                            className="mr-2 accent-onyx" 
                            checked={selectedLevel === 'silver'}
                            onChange={() => setSelectedLevel('silver')}
                          />
                          <span className="text-sm text-gray-700">Villa Only</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="level" 
                            className="mr-2 accent-onyx" 
                            checked={selectedLevel === 'personalised'}
                            onChange={() => setSelectedLevel('personalised')}
                          />
                          <span className="text-sm text-gray-700">Villa with AK Benefits Package</span>
                        </label>
                      </div>
                    </div>
                    <Popover 
                      content={
                        <div className="space-y-4">
                          <div>
                            <h4 className="body-small font-medium mb-2">Villa Only</h4>
                            <p className="body-small">Our standard villa rental offering with essential amenities and support. Includes basic concierge services, housekeeping, and 24/7 emergency assistance. Perfect for guests who want quality accommodation with a focus on value.</p>
                          </div>
                          <div>
                            <h4 className="body-small font-medium mb-2">Villa with AK Benefits Package</h4>
                            <p className="body-small">A comprehensive luxury experience with full A&K service benefits. Includes dedicated concierge, private chef services, personal butler, custom excursions, exclusive access to premium amenities, and all A&K member benefits. Designed for guests seeking the ultimate in personalized luxury with complete service support.</p>
                          </div>
                        </div>
                      }
                    >
                      <button className="text-sm text-gray-600 underline hover:text-gray-800">
                        View details
                      </button>
                    </Popover>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-gray-900">
                      {selectedStartDate && selectedEndDate 
                        ? `$${getTotalPrice().toLocaleString()}`
                        : getPriceRange()
                      }
                    </span>
                    <span className="text-sm text-gray-600">
                      A WEEK *
                    </span>
                    <Popover 
                      content={
                        <div className="space-y-2">
                          <p className="body-small font-medium">Weekly Booking Information</p>
                          <p className="body-small">Check-in is on Saturday, as booking weeks are made up of 7 days starting from Saturday to Friday.</p>
                          <p className="body-small">This ensures consistent weekly rental periods for villa bookings.</p>
                        </div>
                      }
                    >
                      <button className="w-5 h-5 bg-onyx rounded-full flex items-center justify-center hover:bg-onyx-80 transition-colors">
                        <span className="text-white text-xs font-bold">?</span>
                      </button>
                    </Popover>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    SAVE TO SHORTLIST
                  </Button>
                  <Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 16 16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.4544 3.77777C10.1357 3.91011 10.7619 4.24184 11.2528 4.73051C11.7436 5.21917 12.0768 5.84254 12.2098 6.52083M9.4544 1C10.8699 1.15655 12.1899 1.78762 13.1977 2.78959C14.2054 3.79155 14.841 5.10486 15 6.51388M6.78762 9.23823C5.94945 8.4038 5.28761 7.4603 4.80211 6.45362C4.76035 6.36704 4.73947 6.32374 4.72343 6.26895C4.66642 6.07426 4.70737 5.8352 4.82596 5.67031C4.85933 5.62392 4.8992 5.58423 4.97894 5.50484C5.22281 5.26206 5.34475 5.14067 5.42447 5.0186C5.72511 4.55826 5.72511 3.9648 5.42447 3.50446C5.34475 3.3824 5.22281 3.26101 4.97894 3.01822L4.84301 2.8829C4.4723 2.51384 4.28694 2.32931 4.08787 2.22907C3.69196 2.02972 3.22441 2.02972 2.8285 2.22907C2.62943 2.32931 2.44408 2.51384 2.07337 2.8829L1.96341 2.99237C1.59396 3.36016 1.40924 3.54406 1.26816 3.79408C1.11161 4.07151 0.999055 4.50241 1.00001 4.82062C1.00086 5.10739 1.05674 5.30337 1.16849 5.69535C1.76907 7.80187 2.90224 9.78962 4.568 11.4479C6.23376 13.1063 8.23042 14.2344 10.3464 14.8323C10.7401 14.9435 10.937 14.9991 11.2251 15C11.5447 15.0009 11.9775 14.8889 12.2562 14.733C12.5073 14.5926 12.6921 14.4087 13.0615 14.0409L13.1715 13.9314C13.5422 13.5624 13.7275 13.3778 13.8282 13.1797C14.0285 12.7855 14.0285 12.3201 13.8282 11.9259C13.7275 11.7277 13.5422 11.5432 13.1715 11.1742L13.0355 11.0388C12.7917 10.796 12.6697 10.6747 12.5471 10.5953C12.0847 10.296 11.4886 10.296 11.0262 10.5953C10.9036 10.6747 10.7816 10.796 10.5378 11.0388C10.458 11.1182 10.4182 11.1579 10.3715 11.1911C10.2059 11.3092 9.96578 11.35 9.77022 11.2932C9.71519 11.2772 9.6717 11.2564 9.58472 11.2149C8.57352 10.7315 7.62579 10.0727 6.78762 9.23823Z" />
                    </svg>
                    ENQUIRE TO BOOK
                  </Button>
                </div>

                {/* Availability Information */}
                <div className="text-xs text-gray-600">
                  <p className="mb-2">
                    We are available from Monday to Friday, from 08:30 AM to 09:30 PM and on Saturday from 08:30 AM to 05:30 PM.
                  </p>
                  <button className="text-gray-600 underline hover:text-gray-800">
                    Availability & Rates information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Documentation */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Component Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Features</h3>
                <ul className="ds-body space-y-2 text-gray-600">
                  <li>• Weekly and short stay booking modes</li>
                  <li>• Saturday-only check-ins for weekly stays</li>
                  <li>• Duration controls with +/- buttons</li>
                  <li>• Real-time pricing calculation</li>
                  <li>• Visual date selection with color coding</li>
                  <li>• Compact popup design (384px width)</li>
                  <li>• Brand color integration (Sienna, Amber, Cerulean)</li>
                  <li>• Dynamic pricing based on selected dates</li>
                </ul>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">Integration</h3>
                <p className="ds-body text-gray-600">
                  This demo shows how the Date Picker Popup integrates with a complete booking module. 
                  The popup handles date selection, while the parent component manages pricing, 
                  booking levels, and actions based on the selected dates.
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded text-xs font-mono">
                  {`<DatePickerPopup
  isOpen={isDatePickerOpen}
  onClose={() => setIsDatePickerOpen(false)}
  anchorRef={dateInputRef}
  onDateSelect={handleDateSelect}
/>`}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Date Picker Popup */}
      <DatePickerPopup
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        anchorRef={dateInputRef}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onDateSelect={handleDateSelect}
        minStayNights={3}
      />
    </DesignSystemLayout>
  );
}
