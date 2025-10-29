# DoDeal - Digital Marketing Agency Website

A modern, responsive website for DoDeal digital marketing agency built with React and Tailwind CSS.

## Features

- ✨ Modern, dark-themed UI design
- 📱 Fully responsive (Desktop, Tablet, Mobile)
- 🎨 Pixel-perfect implementation matching Figma design
- ⚡ Built with React + Vite for optimal performance
- 🎯 Tailwind CSS for efficient styling

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd DoDeal
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
DoDeal/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Header with navigation
│   │   ├── Hero.jsx        # Hero section
│   │   ├── Services.jsx    # Services section
│   │   └── Weather.jsx     # Weather section
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles with Tailwind
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## Components

### Header

- Fixed navigation bar with logo
- Responsive menu for mobile devices
- Active link highlighting
- CTA button

### Hero

- Large headline with green accent
- Mission statement
- CTA button
- Social media links

### Services

- Dynamic circular service layout
- Interactive service cards
- Responsive design for all screen sizes

### Weather

- City search functionality
- Current weather display
- Hourly forecast
- 7-day forecast
- Air conditions

## Design Specifications

- **Primary Color**: `#00FF88` (Green)
- **Background**: Dark gradient from `#0F1E2E` to `#0A1929`
- **Typography**: Inter font family
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions to build and deploy

## License

This project is created for assessment purposes.

## Author

Built as part of UI Development Assessment
