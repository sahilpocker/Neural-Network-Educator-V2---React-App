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
  font-size: 1.5em;
  color: #4fc3f7;
  text-shadow: 1px 1px 2px #aaa;
  opacity: 1;
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
      Have you ever seen a picture of a handwritten number and noticed how each one can be a little different? 
        Now, think about how a computer might see this picture. To a computer, this picture is made up of lots of tiny dots called 'pixels.' 
        Each pixel is like a tiny square that can be dark or light, and together, they form an image of the number.
        <br /><br />
        But recognizing these numbers can be tricky for computers. After all, everyone has their unique style of writing. 
        Some people might make their '7' with a line across the middle, while others don't. 
        So, how can computers learn to understand and recognize these numbers in all their unique styles? 
        That's where 'neural networks' come into play. These smart systems look at tons of different pixel-filled pictures of numbers and learn to find the patterns, no matter how we write them.      </Text>
      <GridVisualization ref={gridRef}>
        {/* Insert visualization or image of a digit transforming into a 28x28 grid */}
      </GridVisualization>
      {/* Placeholder for interactive canvas */}
    </SectionContainer>
  );
};

export default HandwrittenDigitIntroduction;
