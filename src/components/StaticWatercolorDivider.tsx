import React from 'react';
import styled from 'styled-components';

interface StaticWatercolorDividerProps {
  thickness?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  opacity?: number;
  className?: string;
}

const StyledStaticDivider = styled.div<{
  $thickness: number;
  $hue: number;
  $saturation: number;
  $brightness: number;
  $opacity: number;
}>`
  height: ${props => props.$thickness}px;
  width: 100%;
  margin: 1rem 0;
  
  /* Use the new purple watercolor image as background */
  background-image: url('/src/assets/purple line watercolor complete.png');
  background-repeat: repeat-x;
  background-size: auto ${props => props.$thickness}px;
  background-position: center;
  
  /* Apply color transformations via CSS filters */
  filter: 
    hue-rotate(${props => props.$hue}deg)
    saturate(${props => props.$saturation}%)
    brightness(${props => props.$brightness});
    
  opacity: ${props => props.$opacity};
  
  /* Slight offset for hand-painted feel */
  transform: translate(-1px, -1px);
`;

export const StaticWatercolorDivider: React.FC<StaticWatercolorDividerProps> = ({
  thickness = 3,
  hue = 0,
  saturation = 100,
  brightness = 1,
  opacity = 0.75,
  className = '',
}) => {
  return (
    <StyledStaticDivider 
      $thickness={thickness}
      $hue={hue}
      $saturation={saturation}
      $brightness={brightness}
      $opacity={opacity}
      className={className}
    />
  );
}; 