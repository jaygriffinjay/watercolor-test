#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watercolorThemes = [
  { name: 'Purple', lightColor: '#6b46c1', darkColor: '#a78bfa' },
  { name: 'Blue', lightColor: '#2563eb', darkColor: '#60a5fa' },
  { name: 'Green', lightColor: '#059669', darkColor: '#34d399' },
  { name: 'Orange', lightColor: '#ea580c', darkColor: '#fb923c' },
  { name: 'Pink', lightColor: '#dc2626', darkColor: '#f87171' },
  { name: 'Cyan', lightColor: '#0891b2', darkColor: '#22d3ee' },
  { name: 'Yellow', lightColor: '#ca8a04', darkColor: '#fbbf24' },
];

const watercolorFilters = {
  light: {
    baseFreq: 0.02,
    displacement1: 1,
    displacement2: 2,
    displacement3: 3,
    blur: 2,
    morphRadius: 0.5,
    composite: { k1: 0.2, k2: 0.8 }
  },
  medium: {
    baseFreq: 0.015,
    displacement1: 2,
    displacement2: 3,
    displacement3: 4,
    blur: 4,
    morphRadius: 1,
    composite: { k1: 0.3, k2: 0.7 }
  },
  heavy: {
    baseFreq: 0.01,
    displacement1: 3,
    displacement2: 4,
    displacement3: 5,
    blur: 6,
    morphRadius: 1.5,
    composite: { k1: 0.4, k2: 0.6 }
  }
};

// Generate SVG with watercolor filter
const generateWatercolorSVG = (config) => {
  const { width, height, color, seed, intensity, type } = config;
  const settings = watercolorFilters[intensity];
  const filterId = `watercolor-${type}-${seed}`;
  
  // Full original watercolor filter with morphology and multiple layers
  const filterDef = `
    <filter id="${filterId}" x="-20%" y="-50%" width="140%" height="200%">
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
      
      <feComposite result="watercolor-merged" in="layer-1" in2="layer-2" operator="over" />
      <feColorMatrix in="watercolor-merged" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0" result="final" />
    </filter>
  `;
  
  const shape = getShapeForType(type, width, height, filterId, color);
  
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>${filterDef}</defs>
  ${shape}
</svg>`;
};

const getShapeForType = (type, width, height, filterId, color) => {
  const baseProps = `fill="${color}" fill-opacity="0.3" filter="url(#${filterId})"`;
  
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

// Generate React component code
const generateComponentCode = (componentName, lightSVG, darkSVG) => {
  return `import React from 'react';
import styled from 'styled-components';

const Container = styled.div\`
  display: inline-block;
  width: 100%;
  margin: 1rem 0;
  
  .dark-svg {
    display: none;
  }
  
  /* Dark mode via class */
  .dark-mode & {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  /* Dark mode via media query */
  @media (prefers-color-scheme: dark) {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
\`;

export const ${componentName}: React.FC<{ className?: string }> = ({ className }) => (
  <Container className={className}>
    <div className="light-svg">
      ${lightSVG.replace(/\s+/g, ' ').trim()}
    </div>
    <div className="dark-svg">
      ${darkSVG.replace(/\s+/g, ' ').trim()}
    </div>
  </Container>
);
`;
};

// Generate Button React component code
const generateButtonComponentCode = (componentName, lightSVG, darkSVG, width, height) => {
  return `import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonContainer = styled.div<{ disabled: boolean }>\`
  display: inline-block;
  width: ${width}px;
  height: ${height}px;
  cursor: \${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: \${props => props.disabled ? 0.6 : 1};
  transition: transform 0.2s ease;
  position: relative;
  
  &:hover {
    transform: \${props => props.disabled ? 'none' : 'scale(1.02)'};
  }
  
  &:active {
    transform: \${props => props.disabled ? 'none' : 'scale(0.98)'};
  }
  
  .dark-svg {
    display: none;
  }
  
  /* Dark mode via class */
  .dark-mode & {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  /* Dark mode via media query */
  @media (prefers-color-scheme: dark) {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
\`;

const ButtonContent = styled.div\`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  z-index: 2;
  pointer-events: none;
\`;

export const ${componentName}: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className }) => (
  <ButtonContainer 
    disabled={disabled}
    onClick={disabled ? undefined : onClick}
    className={className}
  >
    <div className="light-svg">
      ${lightSVG.replace(/\s+/g, ' ').trim()}
    </div>
    <div className="dark-svg">
      ${darkSVG.replace(/\s+/g, ' ').trim()}
    </div>
    <ButtonContent>
      {children}
    </ButtonContent>
  </ButtonContainer>
);
`;
};

