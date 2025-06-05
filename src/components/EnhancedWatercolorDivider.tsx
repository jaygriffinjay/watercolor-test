import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface WatercolorDividerProps {
  width?: number;
  height?: number;
  color?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  animated?: boolean;
  hoverable?: boolean;
  seed?: number;
  className?: string;
  onClick?: () => void;
  borderFrame?: boolean;
}

const Container = styled.div<{ hoverable?: boolean }>`
  display: inline-block;
  width: 100%;
  margin: 1rem 0;
  cursor: ${props => props.hoverable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  &:hover {
    ${props => props.hoverable && `
      transform: scale(1.02);
      filter: brightness(1.1);
    `}
  }
  
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const watercolorSettings = {
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

export const EnhancedWatercolorDivider: React.FC<WatercolorDividerProps> = ({
  width = 800,
  height = 4,
  color = '#2563eb',
  intensity = 'medium',
  animated = false,
  hoverable = false,
  seed: initialSeed = 1234,
  className,
  onClick,
  borderFrame = false
}) => {
  const [seed, setSeed] = useState(initialSeed);
  const [animationSeed, setAnimationSeed] = useState(initialSeed);
  
  // Update internal seed when prop changes
  useEffect(() => {
    setSeed(initialSeed);
  }, [initialSeed]);
  
  // Animation effect - slowly change seed for flowing watercolor
  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setAnimationSeed(prev => prev + 1);
    }, 200); // Change every 200ms for smooth flow
    
    return () => clearInterval(interval);
  }, [animated]);
  
  const currentSeed = animated ? animationSeed : seed;
  const settings = watercolorSettings[intensity];
  const filterId = `watercolor-enhanced-${currentSeed}`;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default: regenerate with new random seed
      setSeed(Math.floor(Math.random() * 10000));
    }
  };
  
  const generateFilter = () => (
    <filter id={filterId} x="-20%" y="-50%" width="140%" height="200%">
      <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency={settings.baseFreq} numOctaves="2" seed={currentSeed} />
      <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed={currentSeed + 100} />
      
      <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1={settings.composite.k1} k2={settings.composite.k2} k4="-0.05" />
      
      <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius={settings.morphRadius} />
      <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale={settings.displacement1} />
      <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale={settings.displacement2} />
      <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale={settings.displacement3} />
      <feGaussianBlur result="mask" in="mask" stdDeviation={settings.blur} />
      <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" />
      
      <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale={settings.displacement1} />
      <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale={settings.displacement2} />
      <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale={settings.displacement3} />
      
      <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" />
      <feComposite result="glow" in="glow" in2="glow-diff" operator="out" />
      <feGaussianBlur result="glow" in="glow" stdDeviation={settings.blur} />
      <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" />
      
      <feComposite result="watercolor-merged" in="layer-1" in2="layer-2" operator="over" />
      <feColorMatrix in="watercolor-merged" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0" result="final" />
    </filter>
  );
  
  return (
    <Container 
      className={className} 
      hoverable={hoverable}
      onClick={hoverable || onClick ? handleClick : undefined}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {generateFilter()}
        </defs>
        <rect 
          x="0" 
          y="0" 
          width={width} 
          height={height} 
          rx={height <= 10 ? height/2 : Math.min(width, height) * 0.25} 
          fill={borderFrame ? 'none' : color}
          stroke={borderFrame ? color : 'none'}
          strokeWidth={borderFrame ? Math.min(width, height) * 0.15 : 0}
          fillOpacity={borderFrame ? 0 : 0.3}
          filter={`url(#${filterId})`} 
        />
      </svg>
    </Container>
  );
}; 