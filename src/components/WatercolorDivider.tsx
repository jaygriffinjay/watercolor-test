import React from 'react';
import styled from 'styled-components';

interface WatercolorDividerProps {
  thickness?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
  className?: string;
}

const StyledDivider = styled.hr<{
  $thickness: number;
  $hue: number;
  $saturation: number;
  $brightness: number;
  $contrast: number;
}>`
  display: block;
  height: ${props => props.$thickness}px;
  background: rgb(0 0 0 / 100%);
  width: 100%;
  border-radius: 100vw;
  border: none;
  margin: 1rem 0;
  filter: url(#watercolor2) 
    drop-shadow(0 0em 0em rgba(200, 200, 200, 1)) 
    sepia(1) 
    brightness(${props => props.$brightness}) 
    contrast(${props => props.$contrast}) 
    saturate(${props => props.$saturation}%) 
    hue-rotate(${props => props.$hue}deg);
  translate: -1px -1px;
  opacity: 0.75;
`;

export const WatercolorDivider: React.FC<WatercolorDividerProps> = ({
  thickness = 3,
  hue = 0,
  saturation = 150,
  brightness = 1.25,
  contrast = 1.25,
  className = '',
}) => {
  return (
    <StyledDivider 
      $thickness={thickness}
      $hue={hue}
      $saturation={saturation}
      $brightness={brightness}
      $contrast={contrast}
      className={className}
    />
  );
}; 