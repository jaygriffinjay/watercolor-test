import React from 'react';
import styled from 'styled-components';

interface WatercolorPNGButtonProps {
  pngPath: string;
  width: number;
  height: number;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonContainer = styled.button<{
  pngPath: string;
  width: number;
  height: number;
  disabled?: boolean;
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border: none;
  background: url(${props => props.pngPath}) no-repeat center center;
  background-size: contain;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export const WatercolorPNGButton: React.FC<WatercolorPNGButtonProps> = ({
  pngPath,
  width,
  height,
  children,
  onClick,
  disabled = false
}) => {
  return (
    <ButtonContainer
      pngPath={pngPath}
      width={width}
      height={height}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
}; 