import React from 'react';

interface SimpleWatercolorFilterProps {
  intensity?: 'light' | 'medium' | 'heavy';
  seed?: number;
}

export const SimpleWatercolorFilter: React.FC<SimpleWatercolorFilterProps> = ({ 
  intensity = 'medium',
  seed = 1234
}) => {
  const settings = {
    light: { 
      baseFreq: 0.02, 
      displace: 1, 
      blur: 2,
      k1: 0.2, 
      k2: 0.8 
    },
    medium: { 
      baseFreq: 0.015, 
      displace: 3, 
      blur: 4,
      k1: 0.3, 
      k2: 0.7 
    },
    heavy: { 
      baseFreq: 0.01, 
      displace: 6, 
      blur: 8,
      k1: 0.5, 
      k2: 0.6 
    }
  };

  const config = settings[intensity];

  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id="simple-watercolor">
          {/* Step 1: Create organic noise */}
          <feTurbulence 
            result="noise" 
            type="fractalNoise" 
            baseFrequency={config.baseFreq} 
            numOctaves="3" 
            seed={seed} 
          />
          
          {/* Step 2: Mix original with noise for texture */}
          <feComposite 
            result="textured" 
            in="SourceGraphic" 
            in2="noise" 
            operator="arithmetic" 
            k1={config.k1} 
            k2={config.k2} 
            k3="0" 
            k4="0" 
          />
          
          {/* Step 3: Warp the edges */}
          <feDisplacementMap 
            result="warped" 
            in="textured" 
            in2="noise" 
            scale={config.displace} 
          />
          
          {/* Step 4: Soften with blur */}
          <feGaussianBlur 
            result="final" 
            in="warped" 
            stdDeviation={config.blur} 
          />
        </filter>
      </defs>
    </svg>
  );
}; 