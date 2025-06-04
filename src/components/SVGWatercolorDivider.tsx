import React from 'react';
import styled from 'styled-components';

interface SVGWatercolorDividerProps {
  thickness?: number;
  color?: string;
  darkModeColor?: string;
  opacity?: number;
  seed?: number;
  className?: string;
}

const SVGContainer = styled.div<{
  $thickness: number;
  $color: string;
  $darkModeColor: string;
  $opacity: number;
}>`
  width: 100%;
  height: ${props => props.$thickness}px;
  margin: 1rem 0;
  
  /* CSS Custom Properties for color control */
  --divider-color: ${props => props.$color};
  --divider-opacity: ${props => props.$opacity};
  
  /* Dark mode color override */
  @media (prefers-color-scheme: dark) {
    --divider-color: ${props => props.$darkModeColor};
  }
  
  /* Dark mode class override */
  .dark-mode & {
    --divider-color: ${props => props.$darkModeColor};
  }
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  /* The watercolor shape */
  .watercolor-shape {
    fill: var(--divider-color);
    opacity: var(--divider-opacity);
  }
`;

export const SVGWatercolorDivider: React.FC<SVGWatercolorDividerProps> = ({
  thickness = 3,
  color = '#6b46c1',           // Default purple for light mode
  darkModeColor = '#a78bfa',   // Lighter purple for dark mode
  opacity = 0.75,
  seed = 1234,
  className = '',
}) => {
  const filterId = `watercolor-divider-${seed}`;
  
  return (
    <SVGContainer
      $thickness={thickness}
      $color={color}
      $darkModeColor={darkModeColor}
      $opacity={opacity}
      className={className}
    >
      <svg
        viewBox="0 0 800 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Watercolor filter definition */}
          <filter id={filterId} x="-20%" y="-50%" width="140%" height="200%">
            <feTurbulence 
              result="noise-lg" 
              type="fractalNoise" 
              baseFrequency="0.0125" 
              numOctaves="2" 
              seed={seed} 
            />
            <feTurbulence 
              result="noise-md" 
              type="fractalNoise" 
              baseFrequency="0.12" 
              numOctaves="3" 
              seed={seed + 100} 
            />
            
            {/* Base graphic with chroma variation */}
            <feComposite 
              result="BaseGraphic" 
              in="SourceGraphic" 
              in2="noise-lg" 
              operator="arithmetic" 
              k1="0.3" 
              k2="0.35" 
              k4="-0.05" 
            />
            
            {/* Displacement for organic edges */}
            <feDisplacementMap 
              result="layer-2" 
              in="BaseGraphic" 
              in2="noise-lg" 
              xChannelSelector="G" 
              yChannelSelector="R" 
              scale="2" 
            />
            <feDisplacementMap 
              result="layer-2" 
              in="layer-2" 
              in2="noise-md" 
              xChannelSelector="A" 
              yChannelSelector="G" 
              scale="3" 
            />
            
            {/* Glow effect */}
            <feDisplacementMap 
              result="glow" 
              in="BaseGraphic" 
              in2="noise-lg" 
              xChannelSelector="R" 
              yChannelSelector="A" 
              scale="4" 
            />
            <feMorphology 
              result="glow-diff" 
              in="glow" 
              operator="erode" 
              radius="2" 
            />
            <feComposite 
              result="glow" 
              in="glow" 
              in2="glow-diff" 
              operator="out" 
            />
            <feGaussianBlur 
              result="glow" 
              in="glow" 
              stdDeviation="4" 
            />
            <feComposite 
              result="final" 
              in="layer-2" 
              in2="glow" 
              operator="arithmetic" 
              k1="0.65" 
              k2="1.0" 
              k3="0.4" 
              k4="-0.15" 
            />
          </filter>
        </defs>
        
        {/* The base rectangle that gets the watercolor treatment */}
        <rect
          x="0"
          y="0"
          width="800"
          height="20"
          rx="10"
          className="watercolor-shape"
          filter={`url(#${filterId})`}
        />
      </svg>
    </SVGContainer>
  );
}; 