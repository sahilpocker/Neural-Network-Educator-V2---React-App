import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const colors = {
  licorice: '#231b1b',
  mintGreen: '#ddfff7',
  teaRose: '#ceabb1',
  caribbeanCurrent: '#216869',
  mossGreen: '#898952',
  lightCaribbean: '#8edadb',
  lightTeaRose: '#e2cdd0',
};

const NetworkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  position: relative;
  padding-bottom: 20px;
`;

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 50px;
`;

const Neuron = styled.div`
  background-color: ${colors.teaRose};
  border-radius: 50%;
  border: 2px solid ${colors.lightTeaRose};
  width: 30px;
  height: 30px;
  margin: 10px;
  position: relative;
  z-index: 1;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.mintGreen};
  }
`;

const Dots = styled.div`
  font-size: 20px;
  line-height: 0;
  color: ${colors.mossGreen};
  text-align: center;
  width: 100%;
  margin: 10px 0;
`;

const Link = styled.div`
  background-color: ${colors.lightCaribbean};
  height: 2px;
  position: absolute;
  z-index: 0;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ControlButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background-color: ${colors.lightTeaRose};
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const NeuronCountDisplay = styled.div`
  color: ${colors.mossGreen};
  margin-top: 10px;
  font-size: 14px;
`;

const NeuralNetworkVisualizer = () => {
    const networkRef = useRef(null);
    const [hiddenLayer1Neurons, setHiddenLayer1Neurons] = useState(10);
    const [hiddenLayer2Neurons, setHiddenLayer2Neurons] = useState(10);
    const [links, setLinks] = useState([]);
  
    const adjustNeuronCount = useCallback((layer, adjustment) => {
      const minNeurons = 10;
      const maxNeurons = 100;
  
      if (layer === 1) {
        setHiddenLayer1Neurons(prevCount => Math.max(minNeurons, Math.min(prevCount + adjustment, maxNeurons)));
      } else if (layer === 2) {
        setHiddenLayer2Neurons(prevCount => Math.max(minNeurons, Math.min(prevCount + adjustment, maxNeurons)));
      }
    }, []);
  
    // Render 8 neurons for visualization purposes
    const renderNeurons = useCallback((count, layerIndex) => {
        // For the output layer, display all neurons
        if (layerIndex === 3) {
          return Array.from({ length: count }, (_, i) => (
            <Neuron key={`neuron-${layerIndex}-${i}`} className="neuron" />
          ));
        }
        // For hidden layers, display 8 neurons and dots
        return (
          <>
            {Array.from({ length: 4 }, (_, i) => (
              <Neuron key={`neuron-${layerIndex}-${i}`} className="neuron" />
            ))}
            <Dots className="neuron">...</Dots>
            {Array.from({ length: 4 }, (_, i) => (
              <Neuron key={`neuron-${layerIndex}-${8 + i}`} className="neuron" />
            ))}
          </>
        );
      }, []);
  
    // Function to render links between neurons
    const renderLinks = useCallback(() => {
      if (!networkRef.current || !networkRef.current.children) {
        return [];
      }
  
      const layers = networkRef.current.children;
      const newLinks = [];
  
      for (let i = 0; i < layers.length - 1; i++) {
        const fromNeurons = Array.from(layers[i].children).filter(child => child.classList.contains('neuron'));
        const toNeurons = Array.from(layers[i + 1].children).filter(child => child.classList.contains('neuron'));
  
        for (let from = 0; from < fromNeurons.length; from++) {
          for (let to = 0; to < toNeurons.length; to++) {
            const fromNeuron = fromNeurons[from].getBoundingClientRect();
            const toNeuron = toNeurons[to].getBoundingClientRect();
  
            const x1 = fromNeuron.left + fromNeuron.width / 2 - networkRef.current.offsetLeft;
            const y1 = fromNeuron.top + fromNeuron.height / 2 - networkRef.current.offsetTop;
            const x2 = toNeuron.left + toNeuron.width / 2 - networkRef.current.offsetLeft;
            const y2 = toNeuron.top + toNeuron.height / 2 - networkRef.current.offsetTop;
  
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1);
  
            newLinks.push(
              <Link
                key={`link-${i}-${from}-${to}`}
                style={{
                  left: `${x1}px`,
                  top: `${y1}px`,
                  width: `${length}px`,
                  transform: `rotate(${angle}rad)`,
                  transformOrigin: 'top left',
                }}
              />
            );
          }
        }
      }
  
      return newLinks;
    }, [networkRef]);
  
    useEffect(() => {
      // GSAP animations for neurons
      gsap.to(networkRef.current.querySelectorAll('.neuron'), {
        scale: 1.05,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        stagger: {
          each: 0.2,
          from: 'center',
        },
      });
  
      // Initial link rendering
      setLinks(renderLinks());
    }, [renderLinks]);
  
    return (
        <NetworkContainer ref={networkRef}>
          <Layer>
            {renderNeurons(28, 0)}
            <NeuronCountDisplay>Input Layer</NeuronCountDisplay>
          </Layer>
    
          <Layer>
            {renderNeurons(8, 1)}
            <ButtonContainer>
              <ControlButton onClick={() => adjustNeuronCount(1, 1)}>+</ControlButton>
              <ControlButton onClick={() => adjustNeuronCount(1, -1)}>-</ControlButton>
            </ButtonContainer>
            <NeuronCountDisplay>Hidden Layer 1: {hiddenLayer1Neurons} Neurons</NeuronCountDisplay>
          </Layer>
    
          <Layer>
            {renderNeurons(8, 2)}
            <ButtonContainer>
              <ControlButton onClick={() => adjustNeuronCount(2, 1)}>+</ControlButton>
              <ControlButton onClick={() => adjustNeuronCount(2, -1)}>-</ControlButton>
            </ButtonContainer>
            <NeuronCountDisplay>Hidden Layer 2: {hiddenLayer2Neurons} Neurons</NeuronCountDisplay>
          </Layer>
    
          <Layer>
            {renderNeurons(10, 3)}
            <NeuronCountDisplay>Output Layer (MNIST Categories)</NeuronCountDisplay>
          </Layer>
    
          {links}
        </NetworkContainer>
      );
    };
    
    export default NeuralNetworkVisualizer;