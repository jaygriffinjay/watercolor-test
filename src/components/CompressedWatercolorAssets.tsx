import React from 'react';
import styled from 'styled-components';

// Horizontal Divider Components
const HorizontalDivider = styled.div<{ scale: number }>`
  width: ${props => 800 * props.scale}px;
  height: ${props => 4 * props.scale}px;
  background: url('/src/assets/compressed/watercolor-button-800x4-2563eb-${props => props.scale}x-compressed.png') no-repeat;
  background-size: contain;
  margin: 1rem auto;
`;

// Square Button Components  
const SquareButton = styled.button<{ scale: number }>`
  width: ${props => 100 * props.scale}px;
  height: ${props => 100 * props.scale}px;
  border: none;
  background: url('/src/assets/compressed/watercolor-button-100x100-2563eb-${props => props.scale}x-compressed.png') no-repeat center center;
  background-size: contain;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

// New Square Button Components (variant 2)
const SquareButtonV2 = styled.button<{ scale: number }>`
  width: ${props => 100 * props.scale}px;
  height: ${props => 100 * props.scale}px;
  border: none;
  background: url('/src/assets/compressed/watercolor-button-100x100-2563eb-${props => props.scale}x-compressed (1).png') no-repeat center center;
  background-size: contain;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

// Small Button Components (30x30 base)
const SmallButton = styled.button<{ scale: number }>`
  width: ${props => 30 * props.scale}px;
  height: ${props => 30 * props.scale}px;
  border: none;
  background: url('/src/assets/compressed/watercolor-button-30x30-2563eb-${props => props.scale}x-compressed.png') no-repeat center center;
  background-size: contain;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: ${props => Math.max(10, 12 * props.scale)}px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const DemoSection = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
`;

const ScaleLabel = styled.h4`
  margin: 1rem 0 0.5rem 0;
  color: #374151;
  font-family: 'Nunito', sans-serif;
`;

const ButtonGrid = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

interface CompressedAssetsProps {
  onClick?: (assetType: string, scale: number) => void;
}

