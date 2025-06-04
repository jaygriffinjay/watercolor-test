import React from 'react';
import styled from 'styled-components';
import { EnhancedWatercolorDivider } from './EnhancedWatercolorDivider';

interface WatercolorBorderProps {
  width: number;
  height: number;
  borderThickness?: number;
  color?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  animated?: boolean;
  children: React.ReactNode;
  className?: string;
}

const BorderWrapper = styled.div<{ width: number; height: number; borderThickness: number }>`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: inline-block;
  overflow: hidden;
`;

const BorderEdge = styled.div<{ 
  width: number; 
  height: number; 
  x: number; 
  y: number; 
}>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  pointer-events: none;
  z-index: 2; /* Above the content */
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Below the borders */
`;

export const WatercolorBorder: React.FC<WatercolorBorderProps> = ({
  width,
  height,
  borderThickness = 2,
  color = '#2563eb',
  intensity = 'medium',
  animated = false,
  children,
  className
}) => {
  // Calculate border dimensions and positions with overlap
  const overlap = borderThickness * 0.3; // Borders overlap content by 30% of border thickness
  
  // Position borders to overlap inward from the edges
  
  const topBorder = {
    width: width,
    height: borderThickness,
    x: 0,
    y: -borderThickness * 3
  };
  
  const bottomBorder = {
    width: width,
    height: borderThickness,
    x: 0,
    y: height - borderThickness * 3
  };
  
  const leftBorder = {
    width: borderThickness,
    height: height,
    x: 0,
    y: -borderThickness * 3
  };
  
  const rightBorder = {
    width: borderThickness,
    height: height,
    x: width - borderThickness,
    y: -borderThickness * 3
  };
  
  return (
    <BorderWrapper 
      className={className}
      width={width} 
      height={height} 
      borderThickness={borderThickness}
    >
      {/* Top Border */}
      <BorderEdge 
        width={topBorder.width} 
        height={topBorder.height}
        x={topBorder.x} 
        y={topBorder.y}
      >
        <EnhancedWatercolorDivider
          width={topBorder.width}
          height={topBorder.height}
          color={color}
          intensity={intensity}
          animated={animated}
          seed={1000}
        />
      </BorderEdge>
      
      {/* Bottom Border */}
      <BorderEdge 
        width={bottomBorder.width} 
        height={bottomBorder.height}
        x={bottomBorder.x} 
        y={bottomBorder.y}
      >
        <EnhancedWatercolorDivider
          width={bottomBorder.width}
          height={bottomBorder.height}
          color={color}
          intensity={intensity}
          animated={animated}
          seed={2000}
        />
      </BorderEdge>
      
      {/* Left Border */}
      <BorderEdge 
        width={leftBorder.width} 
        height={leftBorder.height}
        x={leftBorder.x} 
        y={leftBorder.y}
      >
        <EnhancedWatercolorDivider
          width={leftBorder.width}
          height={leftBorder.height}
          color={color}
          intensity={intensity}
          animated={animated}
          seed={3000}
        />
      </BorderEdge>
      
      {/* Right Border */}
      <BorderEdge 
        width={rightBorder.width} 
        height={rightBorder.height}
        x={rightBorder.x} 
        y={rightBorder.y}
      >
        <EnhancedWatercolorDivider
          width={rightBorder.width}
          height={rightBorder.height}
          color={color}
          intensity={intensity}
          animated={animated}
          seed={4000}
        />
      </BorderEdge>
      
      {/* Content */}
      <Content>
        {children}
      </Content>
    </BorderWrapper>
  );
}; 