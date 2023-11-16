import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled.div`
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;  
  z-index: 2;
`;

const Text = styled.p`
  font-size: 2em;
  color: white;
  font-weight: normal;
  opacity: 1;
  font-family: system-ui;
  line-height: 1.5em;
  width:54%;
`;

const GridVisualization = styled.div`
  width: 80%;
  height: auto;
  margin: 20px auto;
  opacity: 1;
  // Add styles for your grid visualization
`;

const HandwrittenDigitIntroduction = () => {
  const textRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 1,
    });

    gsap.to(gridRef.current, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 1,
    });
  }, []);

  return (
    <SectionContainer>
      <Text ref={textRef}>
      
          
          Ever noticed how everyone writes numbers in their own way? Some might curve their '2's a bit more, or add a dash to their '7's. It's quite fascinating! But think about how computers, with their digital eyes, perceive these handwritten numbers. They don't see the curves or dashes like we do.
          <br /><br />
          So, how do computers recognize these diverse handwriting styles? That's where the magic of 'neural networks' comes in. These sophisticated computer systems learn from countless examples of handwritten numbers. They master the art of spotting '2's and '7's, and all numbers in between, in all their unique forms.
        </Text>
      <GridVisualization ref={gridRef}>
        {/* Insert visualization or image of a digit transforming into a 28x28 grid */}
      </GridVisualization>
      {/* Placeholder for interactive canvas */}
    </SectionContainer>
  );
};

export default HandwrittenDigitIntroduction;
