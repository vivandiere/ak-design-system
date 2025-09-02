"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, content, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout>()

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsHovered(true)
      setIsOpen(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 150)
    }

    const handleClick = () => {
      setIsOpen(!isOpen)
    }

    const handleTouchStart = () => {
      // Prevent hover behavior on touch devices
      setIsHovered(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    return (
      <div 
        ref={ref}
        className={cn("relative inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        {children}
        {isOpen && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-screen max-w-sm sm:max-w-md sm:w-auto">
            <div className="bg-white border border-onyx-20 rounded-lg shadow-lg p-4 mx-4 sm:mx-0 min-w-80 max-w-full">
              <div className="body-small text-onyx">
                {content}
              </div>
              {/* Arrow - hidden on mobile */}
              <div className="hidden sm:block absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-px">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-onyx-20"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

Popover.displayName = "Popover"

export { Popover }
