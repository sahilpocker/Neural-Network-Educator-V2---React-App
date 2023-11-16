import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from 'gsap/all';
import DrawableCanvas from './DrawableCanvas'; // Import your DrawableCanvas component
import PixelGrid from './PixelGrid'; // Import your PixelGrid component
import Pica from 'pica'; // Ensure Pica is imported
import theme from './theme';

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
  color: White;
  text-shadow: 1px 1px 2px #aaa;
`;

const DrawingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const PixelDrawingSection = ({ gridData, setGridData }) => {
  const textRef = useRef(null);
  const pica = Pica();

  const processImageToGrid = async (dataUrl) => {
    try {
      const img = new Image();
      img.src = dataUrl;

      return new Promise((resolve, reject) => {
        img.onload = async () => {
          const offScreenCanvas = document.createElement('canvas');
          offScreenCanvas.width = 28;
          offScreenCanvas.height = 28;

          const resizedCanvas = await pica.resize(img, offScreenCanvas);
          const ctx = resizedCanvas.getContext('2d');
          const imageData = ctx.getImageData(0, 0, 28, 28);
          const data = imageData.data;

          let newGridData = Array(28).fill().map(() => Array(28).fill(0));
          for (let i = 0; i < data.length; i += 4) {
            const gray = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
            const row = Math.floor((i / 4) / 28);
            const col = (i / 4) % 28;
            newGridData[row][col] = gray;
          }

          resolve(newGridData);
        };

        img.onerror = (e) => reject(e);
      });
    } catch (error) {
      console.error('Error processing image:', error);
      return Array(28).fill().map(() => Array(28).fill(255));
    }
  };

  const handleDrawingChange = async (dataUrl) => {
    const newGridData = await processImageToGrid(dataUrl);
    setGridData(newGridData); // Update the grid data in the parent component
  };


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
      <DrawingArea>
        <DrawableCanvas onDrawingChange={handleDrawingChange} />
        <PixelGrid gridData={gridData} />
      </DrawingArea>
    </SectionContainer>
  );
};

export default PixelDrawingSection;
