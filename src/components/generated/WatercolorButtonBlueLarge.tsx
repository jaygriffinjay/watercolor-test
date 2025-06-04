import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonContainer = styled.div<{ disabled: boolean }>`
  display: inline-block;
  width: 160px;
  height: 50px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: transform 0.2s ease;
  position: relative;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'scale(1.02)'};
  }
  
  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.98)'};
  }
  
  .dark-svg {
    display: none;
  }
  
  /* Dark mode via class */
  .dark-mode & {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  /* Dark mode via media query */
  @media (prefers-color-scheme: dark) {
    .light-svg { display: none; }
    .dark-svg { display: block; }
  }
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
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
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  z-index: 2;
  pointer-events: none;
`;

export const WatercolorButtonBlueLarge: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className }) => (
  <ButtonContainer 
    disabled={disabled}
    onClick={disabled ? undefined : onClick}
    className={className}
  >
    <div className="light-svg">
      <svg width="160" height="50" viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg"> <defs> <filter id="watercolor-button-2000" x="-20%" y="-50%" width="140%" height="200%"> <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="2000" /> <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="2100" /> <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.7" k4="-0.05" /> <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="1" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="2" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="3" /> <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="4" /> <feGaussianBlur result="mask" in="mask" stdDeviation="4" /> <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" /> <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" /> <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" /> <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="4" /> <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" /> <feComposite result="glow" in="glow" in2="glow-diff" operator="out" /> <feGaussianBlur result="glow" in="glow" stdDeviation="4" /> <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" /> <feComposite result="watercolor-merged" in="layer-1" in2="layer-2" operator="over" /> <feColorMatrix in="watercolor-merged" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 0" result="final" /> </filter> </defs> <rect x="0" y="0" width="160" height="50" rx="8" fill="#2563eb" fill-opacity="0.3" filter="url(#watercolor-button-2000)" /> </svg>
    </div>
    <div className="dark-svg">
      <svg width="160" height="50" viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg"> <defs> <filter id="watercolor-button-2000" x="-20%" y="-50%" width="140%" height="200%"> <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="2000" /> <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="2100" /> <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.7" k4="-0.05" /> <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="1" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="2" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="3" /> <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="4" /> <feGaussianBlur result="mask" in="mask" stdDeviation="4" /> <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" /> <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" /> <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" /> <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="4" /> <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" /> <feComposite result="glow" in="glow" in2="glow-diff" operator="out" /> <feGaussianBlur result="glow" in="glow" stdDeviation="4" /> <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" /> <feComposite result="watercolor-merged" in="layer-1" in2="layer-2" operator="over" /> <feColorMatrix in="watercolor-merged" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 0" result="final" /> </filter> </defs> <rect x="0" y="0" width="160" height="50" rx="8" fill="#60a5fa" fill-opacity="0.3" filter="url(#watercolor-button-2000)" /> </svg>
    </div>
    <ButtonContent>
      {children}
    </ButtonContent>
  </ButtonContainer>
);
