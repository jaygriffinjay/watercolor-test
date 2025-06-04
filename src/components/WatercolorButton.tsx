import React from 'react';
import styled from 'styled-components';

interface WatercolorButtonProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  color?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonContainer = styled.div<{ width: number; height: number }>`
  display: inline-block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ButtonContent = styled.div<{ width: number; height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  z-index: 2;
  pointer-events: none;
`;

const watercolorSettings = {
  light: {
    baseFreq: 0.02,
    displacement1: 1,
    displacement2: 2,
    displacement3: 3,
    blur: 2,
    morphRadius: 0.5
  },
  medium: {
    baseFreq: 0.015,
    displacement1: 2,
    displacement2: 3,
    displacement3: 4,
    blur: 4,
    morphRadius: 1
  },
  heavy: {
    baseFreq: 0.01,
    displacement1: 3,
    displacement2: 4,
    displacement3: 5,
    blur: 6,
    morphRadius: 1.5
  }
};

export const WatercolorButton: React.FC<WatercolorButtonProps> = ({
  children,
  width = 120,
  height = 40,
  color = '#2563eb',
  intensity = 'medium',
  onClick,
  disabled = false
}) => {
  const settings = watercolorSettings[intensity];
  const filterId = `watercolor-button-${Math.random().toString(36).substr(2, 9)}`;
  
  const generateFilter = () => (
    <filter id={filterId} x="-20%" y="-50%" width="140%" height="200%">
      <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency={settings.baseFreq} numOctaves="2" seed="1234" />
      <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="5678" />
      
      <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.7" k4="-0.05" />
      
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
    <ButtonContainer 
      width={width} 
      height={height}
      onClick={disabled ? undefined : onClick}
      style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <svg width={width} height={height} style={{ position: 'absolute' }}>
        <defs>
          {generateFilter()}
        </defs>
        <rect 
          x="2" 
          y="2" 
          width={width - 4} 
          height={height - 4} 
          rx="6" 
          fill={color} 
          fillOpacity="0.3"
          filter={`url(#${filterId})`} 
        />
      </svg>
      <ButtonContent width={width} height={height}>
        {children}
      </ButtonContent>
    </ButtonContainer>
  );
}; 