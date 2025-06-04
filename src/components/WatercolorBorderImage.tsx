import React from 'react';
import styled from 'styled-components';

interface WatercolorBorderImageProps {
  borderWidth?: number;
  borderSlice?: number;
  borderImageMode?: 'stretch' | 'repeat' | 'round' | 'space';
  svgPath?: string;
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
}

const BorderContainer = styled.div<{
  borderWidth: number;
  borderSlice: number;
  borderImageMode: string;
  svgPath: string;
  width?: number;
  height?: number;
}>`
  border: ${props => props.borderWidth}px solid transparent;
  border-image: url('${props => props.svgPath}') ${props => props.borderSlice} ${props => props.borderImageMode};
  padding: 1rem;
  display: inline-block;
  ${props => props.width && `width: ${props.width}px;`}
  ${props => props.height && `height: ${props.height}px;`}
  box-sizing: border-box;
`;

export const WatercolorBorderImage: React.FC<WatercolorBorderImageProps> = ({
  borderWidth = 10,
  borderSlice = 33,
  borderImageMode = 'stretch',
  svgPath = '/src/assets/watercolor-border-v2.svg', // Adjust this path to your SVG
  children,
  className,
  width,
  height
}) => {
  return (
    <BorderContainer
      className={className}
      borderWidth={borderWidth}
      borderSlice={borderSlice}
      borderImageMode={borderImageMode}
      svgPath={svgPath}
      width={width}
      height={height}
    >
      {children}
    </BorderContainer>
  );
}; 