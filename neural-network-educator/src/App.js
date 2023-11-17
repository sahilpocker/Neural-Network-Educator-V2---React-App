import React, { useRef, useEffect,useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';


import NeuralNetworkIntroduction from './NeuralNetworkIntroduction';
import HandwrittenDigitIntroduction from './HandwrittenDigitIntroduction';
import HandwrittenDigitGrid from './HandwrittenDigitGrid'
import theme from './theme';
import ParallaxShapes from './ParallaxShapes';
import PixelDrawingSection from './PixelDrawingSection';
import HiddenLayersSection from './HiddenLayerSection';
import ConclusionSection from './ConclusionSection';
import NeuronSection from './NeuronSection';
import NeuralNetworkPlayground from './NeuralNetworkPlayground'



const FullScreenCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: ${theme.palette.background.default};
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: ${theme.palette.text.primary}; 
  font-family: system-ui;

`;

const ExploreButton = styled.button`
padding: 10px 20px;
  margin: 10px;
  background-color: #84c5f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #4fc3f7;
  }
`;



const ScrollInvite = styled.p`
  font-size: 1.5em;
  color: #3EECF1; 
  font-family: system-ui;

`;

const Home = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  

  const [gridData, setGridData] = useState(Array(28).fill(Array(28).fill(255)));

  


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    

    let particles = [];

    const createParticles = () => {
      const numberOfParticles = 50; 
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3;
    
        // Adjust hue to blue spectrum (180° to 240°)
        const hue = 180 + Math.random() * 60;
        const color = `hsl(${hue}, 100%, 50%)`; // Blue hue, full saturation, lightness 50%
    
        const particle = { x, y, size, color };
    
        gsap.to(particle, {
          x: particle.x + (Math.random() - 0.5) * 50, // Random drift
          y: particle.y + (Math.random() - 0.5) * 50,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          duration: 2 + Math.random() * 2 // Randomized duration for a natural feel
        });
    
        particles.push(particle);

  
      }
      
    };
    

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();
    
  }, []);

  const navigateToPlayground = () => {
    navigate('/NeuralNetworkPlayground'); 
  };

  return (
    
    <div>
    
      <FullScreenCanvas ref={canvasRef} />
      <ParallaxShapes />
      
      <ContentContainer>
      

        <WelcomeMessage>Welcome to the World of Neural Networks!</WelcomeMessage>
        <ExploreButton onClick={navigateToPlayground}>Explore the Playground</ExploreButton>
        <ScrollInvite>Scroll down to learn more about neural networks</ScrollInvite>

      </ContentContainer>

      <NeuralNetworkIntroduction />
      <HandwrittenDigitIntroduction />
      <HandwrittenDigitGrid />
      <PixelDrawingSection gridData={gridData} setGridData={setGridData} />
      <NeuronSection gridData={gridData} />
      <HiddenLayersSection/>
     
      <ConclusionSection/>
    
    </div>
  );
};

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NeuralNetworkPlayground" element={<NeuralNetworkPlayground />} />
      </Routes>
  );
};

export default App;
