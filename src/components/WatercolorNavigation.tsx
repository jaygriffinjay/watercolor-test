import React from 'react';
import styled from 'styled-components';

interface NavigationItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface WatercolorNavigationProps {
  items: NavigationItem[];
  hue?: number;
  activeHue?: number;
  className?: string;
}

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-block: 2rem;
`;

const StyledBlot = styled.div<{
  $hue: number;
  $activeHue: number;
  $isActive: boolean;
}>`
  padding: 0.5em 0.75em;
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
  isolation: isolate;
  position: relative;
  border-radius: 5px;
  overflow: visible;
  mask-image: linear-gradient(to right, black calc(100% - 5rem), transparent calc(100% - 0.5rem));
  font-family: 'Nunito', sans-serif;
  letter-spacing: 0.05em;
  color: #392b17dd;
  cursor: pointer;
  transition: all 0.25s ease-out;

  &::before {
    content: "";
    inset: 1px;
    position: absolute;
    border-radius: inherit;
    background: rgb(0 0 0 / 100%);
    filter: url(#watercolor2) 
      drop-shadow(0 0em 0em rgba(200, 200, 200, 1)) 
      sepia(1) 
      brightness(1.5) 
      contrast(1) 
      saturate(100%) 
      hue-rotate(${props => props.$isActive ? props.$activeHue : props.$hue}deg);
    translate: -1px -1px;
    opacity: ${props => props.$isActive ? 0.8 : 0};
    box-shadow: 0 0 0px 0px black;
    transition: all 0.25s ease-out;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0.8;
    filter: url(#watercolor2) 
      drop-shadow(0 0em 0em rgba(200, 200, 200, 1)) 
      sepia(1) 
      brightness(1.5) 
      contrast(1) 
      saturate(100%) 
      hue-rotate(${props => props.$hue}deg);
  }
`;

export const WatercolorNavigation: React.FC<WatercolorNavigationProps> = ({
  items,
  hue = 290,
  activeHue = 0,
  className = '',
}) => {
  return (
    <StyledNav className={className}>
      {items.map((item, index) => (
        <StyledBlot
          key={index}
          $hue={hue}
          $activeHue={activeHue}
          $isActive={item.active || false}
          onClick={item.onClick}
        >
          {item.label}
        </StyledBlot>
      ))}
    </StyledNav>
  );
}; 