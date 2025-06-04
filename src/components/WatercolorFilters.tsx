import React from 'react';

interface WatercolorFiltersProps {
  seed1?: number;
  seed2?: number;
  seed3?: number;
  disabled?: boolean;
}

export const WatercolorFilters: React.FC<WatercolorFiltersProps> = ({ 
  seed1 = 1222, 
  seed2 = 11413, 
  seed3 = 1222,
  disabled = false
}) => {
  if (disabled) {
    return (
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {/* Empty filters for testing */}
          <filter id="watercolor">
            <feColorMatrix type="identity" />
          </filter>
          <filter id="watercolor2">
            <feColorMatrix type="identity" />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* Primary watercolor filter - for buttons and cards */}
        <filter id="watercolor">
          <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency=".0125" numOctaves="2" seed={seed1} />
          <feTurbulence result="noise-md" type="fractalNoise" baseFrequency=".12" numOctaves="3" seed={seed2} />
          {/* BaseGraphic w/ chroma variation */}
          <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.45" k4="-.07" />
          {/* 1st layer of paint w/more water */}
          <feMorphology id="water" result="layer-1" in="BaseGraphic" operator="dilate" radius="0.5" />
          <feDisplacementMap result="layer-1" in="layer-1" in2="noise-lg" xChannelSelector="R" yChannelSelector="B" scale="2" />
          <feDisplacementMap result="layer-1" in="layer-1" in2="noise-md" xChannelSelector="R" yChannelSelector="B" scale="3" />
          <feDisplacementMap result="mask" in="layer-1" in2="noise-lg" xChannelSelector="A" yChannelSelector="A" scale="4" />
          <feGaussianBlur result="mask" in="mask" stdDeviation="6" />
          <feComposite result="layer-1" in="layer-1" in2="mask" operator="arithmetic" k1="1" k2=".25" k3="-.25" k4="0" />
          {/* 2nd layer of paint w/more pigment */}
          <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" />
          <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" />
          <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="5" />
          <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" />
          <feComposite result="glow" in="glow" in2="glow-diff" operator="out" />
          <feGaussianBlur result="glow" in="glow" stdDeviation=".5" />
          <feComposite id="color" result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="1.2" k2="0.55" k3=".3" k4="-0.2" />
          {/* merge 'em all */}
          <feComposite result="watercolor" in="layer-1" in2="layer-2" operator="over" />
        </filter>
        
        {/* Secondary watercolor filter - for navigation and dividers */}
        <filter id="watercolor2">
          <feTurbulence result="noise-lg" type="fractalNoise" baseFrequency=".0125" numOctaves="2" seed={seed3} />
          <feTurbulence result="noise-md" type="fractalNoise" baseFrequency=".12" numOctaves="3" seed={seed2} />
          {/* BaseGraphic w/ chroma variation */}
          <feComposite result="BaseGraphic" in="SourceGraphic" in2="noise-lg" operator="arithmetic" k1="0.3" k2="0.35" k4="-.05" />
          <feDisplacementMap result="layer-2" in="BaseGraphic" in2="noise-lg" xChannelSelector="G" yChannelSelector="R" scale="2" />
          <feDisplacementMap result="layer-2" in="layer-2" in2="noise-md" xChannelSelector="A" yChannelSelector="G" scale="3" />
          <feDisplacementMap result="glow" in="BaseGraphic" in2="noise-lg" xChannelSelector="R" yChannelSelector="A" scale="4" />
          <feMorphology result="glow-diff" in="glow" operator="erode" radius="2" />
          <feComposite result="glow" in="glow" in2="glow-diff" operator="out" />
          <feGaussianBlur result="glow" in="glow" stdDeviation="4" />
          <feComposite id="color" result="layer-2" in="layer-2" in2="glow" operator="arithmetic" k1="0.65" k2="1.0" k3="0.4" k4="-0.15" />
        </filter>
      </defs>
    </svg>
  );
}; 