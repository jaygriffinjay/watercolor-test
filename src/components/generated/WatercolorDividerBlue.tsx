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

export const WatercolorDividerBlue: React.FC<{ className?: string }> = ({ className }) => (
  <Container className={className}>
    <div className="light-svg">
      <svg width="800" height="4" viewBox="0 0 800 4" xmlns="http://www.w3.org/2000/svg"> <defs> <filter id="watercolor-divider-1234" x="-20%" y="-50%" width="140%" height="200%"> <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="1234" /> <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="1334" /> <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.7" k4="-0.05" /> <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="1" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="2" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="3" /> <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="4" /> <feGaussianBlur result="mask" in="mask" stdDeviation="4" /> <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" /> <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" /> <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" /> <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="4" /> <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" /> <feComposite result="glow" in="glow" in2="glow-diff" operator="out" /> <feGaussianBlur result="glow" in="glow" stdDeviation="4" /> <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" /> <feComposite result="watercolor-merged" in="layer-1" in2="layer-2" operator="over" /> <feColorMatrix in="watercolor-merged" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 0" result="final" /> </filter> </defs> <rect x="0" y="0" width="800" height="4" rx="2" fill="#2563eb" fill-opacity="0.3" filter="url(#watercolor-divider-1234)" /> </svg>
    </div>
    <div className="dark-svg">
      <svg width="800" height="4" viewBox="0 0 800 4" xmlns="http://www.w3.org/2000/svg"> <defs> <filter id="watercolor-divider-1234" x="-20%" y="-50%" width="140%" height="200%"> <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="1234" /> <feTurbulence result="noise-md" type="fractalNoise" baseFrequency="0.12" numOctaves="3" seed="1334" /> <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.7" k4="-0.05" /> <feMorphology result="layer-1" in="BaseGraphic" operator="dilate" radius="1" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="2" /> <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="3" /> <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="4" /> <feGaussianBlur result="mask" in="mask" stdDeviation="4" /> <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" /> <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" /> <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" /> <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="4" /> <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" /> <feComposite result="glow" in="glow" in2="glow-diff" operator="out" /> <feGaussianBlur result="glow" in="glow" stdDeviation="4" /> <feComposite result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" /> <feComposite result="watercolor-merged" in="layer-1" in2="layer-2" operator="over" /> <feColorMatrix in="watercolor-merged" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 0" result="final" /> </filter> </defs> <rect x="0" y="0" width="800" height="4" rx="2" fill="#60a5fa" fill-opacity="0.3" filter="url(#watercolor-divider-1234)" /> </svg>
    </div>
  </Container>
);