// Generate index file for all components
const generateIndexFile = (componentNames) => {
  const exports = componentNames.map(name => `export { ${name} } from './${name}';`).join('\n');
  return `// Auto-generated watercolor components
${exports}
`;
};

// Main generation function
const generateAllComponents = () => {
  console.log('🎨 Generating watercolor components...');
  
  const outputDir = path.join(__dirname, '..', 'src', 'components', 'generated');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  }
  
  const componentNames = [];
  
  // Generate divider components for each theme
  watercolorThemes.forEach(theme => {
    console.log(`🎯 Generating ${theme.name} divider...`);
    
    const componentName = `WatercolorDivider${theme.name}`;
    componentNames.push(componentName);
    
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
    
    const componentCode = generateComponentCode(componentName, lightSVG, darkSVG);
    const filePath = path.join(outputDir, `${componentName}.tsx`);
    fs.writeFileSync(filePath, componentCode);
    console.log(`✅ Generated: ${componentName}.tsx`);
  });
  
  // Generate button components for select themes and sizes
  const buttonSizes = [
    { name: 'Small', width: 100, height: 32 },
    { name: 'Medium', width: 120, height: 40 },
    { name: 'Large', width: 160, height: 50 }
  ];
  
  const buttonThemes = ['Blue', 'Purple', 'Green']; // Just a few to test
  
  buttonThemes.forEach(themeName => {
    const theme = watercolorThemes.find(t => t.name === themeName);
    
    buttonSizes.forEach(size => {
      console.log(`🔘 Generating ${theme.name} ${size.name} button...`);
      
      const componentName = `WatercolorButton${theme.name}${size.name}`;
      componentNames.push(componentName);
      
      const lightSVG = generateWatercolorSVG({
        width: size.width,
        height: size.height,
        color: theme.lightColor,
        seed: 2000,
        intensity: 'medium',
        type: 'button'
      });
      
      const darkSVG = generateWatercolorSVG({
        width: size.width,
        height: size.height,
        color: theme.darkColor,
        seed: 2000,
        intensity: 'medium',
        type: 'button'
      });
      
      const componentCode = generateButtonComponentCode(componentName, lightSVG, darkSVG, size.width, size.height);
      const filePath = path.join(outputDir, `${componentName}.tsx`);
      fs.writeFileSync(filePath, componentCode);
      console.log(`✅ Generated: ${componentName}.tsx`);
    });
  });
  
  // Generate different intensities for Purple theme
  ['Light', 'Heavy'].forEach(intensity => {
    const componentName = `WatercolorDividerPurple${intensity}`;
    componentNames.push(componentName);
    
    console.log(`🎯 Generating Purple ${intensity} variant...`);
    
    const lightSVG = generateWatercolorSVG({
      width: 800,
      height: 4,
      color: '#6b46c1',
      seed: 2345,
      intensity: intensity.toLowerCase(),
      type: 'divider'
    });
    
    const darkSVG = generateWatercolorSVG({
      width: 800,
      height: 4,
      color: '#a78bfa',
      seed: 2345,
      intensity: intensity.toLowerCase(),
      type: 'divider'
    });
    
    const componentCode = generateComponentCode(componentName, lightSVG, darkSVG);
    const filePath = path.join(outputDir, `${componentName}.tsx`);
    
    fs.writeFileSync(filePath, componentCode);
    console.log(`✅ Generated: ${componentName}.tsx`);
  });
  
  // Generate index file
  const indexCode = generateIndexFile(componentNames);
  const indexPath = path.join(outputDir, 'index.ts');
  fs.writeFileSync(indexPath, indexCode);
  console.log(`📄 Generated: index.ts`);
  
  console.log(`\n🚀 Generated ${componentNames.length} watercolor components!`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log('\n💡 Usage:');
  console.log("import { WatercolorDividerPurple } from './components/generated';");
  console.log('<WatercolorDividerPurple />');
};

// Run the generation
generateAllComponents();