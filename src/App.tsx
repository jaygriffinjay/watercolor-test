import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { WatercolorDemo } from './WatercolorDemo';
import { WatercolorPlayground } from './components/WatercolorPlayground';

const Navigation = styled.nav`
  background: #f8fafc;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavTitle = styled.h1`
  font-family: 'Kalam', cursive;
  color: #2563eb;
  margin: 0;
  font-size: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: ${props => props.$isActive ? '#ffffff' : '#475569'};
  background: ${props => props.$isActive ? '#2563eb' : 'transparent'};
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$isActive ? '#1d4ed8' : '#e2e8f0'};
    color: ${props => props.$isActive ? '#ffffff' : '#1f2937'};
  }
`;

function App() {
  const location = useLocation();
  
  return (
    <>
      <Navigation>
        <NavContainer>
          <NavTitle>🎨 Watercolor React Components</NavTitle>
          <NavLinks>
            <NavLink to="/" $isActive={location.pathname === '/'}>
              Component Demo
            </NavLink>
            <NavLink to="/playground" $isActive={location.pathname === '/playground'}>
              Interactive Playground
            </NavLink>
          </NavLinks>
        </NavContainer>
      </Navigation>
      
      <Routes>
        <Route path="/" element={<WatercolorDemo />} />
        <Route path="/playground" element={<WatercolorPlayground />} />
      </Routes>
    </>
  );
}

export default App;
