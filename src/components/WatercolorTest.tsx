import React from 'react';
import styled from 'styled-components';
import { WatercolorButton } from './WatercolorButton';

const TestContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  min-height: 100vh;
  font-family: 'Nunito', sans-serif;
`;

const Section = styled.div`
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #1e40af;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: center;
`;

const ButtonDemo = styled.div`
  padding: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 0.9rem;
    text-align: center;
  }
  
  p {
    margin: 0.5rem 0 0 0;
    font-size: 0.8rem;
    color: #6b7280;
    text-align: center;
  }
`;

export const WatercolorTest: React.FC = () => {
  return (
    <TestContainer>
      <h1 style={{ color: '#1e40af', textAlign: 'center', marginBottom: '2rem' }}>
        🎨 Simplified Watercolor Buttons Test
      </h1>
      
      <Section>
        <SectionTitle>📏 Different Sizes</SectionTitle>
        <ButtonGrid>
          <ButtonDemo>
            <h4>Small Button</h4>
            <WatercolorButton 
              width={80} 
              height={32} 
              color="#3b82f6"
              onClick={() => alert('Small button clicked!')}
            >
              Small
            </WatercolorButton>
            <p>80×32px</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Medium Button</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#3b82f6"
              onClick={() => alert('Medium button clicked!')}
            >
              Medium
            </WatercolorButton>
            <p>120×40px</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Large Button</h4>
            <WatercolorButton 
              width={160} 
              height={50} 
              color="#3b82f6"
              onClick={() => alert('Large button clicked!')}
            >
              Large Button
            </WatercolorButton>
            <p>160×50px</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Square Button</h4>
            <WatercolorButton 
              width={60} 
              height={60} 
              color="#3b82f6"
              onClick={() => alert('Square button clicked!')}
            >
              🎨
            </WatercolorButton>
            <p>60×60px</p>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>🎨 Different Colors</SectionTitle>
        <ButtonGrid>
          <ButtonDemo>
            <h4>Blue</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#3b82f6"
              onClick={() => alert('Blue clicked!')}
            >
              Blue
            </WatercolorButton>
            <p>#3b82f6</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Purple</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#8b5cf6"
              onClick={() => alert('Purple clicked!')}
            >
              Purple
            </WatercolorButton>
            <p>#8b5cf6</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Green</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#10b981"
              onClick={() => alert('Green clicked!')}
            >
              Green
            </WatercolorButton>
            <p>#10b981</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Orange</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#f59e0b"
              onClick={() => alert('Orange clicked!')}
            >
              Orange
            </WatercolorButton>
            <p>#f59e0b</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Pink</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#ec4899"
              onClick={() => alert('Pink clicked!')}
            >
              Pink
            </WatercolorButton>
            <p>#ec4899</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Dark</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#374151"
              onClick={() => alert('Dark clicked!')}
            >
              Dark
            </WatercolorButton>
            <p>#374151</p>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>⚡ Different Intensities</SectionTitle>
        <ButtonGrid>
          <ButtonDemo>
            <h4>Light Watercolor</h4>
            <WatercolorButton 
              width={140} 
              height={40} 
              color="#8b5cf6"
              intensity="light"
              onClick={() => alert('Light intensity!')}
            >
              Light Effect
            </WatercolorButton>
            <p>Subtle, minimal distortion</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Medium Watercolor</h4>
            <WatercolorButton 
              width={140} 
              height={40} 
              color="#8b5cf6"
              intensity="medium"
              onClick={() => alert('Medium intensity!')}
            >
              Medium Effect
            </WatercolorButton>
            <p>Balanced watercolor feel</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Heavy Watercolor</h4>
            <WatercolorButton 
              width={140} 
              height={40} 
              color="#8b5cf6"
              intensity="heavy"
              onClick={() => alert('Heavy intensity!')}
            >
              Heavy Effect
            </WatercolorButton>
            <p>Strong, artistic distortion</p>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>🔧 Interactive States</SectionTitle>
        <ButtonGrid>
          <ButtonDemo>
            <h4>Normal State</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#3b82f6"
              onClick={() => alert('Normal button!')}
            >
              Click Me
            </WatercolorButton>
            <p>Hover & click effects</p>
          </ButtonDemo>
          
          <ButtonDemo>
            <h4>Disabled State</h4>
            <WatercolorButton 
              width={120} 
              height={40} 
              color="#3b82f6"
              disabled={true}
            >
              Disabled
            </WatercolorButton>
            <p>60% opacity, no interactions</p>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>🚀 Real-World Examples</SectionTitle>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <WatercolorButton 
            width={100} 
            height={35} 
            color="#10b981"
            onClick={() => alert('Form submitted!')}
          >
            Submit
          </WatercolorButton>
          
          <WatercolorButton 
            width={80} 
            height={35} 
            color="#6b7280"
            onClick={() => alert('Cancelled!')}
          >
            Cancel
          </WatercolorButton>
          
          <WatercolorButton 
            width={60} 
            height={60} 
            color="#f59e0b"
            onClick={() => alert('Action!')}
          >
            ⭐
          </WatercolorButton>
          
          <WatercolorButton 
            width={140} 
            height={45} 
            color="#ec4899"
            intensity="heavy"
            onClick={() => alert('Premium action!')}
          >
            Get Premium
          </WatercolorButton>
          
          <WatercolorButton 
            width={50} 
            height={50} 
            color="#8b5cf6"
            onClick={() => alert('Settings!')}
          >
            ⚙️
          </WatercolorButton>
        </div>
      </Section>

      <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem' }}>
        <p>✨ All buttons are dynamic, scalable, and render in real-time with CSS!</p>
        <p>🎯 No PNG files needed, fully customizable colors and sizes</p>
      </div>
    </TestContainer>
  );
}; 