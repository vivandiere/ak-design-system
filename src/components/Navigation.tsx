import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-light text-gray-900">
              A&K
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="ui-header hover:text-gray-900 transition-colors"
            >
              Booking System
            </Link>
            <Link 
              href="/styleguide" 
              className="ui-header hover:text-gray-900 transition-colors"
            >
              Style Guide
            </Link>
            <Link 
              href="/colors" 
              className="ui-header hover:text-gray-900 transition-colors"
            >
              Color System
            </Link>
            <Link 
              href="/buttons" 
              className="ui-header hover:text-gray-900 transition-colors"
            >
              Button System
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
