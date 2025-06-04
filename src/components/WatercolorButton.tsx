import React from 'react';
import styled from 'styled-components';

interface WatercolorButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  hue?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
  shadowDepth?: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const StyledButton = styled.button<{
  $hue: number;
  $saturation: number;
  $brightness?: number;
  $contrast?: number;
  $shadowDepth: number;
  $variant: 'primary' | 'secondary';
}>`
  font-size: 1.25rem;
  position: relative;
  color: white;
  isolation: isolate;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  text-shadow: 0 1px 5px rgb(0 0 0 / 33%);
  background: transparent;
  opacity: 1 !important;
  padding: 0.75em 2em;
  border-radius: ${props => props.$variant === 'secondary' ? '100vw' : '10px'};
  mix-blend-mode: multiply;
  font-family: 'Nunito', sans-serif;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.25s ease-out;

  ${props => props.$variant === 'primary' && `
    --bri: 0.4;
    color: white;
  `}

  ${props => props.$variant === 'secondary' && `
    --sat: 170%;
    --bri: 1.6;
    --con: 2;
    color: #392b17;
  `}

  &:active {
    translate: 0px calc(${props => props.$shadowDepth}px / 2);
  }

  &::before {
    content: "";
    inset: 0;
    position: absolute;
    border-radius: inherit;
    background: rgb(0 0 0 / 100%);
    filter: url(#watercolor) 
      drop-shadow(0 0em 0em rgba(255, 255, 255, 1)) 
      sepia(1) 
      brightness(${props => props.$brightness || (props.$variant === 'primary' ? 0.4 : 1.6)}) 
      contrast(${props => props.$contrast || (props.$variant === 'secondary' ? 2 : 0.75)}) 
      saturate(${props => props.$variant === 'secondary' ? 170 : props.$saturation}%) 
      hue-rotate(${props => props.$hue}deg) 
      drop-shadow(0 ${props => props.$shadowDepth}px 0.25px rgba(0, 0, 0, 0.25));
    translate: -1px -1px;
    opacity: 0.9;
    box-shadow: 0 0 0px 0px black;
    transition: all 0.25s ease-out;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    box-shadow: 0 0 0px 2px black;
  }

  &:active::before {
    filter: url(#watercolor) 
      drop-shadow(0 0em 0em rgba(255, 255, 255, 1)) 
      sepia(1) 
      brightness(${props => props.$brightness || (props.$variant === 'primary' ? 0.4 : 1.6)}) 
      contrast(${props => props.$contrast || (props.$variant === 'secondary' ? 2 : 0.75)}) 
      saturate(${props => props.$variant === 'secondary' ? 170 : props.$saturation}%) 
      hue-rotate(${props => props.$hue}deg) 
      drop-shadow(0 2px 0.25px rgba(0, 0, 0, 0.25));
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:disabled:hover::before {
    opacity: 0.9;
    box-shadow: 0 0 0px 0px black;
  }
`;

export const WatercolorButton: React.FC<WatercolorButtonProps> = ({
  children,
  variant = 'primary',
  hue = 0,
  saturation = 100,
  brightness,
  contrast,
  shadowDepth = 4,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <StyledButton
      $hue={hue}
      $saturation={saturation}
      $brightness={brightness}
      $contrast={contrast}
      $shadowDepth={shadowDepth}
      $variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}; 