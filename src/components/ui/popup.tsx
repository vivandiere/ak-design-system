'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  anchorRef?: React.RefObject<HTMLElement>;
}

const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ isOpen, onClose, children, className, anchorRef }, ref) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (isOpen && anchorRef?.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        const popupWidth = 384; // w-96 = 384px
        const popupHeight = 600; // Approximate height of the calendar popup
        
        // Calculate initial position below the anchor
        let top = rect.bottom + 8;
        let left = rect.left;
        
        // Check if popup would go below viewport
        if (top + popupHeight > window.innerHeight) {
          // Position above the anchor instead
          top = rect.top - popupHeight - 8;
        }
        
        // Check if popup would go right of viewport
        if (left + popupWidth > window.innerWidth) {
          // Align to right edge of viewport with some margin
          left = window.innerWidth - popupWidth - 16;
        }
        
        // Ensure popup doesn't go left of viewport
        if (left < 16) {
          left = 16;
        }
        
        // Ensure popup doesn't go above viewport
        if (top < 16) {
          top = 16;
        }
        
        setPosition({ top, left });
      }
    }, [isOpen, anchorRef]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 z-40 bg-black/20"
          onClick={onClose}
        />
        
        {/* Popup */}
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-white border border-gray-200 shadow-lg rounded-lg",
            "transition-all duration-200 ease-out",
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >
          {children}
        </div>
      </>
    );
  }
);

Popup.displayName = 'Popup';

export { Popup };
