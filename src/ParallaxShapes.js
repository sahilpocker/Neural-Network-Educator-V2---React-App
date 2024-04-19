import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Shape = styled.div`
  position: fixed;
  border-radius: 50%;
  background-color: ${props => props.color};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}vw;
  top: ${props => props.top}vh;
  z-index: -1;

  // Initial box-shadow for glow effect
  box-shadow: 0 0 8px ${props => props.color};
`;


const ParallaxShapes = () => {
  const [shapes, setShapes] = useState([]);
  const initialShapesCount = 20;
  const shapesContainerRef = useRef();
  const animateGlow = (shape) => {
    gsap.to(shape, {
      boxShadow: `0 0 20px ${shape.color}, 0 0 30px ${shape.color}`,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1.5
    });
  };



  useEffect(() => {
    shapes.forEach(shape => {
        animateGlow(shape);
      });
    for (let i = 0; i < initialShapesCount; i++) {
      addShape();
    }

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const scrollSpeed = self.getVelocity() / 100; // Adjust sensitivity
        shapesContainerRef.current.childNodes.forEach(shape => {
          const speed = parseFloat(shape.dataset.speed);
          gsap.to(shape, { y: `-=${scrollSpeed * speed}`, ease: 'none' }); // Adjust direction here
        });
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  const addShape = () => {
    const newShapeProps = generateRandomProperties();
    setShapes(prevShapes => [...prevShapes, newShapeProps]);
  };

  const generateRandomProperties = () => {
    const hue = 210; // Hue for blue
    const saturation = 100; // Full saturation for neon effect
    const lightness = 50 + Math.random() * 10; // Lightness for bright neon colors
  
    return {
      key: `shape-${Date.now()}-${Math.random()}`,
      size: Math.random() * 20 + 10,
      color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      speed: Math.random() * 3 + 1
    };
  };
  
  

  return (
    <div ref={shapesContainerRef}>
      {shapes.map(shapeProps => (
        <Shape
          key={shapeProps.key}
          data-speed={shapeProps.speed}
          {...shapeProps}
        />
      ))}
    </div>
  );
};

export default ParallaxShapes;
