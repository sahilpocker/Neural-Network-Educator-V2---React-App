import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from 'gsap/all';
import mnistDigit from './images/mnist_digit.png';

gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled.div`
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${'' /* background: #181529; // Consistent dark background */}
  color: #fff; // Light text for contrast
`;

const GridVisualizationText = styled.p`
  font-size: 2em;
  font-family: system-ui;

  color: white; // Consistent color scheme
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px #222; // Subtle text shadow for readability
`;

const MNISTExplanationText = styled.p`
  font-size: 1.3em;
  font-family: system-ui;
  color: #84c5f4; 
  margin-bottom: 20px;
`;

const MNISTImage = styled.img`
  width: 200px; // Adjusted size for better visibility
  height: auto;
  border: 3px solid #84c5f4; // Consistent border color
  padding: 5px; // Padding around the image
  background: #fff; // White background for the image
  box-shadow: 0px 0px 8px 2px #84c5f4; // Shadow for depth
  margin-bottom: 20px;
`;

const GridVisualizationContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  opacity: 1;
`;

const HandwrittenDigitGrid = () => {
  const gridTextRef = useRef(null);
  const gridVisRef = useRef(null);

  useEffect(() => {
    gsap.to(gridTextRef.current, {
      scrollTrigger: {
        trigger: gridTextRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 1,
    });

    gsap.to(gridVisRef.current, {
      scrollTrigger: {
        trigger: gridVisRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 1,
    });
  }, []);

  return (
    <SectionContainer>
      <GridVisualizationText ref={gridTextRef}>
        When computers look at handwritten numbers, they don't see them quite like we do. Instead, they convert the image into a grid of tiny squares, or pixels...
      </GridVisualizationText>
      <GridVisualizationContainer ref={gridVisRef}>
        <MNISTExplanationText>
          Here's an example of a handwritten digit in the MNIST dataset.
        </MNISTExplanationText>
        <MNISTImage src={mnistDigit} alt="MNIST Digit" />
      </GridVisualizationContainer>
    </SectionContainer>
  );
};

export default HandwrittenDigitGrid;
