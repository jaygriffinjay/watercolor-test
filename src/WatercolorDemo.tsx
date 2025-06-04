import React, { useState } from 'react';
import styled from 'styled-components';
import {
  WatercolorFilters,
  WatercolorButton,
  WatercolorCard,
  WatercolorNavigation,
  WatercolorDivider,
} from './components';
import { SimpleWatercolorFilter } from './components/SimpleWatercolorFilter';
import { SimpleWatercolorCard } from './components/SimpleWatercolorCard';
import { StaticWatercolorDivider } from './components/StaticWatercolorDivider';
import { SVGWatercolorDivider } from './components/SVGWatercolorDivider';
import { generateWatercolorDividerAssets } from './utils/exportWatercolorAsset';
import {
  WatercolorDividerPurple,
  WatercolorDividerBlue,
  WatercolorDividerGreen,
  WatercolorDividerOrange,
  WatercolorDividerPink,
  WatercolorDividerCyan,
  WatercolorDividerYellow,
  WatercolorDividerPurpleLight,
  WatercolorDividerPurpleHeavy,
} from './components/generated';

const WatercolorDemoContainer = styled.div`
  font-family: 'Nunito', sans-serif;
  letter-spacing: 0.05em;
  color: #392b17dd;
  background: #fff0cb;
  background: linear-gradient(#fff0cb, #fff0cb), url('./assets/paper-texture.webp');
  background-blend-mode: multiply;
  min-height: 100vh;
  display: grid;
  place-content: center;
`;

const WatercolorApp = styled.main`
  max-width: 900px;
  margin: auto;
`;

