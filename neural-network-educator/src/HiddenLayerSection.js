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
  font-size: 1.5em;
  color: #4fc3f7;
  text-shadow: 1px 1px 2px #aaa;
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
            Having seen how 784 neurons receive pixel values, we now explore their transformation into 10 distinct categories...
          </Text>
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