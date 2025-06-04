import React from 'react';
import styled from 'styled-components';

interface SimpleWatercolorCardProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  backgroundColor?: string;
  hue?: number;
  className?: string;
}

const CardContainer = styled.div<{
  $intensity: string;
  $backgroundColor: string;
  $hue: number;
}>`
  position: relative;
  padding: 1.5rem;
  border-radius: 12px;
  isolation: isolate;
  color: #333;
  
  /* Base styles that work without filters */
  background: ${props => props.$backgroundColor};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* Watercolor effect overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${props => props.$backgroundColor};
    
    /* Apply the watercolor filter */
    filter: url(#simple-watercolor) 
            hue-rotate(${props => props.$hue}deg)
            brightness(1.1)
            contrast(1.05);
    
    /* Subtle shadow for depth */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    /* Behind the content */
    z-index: -1;
    
    /* Slight offset for hand-painted feel */
    transform: translate(-1px, -1px);
    
    /* Opacity based on intensity */
    opacity: ${props => 
      props.$intensity === 'light' ? 0.7 :
      props.$intensity === 'medium' ? 0.8 : 0.9
    };
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-family: 'Kalam', cursive;
    font-size: 1.4rem;
    color: #2d2d2d;
  }
  
  p {
    margin: 0;
    font-family: 'Nunito', sans-serif;
    color: #555;
    line-height: 1.5;
  }
`;

export const SimpleWatercolorCard: React.FC<SimpleWatercolorCardProps> = ({
  children,
  intensity = 'medium',
  backgroundColor = '#f8f9fa',
  hue = 0,
  className = ''
}) => {
  return (
    <CardContainer
      $intensity={intensity}
      $backgroundColor={backgroundColor}
      $hue={hue}
      className={className}
    >
      <Content>
        {children}
      </Content>
    </CardContainer>
  );
}; 