const WatercolorForm = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;

  h1 {
    font-family: 'Kalam', cursive;
    font-weight: 700;
    font-style: normal;
    margin: 0;
    text-shadow: inherit;
    color: inherit;
    font-size: 2.5rem;
  }

  h2 {
    font-family: 'Kalam', cursive;
    font-weight: 600;
    font-style: normal;
    margin: 0;
    color: inherit;
    font-size: 1.8rem;
  }

  p {
    margin: 0;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.05em;
    color: #392b17dd;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WatercolorCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WatercolorButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const ExportButton = styled.button`
  background: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem 0;

  &:hover {
    background: #e0e0e0;
    border-color: #999;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const WatercolorDemo: React.FC = () => {
  const [activeNav, setActiveNav] = useState(0);
  const [activeNav2, setActiveNav2] = useState(1);

  const navItems = [
    { label: 'Overview', active: activeNav === 0, onClick: () => setActiveNav(0) },
    { label: 'Tickets', active: activeNav === 1, onClick: () => setActiveNav(1) },
    { label: 'Registration', active: activeNav === 2, onClick: () => setActiveNav(2) },
  ];

  const navItems2 = [
    { label: 'Dashboard', active: activeNav2 === 0, onClick: () => setActiveNav2(0) },
    { label: 'Analytics', active: activeNav2 === 1, onClick: () => setActiveNav2(1) },
    { label: 'Settings', active: activeNav2 === 2, onClick: () => setActiveNav2(2) },
    { label: 'Help', active: activeNav2 === 3, onClick: () => setActiveNav2(3) },
  ];

  return (
    <WatercolorDemoContainer>
      <WatercolorFilters disabled={false} />
      
      <WatercolorApp>
        <WatercolorForm>
          <h1>Watercolor UI Elements</h1>
          
          <WatercolorDivider />

          <Section>
            <h2>Metric Cards - Default Variants</h2>
            <WatercolorCards>
              <WatercolorCard title="71" description="Tickets Sold" variant="blue" />
              <WatercolorCard title="$69" description="Profit" variant="cyan" />
              <WatercolorCard title="51" description="Orders" variant="green" />
              <WatercolorCard title="262" description="Page Visits" variant="yellow" />
            </WatercolorCards>
          </Section>

          <WatercolorDivider hue={15} saturation={120} brightness={1.8} />

          <Section>
            <h2>Custom Colored Cards</h2>
            <WatercolorCards>
              <WatercolorCard 
                title="94%" 
                description="Satisfaction" 
                hue={300} 
                saturation={200} 
                brightness={1.6}
                contrast={1.8}
              />
              <WatercolorCard 
                title="1.2k" 
                description="New Users" 
                hue={15} 
                saturation={160} 
                brightness={1.3}
                contrast={2.1}
              />
              <WatercolorCard 
                title="$2.4M" 
                description="Revenue" 
                hue={270} 
                saturation={120} 
                brightness={1.5}
                contrast={1.6}
              />
            </WatercolorCards>
          </Section>

          <WatercolorDivider thickness={4} hue={200} saturation={100} brightness={1.6} />

          <Section>
            <h2>Button Varieties</h2>
            <WatercolorButtons>
              <WatercolorButton variant="secondary">View Attendees</WatercolorButton>
              <WatercolorButton variant="primary">Add Reminder</WatercolorButton>
            </WatercolorButtons>

            <WatercolorButtons style={{ marginTop: '1rem' }}>
              <WatercolorButton 
                variant="primary" 
                hue={220} 
                saturation={80}
                brightness={2.0}
                shadowDepth={6}
              >
                Download Report
              </WatercolorButton>
              <WatercolorButton 
                variant="secondary" 
                hue={300} 
                saturation={70}
                brightness={2.2}
                contrast={1.2}
              >
                Share Link
              </WatercolorButton>
              <WatercolorButton 
                variant="primary" 
                hue={160} 
                saturation={90}
                brightness={1.9}
              >
                Create Event
              </WatercolorButton>
            </WatercolorButtons>
          </Section>

          <WatercolorDivider thickness={2} hue={320} saturation={140} brightness={1.4} />

          <Section>
            <h2>Navigation Examples</h2>
            <WatercolorNavigation items={navItems} />
            
            <div style={{ marginTop: '1rem' }}>
              <WatercolorNavigation 
                items={navItems2} 
                hue={120} 
                activeHue={60}
              />
            </div>
          </Section>

          <WatercolorDivider thickness={3} hue={60} saturation={110} brightness={1.7} />

          <Section>
            <h2>More Metric Examples</h2>
            <WatercolorCards>
              <WatercolorCard title="15.2k" description="Downloads" variant="blue" />
              <WatercolorCard 
                title="98.5%" 
                description="Uptime" 
                hue={80} 
                saturation={140} 
                brightness={1.7}
              />
              <WatercolorCard title="423" description="Active Users" variant="cyan" />
              <WatercolorCard 
                title="24ms" 
                description="Response Time" 
                hue={320} 
                saturation={190}
              />
            </WatercolorCards>
          </Section>

          <WatercolorDivider hue={180} saturation={90} brightness={1.5} />

          <p>These are all using a custom SVG Filter to look like watercolor drawings</p>
          <p>Each component is fully configurable with hue, saturation, brightness, and contrast props</p>

          <ExportButton onClick={generateWatercolorDividerAssets}>
            📥 Export Watercolor Dividers as PNG Assets
          </ExportButton>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Click to download watercolor divider assets in different sizes for static use
          </p>

          <Section>
            <h2>🎯 Capture Mode - Isolated Dividers</h2>
            <p style={{ marginBottom: '2rem' }}>
              <strong>Right-click → Inspect → Screenshot Node</strong> on any divider below for perfect captures:
            </p>
            
            <div style={{ 
              background: '#ffffff', 
              padding: '4rem 3rem', 
              borderRadius: '8px',
              border: '2px solid #ddd',
              margin: '2rem 0',
              /* Override the page background completely */
              backgroundImage: 'none !important',
              isolation: 'isolate'
            }}>
              <h3 style={{ margin: '0 0 3rem 0', textAlign: 'center', color: '#333', fontFamily: 'Kalam, cursive' }}>
                Default Blue Tone
              </h3>
              <WatercolorDivider thickness={3} />
            </div>

            <div style={{ 
              background: '#ffffff', 
              padding: '4rem 3rem', 
              borderRadius: '8px',
              border: '2px solid #ddd',
              margin: '2rem 0',
              backgroundImage: 'none !important',
              isolation: 'isolate'
            }}>
              <h3 style={{ margin: '0 0 3rem 0', textAlign: 'center', color: '#333', fontFamily: 'Kalam, cursive' }}>
                Green Tone (120° hue)
              </h3>
              <WatercolorDivider thickness={3} hue={120} saturation={150} brightness={1.3} />
            </div>

            <div style={{ 
              background: '#ffffff', 
              padding: '4rem 3rem', 
              borderRadius: '8px',
              border: '2px solid #ddd',
              margin: '2rem 0',
              backgroundImage: 'none !important',
              isolation: 'isolate'
            }}>
              <h3 style={{ margin: '0 0 3rem 0', textAlign: 'center', color: '#333', fontFamily: 'Kalam, cursive' }}>
                Red Tone (240° hue)
              </h3>
              <WatercolorDivider thickness={3} hue={240} saturation={130} brightness={1.2} />
            </div>

            <div style={{ 
              background: '#ffffff', 
              padding: '4rem 3rem', 
              borderRadius: '8px',
              border: '2px solid #ddd',
              margin: '2rem 0',
              backgroundImage: 'none !important',
              isolation: 'isolate'
            }}>
              <h3 style={{ margin: '0 0 3rem 0', textAlign: 'center', color: '#333', fontFamily: 'Kalam, cursive' }}>
                Purple Tone (280° hue)
              </h3>
              <WatercolorDivider thickness={3} hue={280} saturation={140} brightness={1.1} />
            </div>

            <div style={{ 
              background: '#ffffff', 
              padding: '4rem 3rem', 
              borderRadius: '8px',
              border: '2px solid #ddd',
              margin: '2rem 0',
              backgroundImage: 'none !important',
              isolation: 'isolate'
            }}>
              <h3 style={{ margin: '0 0 3rem 0', textAlign: 'center', color: '#333', fontFamily: 'Kalam, cursive' }}>
                Thick Orange (5px, 30° hue)
              </h3>
              <WatercolorDivider thickness={5} hue={30} saturation={160} brightness={1.4} />
            </div>

            <div style={{ 
              background: '#ffffff', 
              padding: '4rem 3rem', 
              borderRadius: '8px',
              border: '2px solid #ddd',
              margin: '2rem 0',
              backgroundImage: 'none !important',
              isolation: 'isolate'
            }}>
              <h3 style={{ margin: '0 0 3rem 0', textAlign: 'center', color: '#333', fontFamily: 'Kalam, cursive' }}>
                Thin Cyan (2px, 180° hue)
              </h3>
              <WatercolorDivider thickness={2} hue={180} saturation={120} brightness={1.5} />
            </div>
          </Section>

          <WatercolorDivider thickness={5} hue={240} saturation={120} brightness={1.6} />

          <Section>
            <h2>Simple Watercolor (Performance Optimized)</h2>
            <p>
              Below are simplified watercolor components with fewer filter operations for better performance:
            </p>
            
            <SimpleWatercolorFilter intensity="medium" seed={1234} />
            
            <WatercolorCards>
              <SimpleWatercolorCard 
                intensity="light"
                backgroundColor="#e8f4f8"
                hue={210}
              >
                <h3>Light Effect</h3>
                <p>Subtle watercolor with minimal processing</p>
              </SimpleWatercolorCard>
              
              <SimpleWatercolorCard 
                intensity="medium"
                backgroundColor="#f0f8e8"
                hue={120}
              >
                <h3>Medium Effect</h3>
                <p>Balanced watercolor with moderate processing</p>
              </SimpleWatercolorCard>
              
              <SimpleWatercolorCard 
                intensity="heavy"
                backgroundColor="#f8e8f0"
                hue={320}
              >
                <h3>Heavy Effect</h3>
                <p>Rich watercolor with more pronounced effects</p>
              </SimpleWatercolorCard>
            </WatercolorCards>
            
            <div style={{ marginTop: '1rem' }}>
              <WatercolorCards>
                <SimpleWatercolorCard 
                  intensity="medium"
                  backgroundColor="#fff5e6"
                  hue={30}
                >
                  <h3>1,234</h3>
                  <p>Total Sales</p>
                </SimpleWatercolorCard>
                
                <SimpleWatercolorCard 
                  intensity="medium"
                  backgroundColor="#e6f3ff"
                  hue={210}
                >
                  <h3>87%</h3>
                  <p>Success Rate</p>
                </SimpleWatercolorCard>
                
                <SimpleWatercolorCard 
                  intensity="medium"
                  backgroundColor="#f0e6ff"
                  hue={270}
                >
                  <h3>456</h3>
                  <p>Active Users</p>
                </SimpleWatercolorCard>
              </WatercolorCards>
            </div>
          </Section>

          <WatercolorDivider hue={180} saturation={90} brightness={1.5} />

          <p>
            <strong>Performance Comparison:</strong> The simple watercolor components use a streamlined 
            4-step filter (turbulence → composite → displace → blur) compared to the full version's 
            10+ operations, resulting in much smoother scrolling performance.
          </p>

          <WatercolorDivider hue={90} saturation={120} brightness={1.4} />

          <Section>
            <h2>Static Asset Dividers (Zero Performance Cost)</h2>
            <p>
              Below are dividers using your exported PNG asset with CSS hue rotation - 
              <strong>no SVG filters, perfect performance!</strong>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  Your Purple Divider (Original):
                </p>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>
              
              <div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  Blue tone (180° hue shift):
                </p>
                <StaticWatercolorDivider thickness={3} hue={180} saturation={120} />
              </div>
              
              <div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  Green tone (120° hue shift):
                </p>
                <StaticWatercolorDivider thickness={3} hue={120} saturation={110} />
              </div>
              
              <div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  Orange tone (300° hue shift):
                </p>
                <StaticWatercolorDivider thickness={3} hue={300} saturation={130} brightness={0.9} />
              </div>
              
              <div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  Red tone (240° hue shift):
                </p>
                <StaticWatercolorDivider thickness={3} hue={240} saturation={140} brightness={1.1} />
              </div>
              
              <div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                  Thicker cyan variant:
                </p>
                <StaticWatercolorDivider thickness={5} hue={180} saturation={150} brightness={1.2} />
              </div>
            </div>
            
            <p style={{ marginTop: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
              <strong>🚀 Performance Win:</strong> These static dividers use zero computational resources during 
              scroll - they're just background images with CSS filters. The visual quality should be nearly 
              identical to the SVG versions above, but with buttery smooth performance!
            </p>
          </Section>

          <WatercolorDivider hue={45} saturation={130} brightness={1.3} />

          <Section>
            <h2>☀️ Light Mode Compatibility Test</h2>
            <p>
              Testing your purple watercolor divider on light backgrounds:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ 
                background: '#ffffff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Pure White Background
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#f8f9fa', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Light Gray Background (#f8f9fa)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#f1f5f9', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #cbd5e1'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Slate Light Background (#f1f5f9)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#fef7cd', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #facc15'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Warm Cream Background (#fef7cd)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#f0f9ff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #38bdf8'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Cool Blue Light Background (#f0f9ff)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>
            </div>
            
            <p style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
              <strong>☀️ Light Mode Assessment:</strong> How does your purple watercolor divider contrast 
              against these light backgrounds? Good contrast is essential for accessibility!
            </p>
          </Section>

          <WatercolorDivider hue={120} saturation={110} brightness={1.4} />

          <Section>
            <h2>🌙 Dark Mode Compatibility Test</h2>
            <p>
              Testing your purple watercolor divider on dark backgrounds to see how it looks in dark mode:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ 
                background: '#000000', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Pure Black Background
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#1a1a1a', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Dark Gray Background (#1a1a1a)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#2d2d2d', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #555'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Medium Dark Background (#2d2d2d)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#0f172a', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #334155'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Slate Dark Background (#0f172a)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>

              <div style={{ 
                background: '#111827', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Blue-Gray Dark Background (#111827)
                </h3>
                <StaticWatercolorDivider thickness={3} hue={0} />
              </div>
            </div>
            
            <p style={{ marginTop: '2rem', padding: '1rem', background: '#2d2d2d', color: '#fff', borderRadius: '8px' }}>
              <strong>🌙 Dark Mode Assessment:</strong> How does your purple watercolor divider look on these dark backgrounds? 
              If it's too dark/invisible, we can adjust the brightness or add a subtle glow effect for dark mode compatibility!
            </p>
          </Section>

          <WatercolorDivider hue={180} saturation={90} brightness={1.5} />

          <Section>
            <h2>🎯 SVG Dynamic Color Control</h2>
            <p>
              <strong>NEW:</strong> Pure SVG watercolor dividers with automatic dark mode color switching!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ 
                background: '#ffffff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Light Mode (Purple)
                </h3>
                <SVGWatercolorDivider 
                  thickness={3} 
                  color="#6b46c1" 
                  darkModeColor="#a78bfa"
                  seed={1111}
                />
              </div>

              <div style={{ 
                background: '#1a1a1a', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Dark Mode (Auto Lighter Purple)
                </h3>
                <SVGWatercolorDivider 
                  thickness={3} 
                  color="#6b46c1" 
                  darkModeColor="#a78bfa"
                  seed={1112}
                />
              </div>

              <div style={{ 
                background: '#ffffff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Green Theme
                </h3>
                <SVGWatercolorDivider 
                  thickness={4} 
                  color="#059669" 
                  darkModeColor="#34d399"
                  seed={1113}
                />
              </div>

              <div style={{ 
                background: '#1a1a1a', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Blue Theme (Dark)
                </h3>
                <SVGWatercolorDivider 
                  thickness={4} 
                  color="#2563eb" 
                  darkModeColor="#60a5fa"
                  seed={1114}
                />
              </div>

              <div style={{ 
                background: '#ffffff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  Orange Theme
                </h3>
                <SVGWatercolorDivider 
                  thickness={5} 
                  color="#ea580c" 
                  darkModeColor="#fb923c"
                  seed={1115}
                />
              </div>
            </div>
            
            <p style={{ marginTop: '2rem', padding: '1rem', background: '#e0f2fe', borderRadius: '8px' }}>
              <strong>🚀 SVG Advantages:</strong> Perfect color control, automatic dark mode switching, 
              same watercolor quality as the original filters, and each divider has a unique seed for variation!
            </p>
          </Section>

          <WatercolorDivider hue={180} saturation={90} brightness={1.5} />

          <Section>
            <h2>🏭 Build-Time Generated Components (SSR Approach)</h2>
            <p>
              <strong>ULTIMATE PERFORMANCE:</strong> These are pre-rendered at build time using your 
              component factory - zero runtime computation, perfect scroll performance!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ 
                background: '#ffffff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  🎨 All Theme Colors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Purple:</p>
                    <WatercolorDividerPurple />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Blue:</p>
                    <WatercolorDividerBlue />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Green:</p>
                    <WatercolorDividerGreen />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Orange:</p>
                    <WatercolorDividerOrange />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Pink:</p>
                    <WatercolorDividerPink />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Cyan:</p>
                    <WatercolorDividerCyan />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Yellow:</p>
                    <WatercolorDividerYellow />
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#1a1a1a', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '1px solid #333'
              }}>
                <h3 style={{ color: '#fff', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  🌙 Dark Mode (Same Components!)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Purple (auto lighter):</p>
                    <WatercolorDividerPurple />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Blue (auto lighter):</p>
                    <WatercolorDividerBlue />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Green (auto lighter):</p>
                    <WatercolorDividerGreen />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Orange (auto lighter):</p>
                    <WatercolorDividerOrange />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Pink (auto lighter):</p>
                    <WatercolorDividerPink />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Cyan (auto lighter):</p>
                    <WatercolorDividerCyan />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>Yellow (auto lighter):</p>
                    <WatercolorDividerYellow />
                  </div>
                </div>
              </div>

              <div style={{ 
                background: '#ffffff', 
                padding: '3rem', 
                borderRadius: '8px',
                border: '2px solid #ddd'
              }}>
                <h3 style={{ color: '#333', textAlign: 'center', margin: '0 0 2rem 0', fontFamily: 'Kalam, cursive' }}>
                  💪 Intensity Variations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Purple Light (subtle):</p>
                    <WatercolorDividerPurpleLight />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Purple Medium (default):</p>
                    <WatercolorDividerPurple />
                  </div>
                  <div>
                    <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#666' }}>Purple Heavy (intense):</p>
                    <WatercolorDividerPurpleHeavy />
                  </div>
                </div>
              </div>
            </div>
            
            <p style={{ marginTop: '2rem', padding: '1rem', background: '#e8f5e8', borderRadius: '8px' }}>
              <strong>🏭 Build-Time Magic:</strong> All 9 components were generated by your factory script in milliseconds. 
              Each has unique watercolor patterns, automatic dark mode, and costs <strong>zero performance</strong> at runtime. 
              Add new themes? Just edit the script and run <code>npm run generate:watercolor</code>!
            </p>
          </Section>

        </WatercolorForm>
      </WatercolorApp>

    </WatercolorDemoContainer>
  );
}; 