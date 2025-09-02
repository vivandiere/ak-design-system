'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface DesignSystemLayoutProps {
  children: React.ReactNode
}

export default function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          {/* A&K Logo */}
          <div className="flex h-8 w-8 items-center justify-center">
            <img 
              src="/ak-monogram.png" 
              alt="A&K Monogram" 
              className="h-8 w-8 object-contain"
            />
          </div>
          
          {/* Brand Name */}
          <h1 className="ds-label text-black">A&K DESIGN SYSTEM</h1>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white p-6">
          <nav className="space-y-8">
            {/* Guides Section */}
            <div>
              <h3 className="ds-label text-gray-900 font-semibold mb-3">Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className={cn(
                      'ds-body block rounded px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                      pathname === '/' && 'bg-blue-50 text-blue-700 font-medium'
                    )}
                  >
                    Getting started
                  </Link>
                </li>
              </ul>
            </div>

            {/* Brand Identity Section */}
            <div>
              <h3 className="ds-label text-gray-900 font-semibold mb-3">Foundations</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/styleguide" 
                    className={cn(
                      'ds-body block rounded px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                      pathname === '/styleguide' && 'bg-blue-50 text-blue-700 font-medium'
                    )}
                  >
                    Typography
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/colors" 
                    className={cn(
                      'ds-body block rounded px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                      pathname === '/colors' && 'bg-blue-50 text-blue-700 font-medium'
                    )}
                  >
                    Color
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/buttons" 
                    className={cn(
                      'ds-body block rounded px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                      pathname === '/buttons' && 'bg-blue-50 text-blue-700 font-medium'
                    )}
                  >
                    Buttons
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/layout-system" 
                    className={cn(
                      'ds-body block rounded px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                      pathname === '/layout-system' && 'bg-blue-50 text-blue-700 font-medium'
                    )}
                  >
                    Layout System
                  </Link>
                </li>
              </ul>
            </div>

            {/* Components */}
            <div className="mb-6">
              <h3 className="ds-label text-gray-500 mb-3">COMPONENTS</h3>
              <div className="space-y-2">
                <Link 
                  href="/calendar-popup-demo" 
                  className={cn(
                    "ds-body block py-2 px-3 rounded-md transition-colors text-sm",
                    pathname === '/calendar-popup-demo' 
                      ? "bg-gray-100 text-gray-900" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  Date Picker Popup Demo
                </Link>
                <Link 
                  href="/villas-filter" 
                  className={cn(
                    "ds-body block py-2 px-3 rounded-md transition-colors text-sm",
                    pathname === '/villas-filter' 
                      ? "bg-gray-100 text-gray-900" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  Villas Filter
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
