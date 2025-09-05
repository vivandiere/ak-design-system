import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'secondary-white' | 'tertiary' | 'tertiary-white'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
}

// Shadcn-compatible buttonVariants function
const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-burnt-sienna-500 text-white hover:bg-burnt-sienna-600 rounded-md min-w-[120px]',
        secondary: 'bg-transparent border border-onyx-20 text-onyx hover:border-black-800 hover:text-black-800 rounded-md min-w-[120px]',
        'secondary-white': 'bg-transparent border border-white text-white hover:border-gray-200 hover:text-gray-200 rounded-md min-w-[120px]',
        tertiary: 'text-onyx hover:text-black-800 underline decoration-onyx underline-offset-4 min-w-fit px-0 py-0',
        'tertiary-white': 'text-white hover:text-gray-200 underline decoration-white underline-offset-4 min-w-fit px-0 py-0',
        // Shadcn-compatible variants
        default: 'bg-burnt-sienna-500 text-white hover:bg-burnt-sienna-600 rounded-md',
        destructive: 'bg-red-500 text-white hover:bg-red-600 rounded-md',
        outline: 'bg-transparent border border-onyx-20 text-onyx hover:border-black-800 hover:text-black-800 rounded-md',
        ghost: 'hover:bg-burnt-sienna-50 hover:text-burnt-sienna-900 rounded-md',
        link: 'text-burnt-sienna-600 underline-offset-4 hover:underline'
      },
      size: {
        sm: 'px-8 py-5 label-small',
        md: 'px-8 py-5 label-base', 
        lg: 'px-8 py-5 label-lg',
        // Shadcn-compatible sizes
        default: 'px-8 py-5 label-base',
        icon: 'h-10 w-10 p-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

type ButtonVariant = 'primary' | 'secondary' | 'secondary-white' | 'tertiary' | 'tertiary-white'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled = false, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const sizeClasses = {
      sm: 'px-8 py-5 label-small', // Small buttons use label-small typography
      md: 'px-8 py-5 label-base',  // Base buttons use label-base typography (desktop size)
      lg: 'px-8 py-5 label-lg'     // Large buttons use label-lg typography
    }
    
    const variantClasses = {
      primary: 'bg-burnt-sienna-500 text-white hover:bg-burnt-sienna-600 rounded-md min-w-[120px]',
      secondary: 'bg-transparent border border-onyx-20 text-onyx hover:border-black-800 hover:text-black-800 rounded-md min-w-[120px]',
      'secondary-white': 'bg-transparent border border-white text-white hover:border-gray-200 hover:text-gray-200 rounded-md min-w-[120px]',
      tertiary: 'text-onyx hover:text-black-800 underline decoration-onyx underline-offset-4 min-w-fit px-0 py-0',
      'tertiary-white': 'text-white hover:text-gray-200 underline decoration-white underline-offset-4 min-w-fit px-0 py-0'
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Create a type for shadcn compatibility
export interface ShadcnButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Export both for maximum compatibility
export { Button, buttonVariants }
