import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

// Styled Components
const PanelsContainer = styled.div`
  display: flex;
  width: 300vw; // 3 panels each 100vw wide
  min-height: 100vh;
`;

const Panel = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px;
`;


const IntroductionText = styled.p`
  font-size: 1.8em;
  color: #4fc3f7;
  text-shadow: 1px 1px 2px #aaa;
  opacity: 1;
`;

const SummaryText = styled.p`
  font-size: 1.5em;
  color: #7678ED;
  text-shadow: 1px 1px 2px #aaa;
  opacity: 1;
`;

const VideoContainer = styled.div`
  width: 80%; 
  margin: 20px auto;
  opacity: 1;
`;

const NeuralNetworkIntroduction = () => {
  const panelsContainerRef = useRef(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.panel');
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: panelsContainerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${panelsContainerRef.current.offsetWidth}`,
        invalidateOnRefresh: true
      }
    });
  }, []);

  return (
    <PanelsContainer ref={panelsContainerRef}>
      <Panel className="panel">
        <IntroductionText>
          How does our brain remember the way to school or the taste of our favorite ice cream? 
          Our amazing brains use tiny parts called 'neurons' to help us think, learn, and remember all these cool things. 
          But did you know computers can learn too? 
          They use something called a 'neural network' - a special brain made for computers! 
          Let's watch a fun video to see how our brain's neurons work!
        </IntroductionText>
      </Panel>
      <Panel className="panel">
        <VideoContainer>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/vyNkAuX29OU?si=pfg1XeKjbjYttYZz"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Neural Network Video"
          ></iframe>
        </VideoContainer>
      </Panel>
      <Panel className="panel">
        <SummaryText>
          Wow, so many neurons working together in our brain, just like a super team! 
          Each one connects with others to help us solve puzzles, play games, and learn new stuff. 
          Computers have a similar team inside them called a neural network. 
          These computer neurons work together to help computers recognize things like faces in photos or understand the music we love. 
          Now that we know about brain neurons, let's discover how these computer neurons work and do amazing things!
        </SummaryText>
      </Panel>
    </PanelsContainer>
  );
};

export default NeuralNetworkIntroduction;
