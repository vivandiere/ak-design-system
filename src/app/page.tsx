import DesignSystemLayout from '@/components/DesignSystemLayout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <DesignSystemLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="ds-display mb-4">Getting Started</h1>
          <p className="ds-body-large text-gray-600 max-w-3xl">
            Welcome to the A&K Design System. This comprehensive guide showcases our typography, 
            colors, buttons, and components built with modern web technologies and best practices.
          </p>
        </header>

        {/* Design System Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Design System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="ds-subheading text-gray-700 mb-4">Typography</h3>
                <p className="ds-body text-gray-600 mb-4">
                  Complete typography system with McQueen Grotesk and Argent CF fonts, 
                  responsive scaling, and consistent hierarchy.
                </p>
                <Link href="/styleguide">
                  <Button variant="tertiary" size="md">
                    EXPLORE TYPOGRAPHY
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <h3 className="ds-subheading text-gray-700 mb-4">Color System</h3>
                <p className="ds-body text-gray-600 mb-4">
                  Comprehensive color palette with primitives, breakdowns, and usage examples 
                  for consistent brand application.
                </p>
                <Link href="/colors">
                  <Button variant="tertiary" size="md">
                    EXPLORE COLORS
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <h3 className="ds-subheading text-gray-700 mb-4">Buttons</h3>
                <p className="ds-body text-gray-600 mb-4">
                  Complete button system with variants, sizes, and states built with our 
                  typography and color foundations.
                </p>
                <Link href="/buttons">
                  <Button variant="tertiary" size="md">
                    EXPLORE BUTTONS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-6">Components</h2>
            <p className="ds-body text-gray-600 mb-6">
              Interactive components built with our design system that demonstrate real-world usage.
            </p>
            <div className="space-y-4">
              <Link 
                href="/calendar-popup-demo" 
                className="ds-body text-burnt-sienna-600 hover:text-burnt-sienna-700 underline underline-offset-4"
              >
                Date Picker Popup Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="ds-heading mb-8">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">For Designers</h3>
                <p className="ds-body text-gray-600 mb-6">
                  Use our design tokens in Figma, Sketch, or other design tools. 
                  All colors, typography, and spacing are documented with exact values.
                </p>
                <Link href="/styleguide">
                  <Button variant="tertiary" size="md">
                    VIEW DESIGN TOKENS
                  </Button>
                </Link>
              </div>
              <div>
                <h3 className="ds-subheading text-gray-700 mb-4">For Developers</h3>
                <p className="ds-body text-gray-600 mb-6">
                  Integrate our components into your React applications. 
                  All components are built with TypeScript and follow accessibility best practices.
                </p>
                <Link href="/buttons">
                  <Button variant="tertiary" size="md">
                    VIEW COMPONENTS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesignSystemLayout>
  )
}
