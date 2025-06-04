# 🎨 Watercolor React Components

A comprehensive watercolor effect system for React with an **interactive playground** for real-time customization. Create beautiful, organic watercolor UI elements with full TypeScript support and multiple implementation approaches.

## ✨ Interactive Playground

🚀 **[Try the Live Playground](/playground)** - The star feature of this project!

The playground lets you experiment with watercolor effects in real-time:
- 🎛️ **Real-time controls** - Adjust width, height, color, and intensity with sliders
- 🌈 **Color palette picker** - Choose from 8 beautiful preset colors
- 🎲 **Random pattern generator** - Create unique watercolor variations
- 🌊 **Animation effects** - Watch watercolor flow and change dynamically
- 🖱️ **Interactive hover effects** - Components that respond to user interaction
- 📋 **Live code examples** - See exactly how to implement each configuration

## 🏗️ Architecture Overview

This project offers **multiple approaches** to watercolor effects, each optimized for different use cases:

### 1. 🎮 Enhanced Dynamic Components (`EnhancedWatercolorDivider`)
- **Best for**: Interactive UIs requiring real-time customization
- **Features**: Live parameter adjustment, animation, hover effects
- **Performance**: Real-time SVG filter computation
- **Usage**: Playgrounds, demos, highly interactive components

### 2. ⚡ Pre-Generated Components (`/components/generated/`)
- **Best for**: Production apps requiring consistent performance
- **Features**: 9 themed components with light/dark mode support
- **Performance**: Zero runtime computation - everything pre-rendered
- **Usage**: Static designs, consistent branding, performance-critical apps

### 3. 🖼️ Static PNG Components (`StaticWatercolorDivider`)
- **Best for**: Maximum performance with simple color variations
- **Features**: CSS-only color transformations on exported PNG assets
- **Performance**: Fastest possible - just image rendering
- **Usage**: High-traffic sites, mobile apps, simple color schemes

### 4. 🎨 Classic Watercolor Suite
- **Components**: `WatercolorButton`, `WatercolorCard`, `WatercolorNavigation`
- **Features**: Traditional component library with configurable props
- **Usage**: Complete UI systems, design consistency

## 📁 Project Structure

```
src/
├── components/
│   ├── generated/           # 9 pre-built themed components
│   │   ├── WatercolorDividerBlue.tsx
│   │   ├── WatercolorDividerPurple.tsx
│   │   └── ... (7 more themes)
│   ├── EnhancedWatercolorDivider.tsx    # Dynamic playground component
│   ├── WatercolorPlayground.tsx         # Interactive demo interface
│   ├── WatercolorButton.tsx             # Button components
│   ├── WatercolorCard.tsx               # Card components
│   ├── WatercolorNavigation.tsx         # Navigation components
│   ├── StaticWatercolorDivider.tsx      # PNG-based component
│   └── SVGWatercolorDivider.tsx         # Programmatic SVG generator
├── utils/
│   ├── watercolorFactory.ts             # Build-time generation system
│   └── exportWatercolorAsset.ts         # PNG export utilities
├── scripts/
│   └── generateWatercolorComponents.js  # Build script for themed components
└── assets/
    ├── paper-texture.webp               # Texture overlay
    └── purple line watercolor complete.png  # Exported watercolor asset
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { EnhancedWatercolorDivider } from './components/EnhancedWatercolorDivider';

function App() {
  return (
    <EnhancedWatercolorDivider
      width={800}
      height={6}
      color="#7c3aed"
      intensity="medium"
      animated={true}
      hoverable={true}
    />
  );
}
```

### Pre-Generated Components

```tsx
import { WatercolorDividerBlue } from './components/generated';

function App() {
  return <WatercolorDividerBlue />; // Zero runtime computation!
}
```

### Interactive Playground

```tsx
import { WatercolorPlayground } from './components/WatercolorPlayground';

function App() {
  return <WatercolorPlayground />; // Full interactive demo
}
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Generate New Themed Components
```bash
npm run generate:watercolor
```

This creates new pre-rendered components in `src/components/generated/` with various themes and intensity levels.

## 🎯 Component Props

### EnhancedWatercolorDivider
```tsx
interface WatercolorDividerProps {
  width?: number;           // Default: 800
  height?: number;          // Default: 4
  color?: string;           // Default: '#2563eb'
  intensity?: 'light' | 'medium' | 'heavy';  // Default: 'medium'
  animated?: boolean;       // Default: false
  hoverable?: boolean;      // Default: false
  seed?: number;           // Default: random
  onClick?: () => void;    // Custom click handler
}
```

## 🎨 Technical Implementation

### SVG Filter Chain
The watercolor effect uses a sophisticated SVG filter pipeline:
- **feTurbulence**: Generates organic noise patterns
- **feDisplacementMap**: Warps edges for irregular shapes  
- **feMorphology**: Expands/contracts shapes for thickness variation
- **feGaussianBlur**: Softens edges for paint-like bleeding
- **feComposite**: Blends multiple layers for depth

### Performance Optimization
- **Build-time generation**: Pre-render complex filters to avoid runtime computation
- **Static assets**: Export to PNG for maximum performance
- **Opacity tuning**: 30% fill opacity minimizes rectangular artifacts while preserving effects

## 🌟 Navigation

- **`/`** - Complete component demo showcase
- **`/playground`** - Interactive watercolor playground

## 🙏 Credits

This React implementation builds upon amazing work by:

- **[Simey](https://codepen.io/simeydotme)** - Enhanced watercolor CodePen ([source](https://codepen.io/simeydotme/pen/GgRXvyd))
- **[Matteo Drera](https://codepen.io/sevenissimo)** - Original SVG watercolor technique ([source](https://codepen.io/sevenissimo/details/Kojaqj))

This project extends their creative filter techniques into a comprehensive React component system with TypeScript, build-time optimization, and interactive tooling.

## 📄 License

MIT License - Use freely in your projects!

---

🎨 **Happy watercoloring!** Try the playground to see what beautiful effects you can create.
