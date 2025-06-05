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
  position: relative;
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

const ButtonContent = styled.div`
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
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  z-index: 10;
  pointer-events: none;
`;

const watercolorSettings = {
  light: {
    baseFreq: 0.02,
    displacement: 2,
    blur: 3,
    morphRadius: 0.5
  },
  medium: {
    baseFreq: 0.015,
    displacement: 3,
    blur: 4,
    morphRadius: 1
  },
  heavy: {
    baseFreq: 0.01,
    displacement: 4,
    blur: 5,
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
      {/* Primary noise for texture */}
      <feTurbulence result="noise" type="fractalNoise" baseFrequency={settings.baseFreq} numOctaves="3" seed="2" />
      
      {/* Create the base watercolor shape */}
      <feMorphology result="expanded" in="SourceGraphic" operator="dilate" radius={settings.morphRadius} />
      <feDisplacementMap result="displaced" in="expanded" in2="noise" scale={settings.displacement} />
      <feGaussianBlur result="blurred" in="displaced" stdDeviation={settings.blur} />
      
      {/* Add subtle color variation */}
      <feColorMatrix in="blurred" type="matrix" 
        values="1.1 0 0 0 0  0 1.1 0 0 0  0 0 1.1 0 0  0 0 0 1.2 0" 
        result="enhanced" />
      
      {/* Final composite */}
      <feComposite in="enhanced" in2="SourceGraphic" operator="multiply" />
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
          rx={Math.min(width, height) * 0.25} 
          fill={color} 
          fillOpacity="0.3"
          filter={`url(#${filterId})`} 
        />
      </svg>
      <ButtonContent>
        {children}
      </ButtonContent>
    </ButtonContainer>
  );
}; 