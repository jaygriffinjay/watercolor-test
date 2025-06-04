// Watercolor Factory - Backend transformation system
export interface WatercolorConfig {
  width: number;
  height: number;
  color: string;
  seed: number;
  intensity: 'light' | 'medium' | 'heavy';
  type: 'divider' | 'button' | 'card';
}

export interface WatercolorTheme {
  name: string;
  lightColor: string;
  darkColor: string;
}

// Core filter definitions that can be applied to any shape
export const watercolorFilters = {
  light: {
    baseFreq: 0.02,
    displacement1: 3,
    displacement2: 5,
    displacement3: 8,
    blur: 3,
    morphRadius: 2,
    composite: { k1: 0.2, k2: 0.8 }
  },
  medium: {
    baseFreq: 0.015,
    displacement1: 5,
    displacement2: 8,
    displacement3: 12,
    blur: 5,
    morphRadius: 3,
    composite: { k1: 0.3, k2: 0.7 }
  },
  heavy: {
    baseFreq: 0.01,
    displacement1: 8,
    displacement2: 12,
    displacement3: 16,
    blur: 8,
    morphRadius: 4,
    composite: { k1: 0.4, k2: 0.6 }
  }
};

// Generate a complete SVG string with baked-in watercolor effects
export const generateWatercolorSVG = (config: WatercolorConfig): string => {
  const { width, height, color, seed, intensity, type } = config;
  const settings = watercolorFilters[intensity];
  const filterId = `watercolor-${type}-${seed}`;
  
  // Full original watercolor filter with morphology and multiple layers
  const filterDef = `
    <filter id="${filterId}" x="-50%" y="-100%" width="200%" height="300%">
      <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="${settings.baseFreq}" numOctaves="2" seed="${seed}" />
      <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="${seed + 100}" />
      
      <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="${settings.composite.k1}" k2="${settings.composite.k2}" k4="-0.05" />
      
      <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="${settings.morphRadius}" />
      <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="${settings.displacement1}" />
      <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="${settings.displacement2}" />
      <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="${settings.displacement3}" />
      <feGaussianBlur result="mask" in="mask" stdDeviation="${settings.blur}" />
      <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" />
      
      <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="${settings.displacement1}" />
      <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="${settings.displacement2}" />
      <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="${settings.displacement3}" />
      
      <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" />
      <feComposite result="glow" in="glow" in2="glow-diff" operator="out" />
      <feGaussianBlur result="glow" in="glow" stdDeviation="${settings.blur}" />
      <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" />
      
      <feComposite result="final" in="layer-1" in2="layer-2" operator="over" />
    </filter>
  `;
  
  const shape = getShapeForType(type, width, height, seed);
  
  return `
    <svg 
      width="${width}" 
      height="${height}" 
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>${filterDef}</defs>
      ${shape}
    </svg>
  `.trim();
};

// Get the appropriate shape for each component type
const getShapeForType = (type: string, width: number, height: number, seed: number): string => {
  const baseProps = `fill="currentColor" filter="url(#watercolor-${type}-${seed})"`;
  
  switch (type) {
    case 'divider':
      return `<rect x="0" y="0" width="${width}" height="${height}" rx="${height/2}" ${baseProps} />`;
    case 'button':
      return `<rect x="0" y="0" width="${width}" height="${height}" rx="8" ${baseProps} />`;
    case 'card':
      return `<rect x="0" y="0" width="${width}" height="${height}" rx="12" ${baseProps} />`;
    default:
      return `<rect x="0" y="0" width="${width}" height="${height}" ${baseProps} />`;
  }
};

// Generate React component code from SVG
export const generateComponentCode = (
  componentName: string,
  lightSVG: string,
  darkSVG: string
): string => {
  return `
import React from 'react';
import styled from 'styled-components';

const Container = styled.div\`
  display: inline-block;
  color: var(--watercolor-color, currentColor);
  
  .light-mode & {
    .dark-svg { display: none; }
  }
  
  .dark-mode & {
    .light-svg { display: none; }
  }
  
  @media (prefers-color-scheme: dark) {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  @media (prefers-color-scheme: light) {
    .light-svg { display: block; }
    .dark-svg { display: none; }
  }
\`;

export const ${componentName}: React.FC<{ className?: string }> = ({ className }) => (
  <Container className={className}>
    <div className="light-svg">
      ${lightSVG.replace(/\n\s*/g, '')}
    </div>
    <div className="dark-svg" style={{ display: 'none' }}>
      ${darkSVG.replace(/\n\s*/g, '')}
    </div>
  </Container>
);
  `.trim();
};

// Pre-defined themes for generation
export const watercolorThemes: WatercolorTheme[] = [
  { name: 'Purple', lightColor: '#6b46c1', darkColor: '#a78bfa' },
  { name: 'Blue', lightColor: '#2563eb', darkColor: '#60a5fa' },
  { name: 'Green', lightColor: '#059669', darkColor: '#34d399' },
  { name: 'Orange', lightColor: '#ea580c', darkColor: '#fb923c' },
  { name: 'Pink', lightColor: '#dc2626', darkColor: '#f87171' },
];

// Build-time generation function
export const generateAllWatercolorComponents = () => {
  const components: { [key: string]: string } = {};
  
  watercolorThemes.forEach(theme => {
    const lightSVG = generateWatercolorSVG({
      width: 800,
      height: 4,
      color: theme.lightColor,
      seed: 1234,
      intensity: 'medium',
      type: 'divider'
    });
    
    const darkSVG = generateWatercolorSVG({
      width: 800,
      height: 4,
      color: theme.darkColor,
      seed: 1234,
      intensity: 'medium',
      type: 'divider'
    });
    
    const componentCode = generateComponentCode(
      `WatercolorDivider${theme.name}`,
      lightSVG,
      darkSVG
    );
    
    components[`WatercolorDivider${theme.name}.tsx`] = componentCode;
  });
  
  return components;
};

// Example usage in a build script:
/*
import fs from 'fs';
import { generateAllWatercolorComponents } from './watercolorFactory';

const components = generateAllWatercolorComponents();
Object.entries(components).forEach(([filename, code]) => {
  fs.writeFileSync(`src/components/generated/${filename}`, code);
});
*/ 