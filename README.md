# 🎨 Watercolor React Components

A comprehensive watercolor effect system for React with an **interactive playground** for real-time customization. Create beautiful, organic watercolor UI elements with full TypeScript support and multiple implementation approaches.

## ✨ Interactive Playground

The playground lets you experiment with watercolor effects in real-time:
- 🎛️ **Real-time controls** - Adjust width, height, color, and intensity with sliders
- 🌈 **Color palette picker** - Choose from 8 beautiful preset colors
- 🎲 **Random pattern generator** - Create unique watercolor variations
- 🌊 **Animation effects** - Watch watercolor flow and change dynamically
- 🖱️ **Interactive hover effects** - Components that respond to user interaction
- 📋 **Live code examples** - See exactly how to implement each configuration
- 🖼️ **PNG Export** - Rasterize watercolor effects to high-resolution PNG assets
- ⚡ **Live PNG Buttons** - Test PNG-based buttons directly in the playground

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

### 3. 🖼️ PNG Button Components (`WatercolorPNGButton`) **NEW!**
- **Best for**: Ultra-high performance with pixel-perfect consistency
- **Features**: Pre-rasterized PNG assets with interactive button behavior
- **Performance**: Fastest possible - just image rendering with CSS effects
- **Usage**: Production buttons, mobile apps, high-traffic sites

### 4. 🎨 CSS PNG Components (`StaticWatercolorDivider`)
- **Best for**: Maximum performance with simple color variations
- **Features**: CSS-only color transformations on exported PNG assets
- **Performance**: Fast image rendering with CSS filters
- **Usage**: High-traffic sites, mobile apps, simple color schemes

### 5. 🎨 Classic Watercolor Suite
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
│   ├── WatercolorPNGButton.tsx          # PNG asset-based buttons
│   ├── WatercolorButton.tsx             # Simplified dynamic buttons (NEW!)
│   ├── WatercolorTest.tsx               # Comprehensive test page (NEW!)
│   ├── CompressedWatercolorAssets.tsx   # Compressed PNG showcase (NEW!)
│   ├── WatercolorBorder.tsx             # Watercolor border wrapper
│   ├── WatercolorBorderImage.tsx        # CSS border-image implementation
│   ├── WatercolorCard.tsx               # Card components
│   ├── WatercolorNavigation.tsx         # Navigation components
│   ├── StaticWatercolorDivider.tsx      # PNG-based component
│   └── SVGWatercolorDivider.tsx         # Programmatic SVG generator
├── utils/
│   ├── watercolorFactory.ts             # Build-time generation system
│   ├── rasterizeSVG.ts                  # Browser-based PNG export
│   └── exportWatercolorAsset.ts         # PNG export utilities
├── scripts/
│   ├── generateWatercolorComponents.js  # Build script for themed components
│   └── compressPNGs.cjs                 # PNG compression pipeline (NEW!)
└── assets/
    ├── high-res/                        # High-resolution source PNGs (NEW!)
    │   ├── watercolor-button-100x100-2563eb-10x.png
    │   └── watercolor-button-30x30-2563eb-10x.png
    ├── compressed/                      # Optimized multi-scale assets (NEW!)
    │   ├── watercolor-button-100x100-2563eb-1x-compressed.png
    │   ├── watercolor-button-100x100-2563eb-2x-compressed.png
    │   └── watercolor-button-100x100-2563eb-3x-compressed.png
    ├── paper-texture.webp               # Texture overlay
    ├── watercolor-button-50x50-2563eb-rasterized.png  # Example PNG asset
    └── purple line watercolor complete.png            # Exported watercolor asset
```

## 🚀 Quick Start

### PNG Button Workflow (Recommended for Production)

```tsx
// 1. Export PNG from playground
// Use the "Rasterize PNG" button to export high-res assets

// 2. Use the PNG button component
import { WatercolorPNGButton } from './components/WatercolorPNGButton';

function App() {
  return (
    <WatercolorPNGButton
      pngPath="/assets/watercolor-button-100x40-blue.png"
      width={100}
      height={40}
      onClick={() => alert('Clicked!')}
    >
      Click Me
    </WatercolorPNGButton>
  );
}
```

### Dynamic Components

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

### PNG Compression Pipeline (NEW!)

The project includes a production-ready PNG compression workflow for creating optimized watercolor assets:

#### Quick Start:
```bash
# Generate compressed PNG assets
npm run compress:png
```

#### How It Works:

1. **Place 10x Resolution PNGs** in `src/assets/high-res/`
   - Use descriptive filenames: `watercolor-button-100x100-blue-10x.png`
   - These should be your highest quality source images

2. **Run Compression Script**
   ```bash
   npm run compress:png
   ```

3. **Get Optimized Assets** in `src/assets/compressed/`
   - Automatically generates 1x, 2x, 3x versions
   - Removes ghost pixels around watercolor edges
   - Optimized for web delivery

#### Ghost Pixel Removal Algorithm:

The compressor intelligently removes unwanted light pixels around watercolor edges:

```javascript
// Targets light blue pixels with low alpha (ghost pixels)
const lightPixelThreshold = 175;  // Blue channel > 175
const lowAlphaThreshold = 75;     // Alpha < 75

