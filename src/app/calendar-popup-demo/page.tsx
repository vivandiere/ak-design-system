'use client';

import DesignSystemLayout from '@/components/DesignSystemLayout'
import DatePickerPopup from '@/components/DatePickerPopup'
import { Button } from '@/components/ui/button'
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
          <h1 className="ds-display mb-4">Date Picker Popup Component</h1>
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
                  <h4 className="font-medium text-gray-900 mb-4 text-lg">DATES</h4>
                  
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
                            className="mr-2" 
                            checked={selectedLevel === 'silver'}
                            onChange={() => setSelectedLevel('silver')}
                          />
                          <span className="text-sm text-gray-700">Silver Level</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="level" 
                            className="mr-2" 
                            checked={selectedLevel === 'personalised'}
                            onChange={() => setSelectedLevel('personalised')}
                          />
                          <span className="text-sm text-gray-700">Personalised Experience</span>
                        </label>
                      </div>
                    </div>
                    <button className="text-sm text-gray-600 underline hover:text-gray-800">
                      Hide Details
                    </button>
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
                    <button className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">?</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button variant="secondary" size="sm" className="w-full">
                    SAVE TO SHORTLIST
                  </Button>
                  <Button variant="primary" size="sm" className="w-full">
                    ENQUIRE
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
