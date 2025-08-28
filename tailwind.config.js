/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette (Primitives)
        linen: '#F5F2EB',
        canvas: '#E6DBC1',
        'canvas-warmsand': '#D5C3A3',
        'warm-sand': '#C3AA84',
        amber: '#E0A526',
        'burnt-sienna': '#AA5432',
        cerulean: '#94A9CB',
        forest: '#335525',
        onyx: '#000000',
        'onyx-15': 'rgba(0, 0, 0, 0.15)',
        
        // Black Color Scale - For UI interactions and hover states
        'black-50': '#FAFAFA',
        'black-100': '#F5F5F5',
        'black-200': '#E5E5E5',
        'black-300': '#D4D4D4',
        'black-400': '#A3A3A3',
        'black-500': '#737373',
        'black-600': '#525252',
        'black-700': '#404040',
        'black-800': '#262626',
        'black-900': '#171717',
        'black-950': '#0A0A0A',
        
        // Color Breakdowns - Linen Scale
        'linen-50': '#FEFEFD',
        'linen-100': '#FDFCFB',
        'linen-150': '#FBF9F6',
        'linen-200': '#F7F4EF',
        'linen-300': '#F0EBE3',
        'linen-400': '#E8E0D4',
        'linen-500': '#DED3C3',
        'linen-600': '#D1C3AE',
        'linen-700': '#BFAE94',
        'linen-800': '#A89A7A',
        'linen-900': '#8A7C5F',
        
        // Color Breakdowns - Canvas Scale
        'canvas-50': '#FDFBF9',
        'canvas-100': '#FBF8F4',
        'canvas-150': '#F7F2EA',
        'canvas-200': '#F0E8D9',
        'canvas-300': '#E6DBC1',
        'canvas-400': '#D9C9A8',
        'canvas-500': '#CBB68A',
        'canvas-600': '#BBA26C',
        'canvas-700': '#A88B4E',
        'canvas-800': '#8F7339',
        'canvas-900': '#6B5A2A',
        
        // Color Breakdowns - Warm Sand Scale
        'warm-sand-50': '#F9F7F3',
        'warm-sand-100': '#F5F1EA',
        'warm-sand-150': '#EFE8DD',
        'warm-sand-200': '#E6DCC9',
        'warm-sand-300': '#D9C9AD',
        'warm-sand-400': '#C9B38C',
        'warm-sand-500': '#B99A6B',
        'warm-sand-600': '#A67F4A',
        'warm-sand-700': '#8F6632',
        'warm-sand-800': '#735128',
        'warm-sand-900': '#5A3F1E',
        
        // Color Breakdowns - Amber Scale
        'amber-50': '#FCF6E9',
        'amber-100': '#F9EDD4',
        'amber-150': '#F4E2BB',
        'amber-200': '#EDD19A',
        'amber-300': '#E3BC73',
        'amber-400': '#D6A34C',
        'amber-500': '#C68925',
        'amber-600': '#B0701A',
        'amber-700': '#965A12',
        'amber-800': '#7A470E',
        'amber-900': '#5F360A',
        
        // Color Breakdowns - Burnt Sienna Scale
        'burnt-sienna-50': '#F7EEEB',
        'burnt-sienna-100': '#F0DCD6',
        'burnt-sienna-150': '#E7C7BE',
        'burnt-sienna-200': '#DCAEA0',
        'burnt-sienna-300': '#CE907A',
        'burnt-sienna-400': '#BD6F54',
        'burnt-sienna-500': '#A85538',
        'burnt-sienna-600': '#8F4428',
        'burnt-sienna-700': '#74351D',
        'burnt-sienna-800': '#5D2A16',
        'burnt-sienna-900': '#4A2112',
        
        // Color Breakdowns - Cerulean Scale
        'cerulean-50': '#F4F6FA',
        'cerulean-100': '#E9EDF4',
        'cerulean-150': '#DCE3ED',
        'cerulean-200': '#CBD5E3',
        'cerulean-300': '#B4C2D4',
        'cerulean-400': '#9AAAC1',
        'cerulean-500': '#7F91A8',
        'cerulean-600': '#6A7A8F',
        'cerulean-700': '#566276',
        'cerulean-800': '#454F5E',
        'cerulean-900': '#373F4B',
        
        // Color Breakdowns - Forest Scale
        'forest-50': '#F0F5ED',
        'forest-100': '#E1EBDA',
        'forest-150': '#CFDFC4',
        'forest-200': '#B9D1AA',
        'forest-300': '#9FBF8A',
        'forest-400': '#7FA866',
        'forest-500': '#5F8F4A',
        'forest-600': '#4A7339',
        'forest-700': '#3A5A2B',
        'forest-800': '#2E4722',
        'forest-900': '#253A1C',
        
        // Secondary Colors - Black
        secondary: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        
        // Background Colors
        bg: {
          white: '#FFFFFF',
          linen: '#F5F2EB',
          highlight: '#E6DBC1',
        },
        
        // System Colors
        error: {
          50: '#F7EEEB',
          100: '#EEDDD6',
          200: '#E6CCC2',
          300: '#DDBBAD',
          400: '#CC9884',
          500: '#AA5432',
          600: '#884328',
          700: '#66321E',
          800: '#442214',
          900: '#33190F',
        },
        
        // Line Styles
        line: {
          'onyx-15': 'rgba(0, 0, 0, 0.15)',
          'onyx-20': 'rgba(0, 0, 0, 0.2)',
        },
        
        // Text Colors
        text: {
          primary: '#000000',
          secondary: '#374151',
          muted: '#6B7280',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        // Your brand fonts
        'sans': ['Inter', 'McQueen Grotesk', 'system-ui', 'sans-serif'],
        'serif': ['Argent CF', 'Georgia', 'serif'],
        'grotesk': ['McQueen Grotesk', 'system-ui', 'sans-serif'],
        'argent': ['Argent CF', 'Georgia', 'serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'monospace'],
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'normal': '400', // This maps to font-weight: 400 for labels
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
    },
  },
  plugins: [],
}
