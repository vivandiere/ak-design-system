# A&K Booking System

A professional property booking system built with Next.js, TypeScript, and Tailwind CSS. Features a flexible calendar interface for both weekly and short-term stays.

## Features

- **Dual Booking Modes**: Weekly stays (Saturday check-in) and short-term stays (3+ nights)
- **Interactive Calendar**: Click to select dates and adjust stay duration
- **Dynamic Pricing**: Real-time price calculation based on stay length
- **Responsive Design**: Mobile-friendly interface
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom component library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ak-booking-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   │   └── card.tsx       # Card component
│   └── CalendarVisualization.tsx  # Main calendar component
└── lib/                   # Utility functions
    └── utils.ts           # Helper functions
```

## Customization

### Design System Integration

The project is set up to easily integrate with your design system:

1. **Colors**: Update `tailwind.config.js` with your brand colors
2. **Fonts**: Replace the Inter font with your brand fonts
3. **Components**: Extend the UI component library with your design tokens

### Styling

- Global styles are in `src/app/globals.css`
- Component-specific styles use Tailwind CSS classes
- Custom CSS variables can be added for design system consistency

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary to A&K.


