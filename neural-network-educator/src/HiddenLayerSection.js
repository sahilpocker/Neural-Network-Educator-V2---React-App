import {React,useEffect} from 'react';
import styled from 'styled-components';
import networkGif from './images/network.gif';
import { gsap } from 'gsap';
import ActivationSection from './ActivationSection';
import LearningProcessSection from './LearningProcessSection';

const SectionContainer = styled.div`
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HorizontalScrollContainer = styled.div`
  display: flex;
  width: 400vw; // 4 panels, each 100vw
  min-height: 100vh;
  position: relative;
`;

const Panel = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  flex-shrink: 0; // Prevent flex items from shrinking
`;


const NetworkImage = styled.img`
  position: relative;
  width: auto; // Adjust size as needed
  height: auto; // Adjust size as needed
  top: 50%; // Center vertically
  left: 50%; // Center horizontally
  transform: translate(-50%, -50%); // Adjust position as needed
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

const HiddenLayersSection = () => {
    useEffect(() => {
      // ScrollTrigger for horizontal scrolling
      gsap.to('.horizontal-scroll', {
        x: () => -(document.querySelector('.horizontal-scroll').offsetWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-scroll',
          pin: true,
          scrub: 1,
          end: () => "+=" + document.querySelector('.horizontal-scroll').offsetWidth
        }
      });
    }, []);
  
    return (
      <HorizontalScrollContainer className="horizontal-scroll">
        <Panel>
        <SectionContainer>
          <Text>
          After drawing your number, each pixel has become a neuron on the screen. There are 784 of them, representing each part of your drawing.
Now, these neurons will do something interesting. They're going to organize the information from these pixels into 10 different groups. This helps the computer understand what number you've drawn. Let's see how this process works!          </Text>
          </SectionContainer>
        </Panel>
        <Panel>
          <NetworkImage src={networkGif} alt="Neural Network Visualization" />
        </Panel>
        <Panel>
          <ActivationSection />
        </Panel>
        <Panel>
          <LearningProcessSection />
        </Panel>
      </HorizontalScrollContainer>
    );
  };
  
  export default HiddenLayersSection;