export const CompressedWatercolorAssets: React.FC<CompressedAssetsProps> = ({
  onClick = () => {}
}) => {
  return (
    <div>
      <h3 style={{ fontFamily: 'Kalam, cursive', color: '#2563eb', marginBottom: '1rem' }}>
        🎨 Compressed Watercolor Assets
      </h3>
      
      {/* Horizontal Dividers */}
      <DemoSection>
        <h4 style={{ marginTop: 0, color: '#374151' }}>Horizontal Dividers (800×4 base)</h4>
        
        <ScaleLabel>1× Scale (800×4px)</ScaleLabel>
        <HorizontalDivider scale={1} />
        
        <ScaleLabel>2× Scale (1600×8px)</ScaleLabel>
        <HorizontalDivider scale={2} />
        
        <ScaleLabel>3× Scale (2400×12px)</ScaleLabel>
        <HorizontalDivider scale={3} />
        
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '1rem' }}>
          Perfect for section dividers, decorative lines, and visual breaks in your content.
        </p>
      </DemoSection>

      {/* Small Buttons */}
      <DemoSection>
        <h4 style={{ marginTop: 0, color: '#374151' }}>Small Buttons (30×30 base)</h4>
        
        <ScaleLabel>1× Scale (30×30px)</ScaleLabel>
        <ButtonGrid>
          <SmallButton 
            scale={1} 
            onClick={() => onClick('small-button', 1)}
          >
            ⚡
          </SmallButton>
          <SmallButton 
            scale={1} 
            onClick={() => onClick('small-button', 1)}
          >
            🔥
          </SmallButton>
          <SmallButton 
            scale={1} 
            onClick={() => onClick('small-button', 1)}
          >
            💎
          </SmallButton>
          <SmallButton 
            scale={1} 
            onClick={() => onClick('small-button', 1)}
          >
            ✨
          </SmallButton>
          <SmallButton 
            scale={1} 
            onClick={() => onClick('small-button', 1)}
          >
            🎯
          </SmallButton>
        </ButtonGrid>
        
        <ScaleLabel>2× Scale (60×60px)</ScaleLabel>
        <ButtonGrid>
          <SmallButton 
            scale={2} 
            onClick={() => onClick('small-button', 2)}
          >
            Go
          </SmallButton>
          <SmallButton 
            scale={2} 
            onClick={() => onClick('small-button', 2)}
          >
            OK
          </SmallButton>
          <SmallButton 
            scale={2} 
            onClick={() => onClick('small-button', 2)}
          >
            🚀
          </SmallButton>
          <SmallButton 
            scale={2} 
            onClick={() => onClick('small-button', 2)}
          >
            ❤️
          </SmallButton>
        </ButtonGrid>
        
        <ScaleLabel>3× Scale (90×90px)</ScaleLabel>
        <ButtonGrid>
          <SmallButton 
            scale={3} 
            onClick={() => onClick('small-button', 3)}
          >
            Save
          </SmallButton>
          <SmallButton 
            scale={3} 
            onClick={() => onClick('small-button', 3)}
          >
            Done
          </SmallButton>
          <SmallButton 
            scale={3} 
            onClick={() => onClick('small-button', 3)}
          >
            🎨
          </SmallButton>
        </ButtonGrid>
        
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '1rem' }}>
          Perfect for icons, action buttons, navigation elements, and compact UI components.
        </p>
      </DemoSection>

      {/* Square Buttons */}
      <DemoSection>
        <h4 style={{ marginTop: 0, color: '#374151' }}>Square Buttons (100×100 base)</h4>
        
        <ScaleLabel>1× Scale (100×100px)</ScaleLabel>
        <ButtonGrid>
          <SquareButton 
            scale={1} 
            onClick={() => onClick('square-button', 1)}
          >
            🎨
          </SquareButton>
          <SquareButton 
            scale={1} 
            onClick={() => onClick('square-button', 1)}
          >
            ⭐
          </SquareButton>
          <SquareButton 
            scale={1} 
            onClick={() => onClick('square-button', 1)}
          >
            💫
          </SquareButton>
        </ButtonGrid>
        
        <ScaleLabel>2× Scale (200×200px)</ScaleLabel>
        <ButtonGrid>
          <SquareButton 
            scale={2} 
            onClick={() => onClick('square-button', 2)}
          >
            Click Me
          </SquareButton>
          <SquareButton 
            scale={2} 
            onClick={() => onClick('square-button', 2)}
          >
            🚀
          </SquareButton>
        </ButtonGrid>
        
        <ScaleLabel>3× Scale (300×300px)</ScaleLabel>
        <ButtonGrid>
          <SquareButton 
            scale={3} 
            onClick={() => onClick('square-button', 3)}
          >
            Large Button
          </SquareButton>
        </ButtonGrid>
        
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '1rem' }}>
          High-quality watercolor buttons with perfect scaling from ultra-high-resolution source assets.
        </p>
      </DemoSection>

      {/* New Square Buttons (Variant 2) */}
      <DemoSection>
        <h4 style={{ marginTop: 0, color: '#374151' }}>Square Buttons - Version 2 (100×100 base)</h4>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1rem' }}>
          Different watercolor pattern variation - same size, unique organic texture!
        </p>
        
        <ScaleLabel>1× Scale (100×100px)</ScaleLabel>
        <ButtonGrid>
          <SquareButtonV2 
            scale={1} 
            onClick={() => onClick('square-button-v2', 1)}
          >
            🌟
          </SquareButtonV2>
          <SquareButtonV2 
            scale={1} 
            onClick={() => onClick('square-button-v2', 1)}
          >
            ⚡
          </SquareButtonV2>
          <SquareButtonV2 
            scale={1} 
            onClick={() => onClick('square-button-v2', 1)}
          >
            🔥
          </SquareButtonV2>
        </ButtonGrid>
        
        <ScaleLabel>2× Scale (200×200px)</ScaleLabel>
        <ButtonGrid>
          <SquareButtonV2 
            scale={2} 
            onClick={() => onClick('square-button-v2', 2)}
          >
            New Look
          </SquareButtonV2>
          <SquareButtonV2 
            scale={2} 
            onClick={() => onClick('square-button-v2', 2)}
          >
            🎨
          </SquareButtonV2>
        </ButtonGrid>
        
        <ScaleLabel>3× Scale (300×300px)</ScaleLabel>
        <ButtonGrid>
          <SquareButtonV2 
            scale={3} 
            onClick={() => onClick('square-button-v2', 3)}
          >
            Version 2
          </SquareButtonV2>
        </ButtonGrid>
        
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '1rem' }}>
          Same workflow, different watercolor seed - shows the organic variation possible with this system!
        </p>
      </DemoSection>
    </div>
  );
}; 