// Only removes pixels that are both:
// 1. Light colored (B > 175)
// 2. Semi-transparent (A < 75)
// 3. Not fully transparent (A > 0)
```

**Why This Works:**
- ✅ **Preserves watercolor pigments** - Solid colors have lower blue values and higher alpha
- ✅ **Removes artifact pixels** - Light blue pixels with low opacity are unwanted edge artifacts  
- ✅ **Maintains transparency** - Keeps existing transparent areas intact
- ✅ **Clean edges** - Results in crisp watercolor boundaries without boxy artifacts

#### File Structure:
```
src/assets/
├── high-res/           # Place your 10x source PNGs here
│   ├── watercolor-button-100x100-blue-10x.png
│   └── watercolor-divider-800x4-purple-10x.png
└── compressed/         # Generated optimized assets
    ├── watercolor-button-100x100-blue-1x-compressed.png
    ├── watercolor-button-100x100-blue-2x-compressed.png
    ├── watercolor-button-100x100-blue-3x-compressed.png
    └── ...
```

#### Usage in Production:
```tsx
import { WatercolorPNGButton } from './components/WatercolorPNGButton';

// Use compressed assets for optimal performance
<WatercolorPNGButton
  pngPath="/assets/compressed/watercolor-button-100x100-blue-2x-compressed.png"
  width={100}
  height={100}
>
  Click Me
</WatercolorPNGButton>
```

### Simplified Watercolor Components (NEW!)

For development speed and better performance, we now have simplified watercolor components:

#### Features:
- **6 SVG operations** instead of 20+ (much faster rendering)
- **Proper text centering** - Fixed positioning issues
- **Dynamic sizing & colors** - Any size, any color, instantly
- **Three intensity levels** - light, medium, heavy
- **Interactive states** - hover, click, disabled

#### Test Page:
Visit `/test` to see comprehensive examples of:
- Different button sizes (small, medium, large, square)
- Color variations (blue, purple, green, orange, pink, dark)
- Intensity levels (light, medium, heavy watercolor effects)
- Interactive states (normal, disabled)
- Real-world usage examples

#### Simplified Watercolor Button:
```tsx
import { WatercolorButton } from './components/WatercolorButton';

function App() {
  return (
    <WatercolorButton
      width={120}
      height={40}
      color="#8b5cf6"
      intensity="medium"
      onClick={() => alert('Clicked!')}
    >
      Click Me
    </WatercolorButton>
  );
}
```

## 🎯 Component Props

### WatercolorButton (Simplified, NEW!)
```tsx
interface WatercolorButtonProps {
  children: React.ReactNode;                    // Button content
  width?: number;                               // Default: 120
  height?: number;                              // Default: 40
  color?: string;                              // Default: '#2563eb'
  intensity?: 'light' | 'medium' | 'heavy';   // Default: 'medium'
  onClick?: () => void;                        // Click handler
  disabled?: boolean;                          // Default: false
}
```

### WatercolorPNGButton (Production-Ready)
```tsx
interface WatercolorPNGButtonProps {
  pngPath: string;          // Path to PNG asset
  width: number;            // Button width in pixels
  height: number;           // Button height in pixels
  children: React.ReactNode; // Button content
  onClick?: () => void;     // Click handler
  disabled?: boolean;       // Disabled state (default: false)
}
```

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

### PNG Rasterization Workflow (NEW!)
The project now includes a complete workflow for creating production-ready PNG button assets:

1. **Design in Playground** - Use the interactive controls to perfect your watercolor design
2. **Export High-Resolution PNG** - Click "Rasterize PNG" to generate 3x resolution assets
3. **Use PNG Button Component** - Implement with `WatercolorPNGButton` for maximum performance

#### Rasterization Features:
- **Browser-based Processing** - No server dependencies, uses Canvas API
- **High Resolution** - 3x scaling ensures crisp rendering at any size
- **Instant Download** - Direct file download with descriptive naming
- **Quality Optimization** - Maintains watercolor authenticity in rasterized form

#### Performance Benefits:
- **Zero Runtime Cost** - PNG rendering is faster than SVG filters
- **Consistent Appearance** - Identical button every time, no variation
- **Mobile Optimized** - Excellent performance on mobile devices
- **Scalable** - Single PNG can be used at multiple sizes

## 🌟 Navigation

- **`/`** - Complete component demo showcase
- **`/playground`** - Interactive watercolor playground
- **`/test`** - Simplified components test page (NEW!)

## 🙏 Credits

This React implementation builds upon amazing work by:

- **[Simey](https://codepen.io/simeydotme)** - Enhanced watercolor CodePen ([source](https://codepen.io/simeydotme/pen/GgRXvyd))
- **[Matteo Drera](https://codepen.io/sevenissimo)** - Original SVG watercolor technique ([source](https://codepen.io/sevenissimo/details/Kojaqj))

This project extends their creative filter techniques into a comprehensive React component system with TypeScript, build-time optimization, and interactive tooling.

## 📄 License

MIT License - Use freely in your projects!

---

🎨 **Happy watercoloring!** Try the playground to see what beautiful effects you can create.

## 📋 What's New?

See [CHANGELOG.md](./CHANGELOG.md) for detailed information about recent updates, new features, and the evolution of this project.
