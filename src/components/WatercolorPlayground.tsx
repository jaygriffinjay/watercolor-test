import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { EnhancedWatercolorDivider } from './EnhancedWatercolorDivider';
import { WatercolorBorder } from './WatercolorBorder';
import { WatercolorBorderImage } from './WatercolorBorderImage';
import { WatercolorButton } from './WatercolorButton';
import { WatercolorPNGButton } from './WatercolorPNGButton';
import { CompressedWatercolorAssets } from './CompressedWatercolorAssets';
import { rasterizeSVG, downloadPNG } from '../utils/rasterizeSVG';
import { 
  WatercolorButtonBlueSmall,
  WatercolorButtonBlueMedium,
  WatercolorButtonBlueLarge,
  WatercolorButtonPurpleSmall,
  WatercolorButtonPurpleMedium,
  WatercolorButtonGreenMedium
} from './generated';

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

const ExportButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #059669;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  
  &:hover {
    background: #047857;
  }
`;

const ExportSection = styled.div`
  background: #f0fdf4;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #bbf7d0;
`;

export const WatercolorPlayground: React.FC = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(4);
  const [color, setColor] = useState('#2563eb');
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [animated, setAnimated] = useState(false);
  const [hoverable, setHoverable] = useState(false);
  const [seed, setSeed] = useState(1234);
  const [borderFrame, setBorderFrame] = useState(false);
  const [pngScale, setPngScale] = useState(6);
  
  const svgRef = useRef<HTMLDivElement>(null);
  
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
  
  const exportSVG = () => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = svgElement.outerHTML;
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `watercolor-${width}x${height}-${color.slice(1)}-${intensity}-seed${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }
  };
  
  const rasterizeButton = async () => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg');
      if (svgElement) {
        try {
          const svgString = svgElement.outerHTML;
          const dataURL = await rasterizeSVG(svgString, width, height, pngScale);
          downloadPNG(dataURL, `watercolor-button-${width}x${height}-${color.slice(1)}-${pngScale}x.png`);
        } catch (error) {
          console.error('Rasterization failed:', error);
          alert('Failed to rasterize SVG. Check console for details.');
        }
      }
    }
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
              min="1" 
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
              max="200" 
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
            <Label>PNG Scale: {pngScale}x</Label>
            <Input 
              type="range" 
              min="2" 
              max="10" 
              value={pngScale} 
              onChange={e => setPngScale(Number(e.target.value))} 
            />
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
            <Label>
              <input 
                type="checkbox" 
                checked={borderFrame} 
                onChange={e => setBorderFrame(e.target.checked)} 
              /> Border Frame Mode
            </Label>
          </ControlGroup>
          
          <div>
            <button onClick={exportSVG}>
              Export SVG
            </button>
            
            <button onClick={rasterizeButton}>
              Rasterize PNG
            </button>
          </div>
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
        
        <div ref={svgRef}>
          <EnhancedWatercolorDivider
            width={width}
            height={height}
            color={color}
            intensity={intensity}
            animated={animated}
            hoverable={hoverable}
            seed={seed}
            borderFrame={borderFrame}
          />
        </div>
        
        <ExportSection>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#065f46' }}>🔽 Export Current Design</h4>
          <p style={{ margin: '0 0 1rem 0', fontSize: '14px', color: '#047857' }}>
            Download the current watercolor design as SVG or high-resolution PNG for use in your projects.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ExportButton onClick={exportSVG}>
              📄 Download SVG ({width}×{height})
            </ExportButton>
            <ExportButton onClick={rasterizeButton} style={{ background: '#7c3aed' }}>
              🖼️ Download PNG ({width * pngScale}×{height * pngScale})
            </ExportButton>
          </div>
        </ExportSection>
      </Section>
      
      <Section>
        <SectionTitle>Watercolor Borders (New!)</SectionTitle>
        
        <DemoGrid>
          <div>
            <h3>Simple Button Border</h3>
            <WatercolorBorder 
              width={120} 
              height={40}
              borderThickness={3}
              color="#7c3aed"
              intensity="medium"
            >
              <button style={{
                width: '100%',
                height: '100%',
                background: '#f8fafc',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Click Me
              </button>
            </WatercolorBorder>
          </div>
          
          <div>
            <h3>Animated Border Card</h3>
            <WatercolorBorder 
              width={200} 
              height={100}
              borderThickness={2}
              color="#059669"
              intensity="heavy"
              animated={true}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: '#ffffff',
                padding: '1rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif'
              }}>
                Card Content
              </div>
            </WatercolorBorder>
          </div>
          
          <div>
            <h3>Thick Orange Border</h3>
            <WatercolorBorder 
              width={80} 
              height={80}
              borderThickness={6}
              color="#ea580c"
              intensity="heavy"
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: '#fef3c7',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Kalam, cursive',
                fontSize: '24px'
              }}>
                🎨
              </div>
            </WatercolorBorder>
          </div>
          
          <div>
            <h3>Thin Accent Border</h3>
            <WatercolorBorder 
              width={160} 
              height={30}
              borderThickness={1}
              color="#0891b2"
              intensity="light"
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: '#f0f9ff',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '12px',
                color: '#0369a1'
              }}>
                Subtle Border
              </div>
            </WatercolorBorder>
          </div>
        </DemoGrid>
      </Section>
      
      <Section>
        <SectionTitle>CSS Border-Image (Experimental!)</SectionTitle>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Testing watercolor borders using CSS border-image with exported SVG assets.
        </p>
        
        <DemoGrid>
          <div>
            <h3>Stretch Mode</h3>
            <WatercolorBorderImage
              borderWidth={15}
              borderSlice={33}
              borderImageMode="stretch"
              svgPath="/src/assets/watercolor-border-v2.svg"
              width={150}
              height={100}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif',
                height: '100%'
              }}>
                Stretch Border
              </div>
            </WatercolorBorderImage>
          </div>
          
          <div>
            <h3>Repeat Mode</h3>
            <WatercolorBorderImage
              borderWidth={12}
              borderSlice={25}
              borderImageMode="repeat"
              svgPath="/src/assets/watercolor-border-v2.svg"
              width={180}
              height={80}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif',
                height: '100%'
              }}>
                Repeat Border
              </div>
            </WatercolorBorderImage>
          </div>
          
          <div>
            <h3>Round Mode</h3>
            <WatercolorBorderImage
              borderWidth={20}
              borderSlice={40}
              borderImageMode="round"
              svgPath="/src/assets/watercolor-border-v2.svg"
              width={120}
              height={120}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Kalam, cursive',
                fontSize: '18px',
                height: '100%'
              }}>
                🎨
              </div>
            </WatercolorBorderImage>
          </div>
          
          <div>
            <h3>Thick Border</h3>
            <WatercolorBorderImage
              borderWidth={25}
              borderSlice={50}
              borderImageMode="stretch"
              svgPath="/src/assets/watercolor-border-v2.svg"
              width={100}
              height={60}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '12px',
                height: '100%'
              }}>
                Thick
              </div>
            </WatercolorBorderImage>
          </div>
        </DemoGrid>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef3c7', borderRadius: '6px' }}>
          <strong>Note:</strong> Update the <code>svgPath</code> prop to match your exported SVG filename. 
          Try different <code>borderSlice</code> values (10-50) to see how the border gets divided!
        </div>
      </Section>
      
      <Section>
        <SectionTitle>Watercolor Borders (New!)</SectionTitle>
        
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
      
      <Section>
        <SectionTitle>🖼️ PNG Button (Using Rasterized Assets)</SectionTitle>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Buttons using pre-rasterized PNG files. Perfect for when you want consistent, high-quality watercolor buttons without any runtime rendering!
        </p>
        
        <DemoGrid>
          <div>
            <h3>Your Exported Button</h3>
            <WatercolorPNGButton
              pngPath="/src/assets/watercolor-button-50x50-2563eb-rasterized.png"
              width={50}
              height={50}
              onClick={() => alert('PNG Button clicked!')}
            >
              🎨
            </WatercolorPNGButton>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
              Using: watercolor-button-50x50-2563eb-rasterized.png
            </p>
          </div>
          
          <div>
            <h3>Scaled Up Version</h3>
            <WatercolorPNGButton
              pngPath="/src/assets/watercolor-button-50x50-2563eb-rasterized.png"
              width={100}
              height={100}
              onClick={() => alert('Scaled PNG Button!')}
            >
              Click Me
            </WatercolorPNGButton>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
              Same PNG, scaled to 100x100
            </p>
          </div>
          
          <div>
            <h3>Disabled State</h3>
            <WatercolorPNGButton
              pngPath="/src/assets/watercolor-button-50x50-2563eb-rasterized.png"
              width={80}
              height={40}
              disabled={true}
            >
              Disabled
            </WatercolorPNGButton>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '0.5rem' }}>
              Disabled button state
            </p>
          </div>
        </DemoGrid>
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#ecfdf5', borderRadius: '6px' }}>
          <strong>💡 Pro Tip:</strong> Export multiple sizes and colors as PNGs, then use them throughout your app for zero-runtime cost!
          <br />
          <code style={{ background: '#d1fae5', padding: '2px 4px', borderRadius: '2px', fontSize: '12px' }}>
            &lt;WatercolorPNGButton pngPath="/assets/button.png" width=&#123;120&#125; height=&#123;40&#125;&gt;
          </code>
        </div>
      </Section>
      
      <Section>
        <SectionTitle>⚡ Ultra-High Quality Compressed Assets</SectionTitle>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          These assets were exported at 10× resolution and compressed using Sharp for perfect quality at multiple scales.
        </p>
        
        <CompressedWatercolorAssets 
          onClick={(assetType, scale) => 
            console.log(`Clicked ${assetType} at ${scale}× scale`)
          }
        />
        
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef3c7', borderRadius: '6px' }}>
          <strong>🎯 Workflow:</strong> Export at 10× → Compress with Sharp → Perfect quality at any scale!
          <br />
          <code style={{ background: '#fcd34d', padding: '2px 4px', borderRadius: '2px', fontSize: '12px' }}>
            npm run compress:png
          </code>
        </div>
      </Section>
    </PlaygroundContainer>
  );
};