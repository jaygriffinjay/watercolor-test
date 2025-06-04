import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: 1rem 0;
  
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
    height: auto;
    display: block;
  }
`;

export const WatercolorDividerGreen: React.FC<{ className?: string }> = ({ className }) => (
  <Container className={className}>
    <div className="light-svg">
      <svg width="800" height="4" viewBox="0 0 800 4" xmlns="http://www.w3.org/2000/svg"> <defs> <filter id="watercolor-divider-1234" x="-50%" y="-100%" width="200%" height="300%"> <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1234" /> <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="1334" /> <feFlood floodColor="#059669" result="solid-color" /> <feComposite result="BaseGraphic" in="solid-color" in2="noise-lg" operator="arithmetic" k1="0.15" k2="0.85" k4="-0.05" /> <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="3" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="6" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="9" /> <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="12" /> <feGaussianBlur result="mask" in="mask" stdDeviation="6" /> <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" /> <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="6" /> <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="9" /> <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="12" /> <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" /> <feComposite result="glow" in="glow" in2="glow-diff" operator="out" /> <feGaussianBlur result="glow" in="glow" stdDeviation="6" /> <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" /> <feComposite result="watercolor-combined" in="layer-1" in2="layer-2" operator="over" /> <feComposite result="final" in="watercolor-combined" in2="SourceGraphic" operator="in" /> </filter> </defs> <rect x="0" y="0" width="800" height="4" rx="2" fill="white" stroke="none" filter="url(#watercolor-divider-1234)" /> </svg>
    </div>
    <div className="dark-svg">
      <svg width="800" height="4" viewBox="0 0 800 4" xmlns="http://www.w3.org/2000/svg"> <defs> <filter id="watercolor-divider-1234" x="-50%" y="-100%" width="200%" height="300%"> <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="1234" /> <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="1334" /> <feFlood floodColor="#34d399" result="solid-color" /> <feComposite result="BaseGraphic" in="solid-color" in2="noise-lg" operator="arithmetic" k1="0.15" k2="0.85" k4="-0.05" /> <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="3" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="6" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="9" /> <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="12" /> <feGaussianBlur result="mask" in="mask" stdDeviation="6" /> <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" /> <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="6" /> <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="9" /> <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="12" /> <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" /> <feComposite result="glow" in="glow" in2="glow-diff" operator="out" /> <feGaussianBlur result="glow" in="glow" stdDeviation="6" /> <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" /> <feComposite result="watercolor-combined" in="layer-1" in2="layer-2" operator="over" /> <feComposite result="final" in="watercolor-combined" in2="SourceGraphic" operator="in" /> </filter> </defs> <rect x="0" y="0" width="800" height="4" rx="2" fill="white" stroke="none" filter="url(#watercolor-divider-1234)" /> </svg>
    </div>
  </Container>
);
