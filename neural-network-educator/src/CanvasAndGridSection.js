import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from 'gsap/all';
import CanvasAndGridSection from './CanvasAndGridSection'; // Import the CanvasAndGridSection

gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled.div`
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1.5em;
  color: white;
  text-shadow: 1px 1px 2px #aaa;
`;

const PixelDrawingSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current, { opacity: 0 }, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      opacity: 1,
    });
  }, []);

  return (
    <SectionContainer>
      <Text ref={textRef}>
        Ready for a fun experiment? Right here, you have a special area to draw a number. 
        Try drawing any digit and see what happens! As your number takes shape, it will turn 
        into a grid of little squares. These squares are called pixels, and they are super 
        important to how computers 'see' things.
        <br /><br />
        Go ahead, draw and discover the pixel magic!
      </Text>
      <CanvasAndGridSection />
    </SectionContainer>
  );
};

export default PixelDrawingSection;
