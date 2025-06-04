import React, { useState } from 'react';
import styled from 'styled-components';
import { EnhancedWatercolorDivider } from './EnhancedWatercolorDivider';

const PlaygroundContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Nunito', sans-serif;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Kalam', cursive;
  color: #2563eb;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #475569;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const DemoGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ColorButton = styled.button<{ color: string }>`
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
    border-color: #6b7280;
  }
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const WatercolorPlayground: React.FC = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(4);
  const [color, setColor] = useState('#2563eb');
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [animated, setAnimated] = useState(false);
  const [hoverable, setHoverable] = useState(false);
  const [seed, setSeed] = useState(1234);
  
  const colors = [
    '#2563eb', // Blue
    '#7c3aed', // Purple  
    '#059669', // Green
    '#ea580c', // Orange
    '#dc2626', // Red
    '#0891b2', // Cyan
    '#ca8a04', // Yellow
    '#6b7280', // Gray
  ];
  
  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 10000));
  };
  
  return (
    <PlaygroundContainer>
      <h1 style={{ fontFamily: 'Kalam, cursive', textAlign: 'center', marginBottom: '3rem' }}>
        🎨 Watercolor Divider Playground
      </h1>
      
      <Section>
        <SectionTitle>Interactive Controls</SectionTitle>
        <Controls>
          <ControlGroup>
            <Label>Width: {width}px</Label>
            <Input 
              type="range" 
              min="200" 
              max="1000" 
              value={width} 
              onChange={e => setWidth(Number(e.target.value))} 
            />
          </ControlGroup>
          
          <ControlGroup>
            <Label>Height: {height}px</Label>
            <Input 
              type="range" 
              min="2" 
              max="20" 
              value={height} 
              onChange={e => setHeight(Number(e.target.value))} 
            />
          </ControlGroup>
          
          <ControlGroup>
            <Label>Intensity</Label>
            <Select value={intensity} onChange={e => setIntensity(e.target.value as any)}>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </Select>
          </ControlGroup>
          
          <ControlGroup>
            <Label>Seed: {seed}</Label>
            <Button onClick={generateRandomSeed}>Random Pattern</Button>
          </ControlGroup>
          
          <ControlGroup>
            <Label>
              <input 
                type="checkbox" 
                checked={animated} 
                onChange={e => setAnimated(e.target.checked)} 
              /> Animated
            </Label>
            <Label>
              <input 
                type="checkbox" 
                checked={hoverable} 
                onChange={e => setHoverable(e.target.checked)} 
              /> Hoverable
            </Label>
          </ControlGroup>
        </Controls>
        
        <ControlGroup>
          <Label>Color Palette</Label>
          <ColorPalette>
            {colors.map(c => (
              <ColorButton 
                key={c} 
                color={c} 
                onClick={() => setColor(c)}
                style={{ borderColor: c === color ? '#1f2937' : '#e5e7eb' }}
              />
            ))}
          </ColorPalette>
        </ControlGroup>
        
        <EnhancedWatercolorDivider
          width={width}
          height={height}
          color={color}
          intensity={intensity}
          animated={animated}
          hoverable={hoverable}
          seed={seed}
        />
      </Section>
      
      <Section>
        <SectionTitle>Usage Examples</SectionTitle>
        
        <DemoGrid>
          <div>
            <h3>Click to Regenerate</h3>
            <EnhancedWatercolorDivider 
              color="#7c3aed" 
              hoverable 
              intensity="medium"
            />
          </div>
          
          <div>
            <h3>Animated Flow</h3>
            <EnhancedWatercolorDivider 
              color="#059669" 
              animated 
              intensity="heavy"
            />
          </div>
          
          <div>
            <h3>Thick Artistic Line</h3>
            <EnhancedWatercolorDivider 
              height={12} 
              color="#ea580c" 
              intensity="heavy"
            />
          </div>
          
          <div>
            <h3>Subtle Accent</h3>
            <EnhancedWatercolorDivider 
              height={2} 
              color="#6b7280" 
              intensity="light"
            />
          </div>
        </DemoGrid>
      </Section>
      
      <Section>
        <SectionTitle>Code Example</SectionTitle>
        <pre style={{ 
          background: '#f1f5f9', 
          padding: '1rem', 
          borderRadius: '8px', 
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`<EnhancedWatercolorDivider
  width={800}
  height={6}
  color="#7c3aed"
  intensity="medium"
  animated={true}
  hoverable={true}
  onClick={() => console.log('Clicked!')}
/>`}
        </pre>
      </Section>
    </PlaygroundContainer>
  );
}; 