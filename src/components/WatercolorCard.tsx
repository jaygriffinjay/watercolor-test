import React from 'react';
import styled from 'styled-components';

interface WatercolorCardProps {
  title: string | number;
  description: string;
  variant?: 'blue' | 'cyan' | 'green' | 'yellow' | 'custom';
  hue?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
  className?: string;
}

const variantStyles = {
  blue: { hue: 240, saturation: 130, brightness: 1.4, contrast: 1.7 },
  cyan: { hue: 190, saturation: 400, brightness: 1.4, contrast: 1.9 },
  green: { hue: 150, saturation: 180, brightness: 1.4, contrast: 2 },
  yellow: { hue: 90, saturation: 110, brightness: 1.4, contrast: 1.9 },
  custom: { hue: 240, saturation: 130, brightness: 1.4, contrast: 1.7 },
};

const StyledCard = styled.div<{
  $hue: number;
  $saturation: number;
  $brightness: number;
  $contrast: number;
}>`
  position: relative;
  display: flex;
  isolation: isolate;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em 2em;
  color: #392b17cc;
  font-size: 1.33rem;
  border-radius: 20px;
  mix-blend-mode: multiply;
  font-family: 'Nunito', sans-serif;
  letter-spacing: 0.05em;

  &::before {
    content: "";
    inset: 0;
    position: absolute;
    border-radius: inherit;
    background: rgb(0 0 0 / 100%);
    filter: url(#watercolor) 
      drop-shadow(0 0em 0em rgba(255, 255, 255, 1)) 
      sepia(1) 
      brightness(${props => props.$brightness}) 
      contrast(${props => props.$contrast}) 
      saturate(${props => props.$saturation}%) 
      hue-rotate(${props => props.$hue}deg);
    translate: -1px -1px;
    opacity: 0.9;
    box-shadow: 0 0 0px 0px black;
    transition: all 0.25s ease-out;
    z-index: -1;
  }

  h2 {
    text-transform: uppercase;
    font-size: 3rem;
    font-family: 'Kalam', cursive;
    font-weight: 700;
    font-style: normal;
    margin: 0;
    text-shadow: inherit;
    color: inherit;
  }

  p {
    margin: 0;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.05em;
    color: #392b17dd;
  }
`;

export const WatercolorCard: React.FC<WatercolorCardProps> = ({
  title,
  description,
  variant = 'blue',
  hue,
  saturation,
  brightness,
  contrast,
  className = '',
}) => {
  const variantStyle = variantStyles[variant];
  
  return (
    <StyledCard
      $hue={hue ?? variantStyle.hue}
      $saturation={saturation ?? variantStyle.saturation}
      $brightness={brightness ?? variantStyle.brightness}
      $contrast={contrast ?? variantStyle.contrast}
      className={className}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </StyledCard>
  );
}; 