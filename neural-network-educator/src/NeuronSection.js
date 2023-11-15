import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const NeuronSectionContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`;

const Neuron = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #84c5f4;
`;

const NeuronSection = ({ gridData }) => {
  const [neurons, setNeurons] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Calculate initial positions for neurons
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const initialNeurons = gridData.flat().map((value, index) => ({
      id: `neuron-${index}`,
      style: {
        backgroundColor: `rgb(${value}, ${value}, ${value})`,
        left: `${centerX + (index % 28) * 10 - 140}px`,
        top: `${centerY + Math.floor(index / 28) * 10 - 140}px`
      }
    }));

    setNeurons(initialNeurons);

    initialNeurons.forEach(neuron => {
      gsap.to(`#${neuron.id}`, {
        x: `random(-100vw, 100vw)`,
        y: `random(-100vh, 100vh)`,
        duration: 3,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [gridData]);

  return (
    <NeuronSectionContainer ref={containerRef}>
      {neurons.map(neuron => (
        <Neuron key={neuron.id} id={neuron.id} style={neuron.style} />
      ))}
    </NeuronSectionContainer>
  );
};

export default NeuronSection;
