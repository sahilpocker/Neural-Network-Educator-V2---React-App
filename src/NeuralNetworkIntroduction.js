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
font-size: 2em;
color: white;
font-weight: normal;
opacity: 1;
font-family: system-ui;
line-height: 1.5em;
width:54%;
`;

const SummaryText = styled.p`
font-size: 2em;
color: white;
font-weight: normal;
opacity: 1;
font-family: system-ui;
line-height: 1.5em;
width:54%;
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
          How does our brain remember the way to school 
          or the taste of our favorite ice cream? Our amazing brains 
          use tiny parts called 'neurons' to help us 
          think, learn, and remember all these cool things. 
          <br /><br />
          But did you know computers can learn too? They use 
          something called a 'neural network' - a special 
          brain made for computers! Let's watch a fun video to see how our brain's neurons work!
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
        Wow, so many neurons working together in our brain, just like a super team! Each neuron connects with others, forming a network that helps us solve puzzles, play games, and learn new things.
        <br /><br />

        But guess what? Computers have their own super team too! It's called a neural network. These computerized neurons team up to perform incredible tasks, like recognizing faces in photos or understanding our favorite music.
        <br /><br />

        Now that we've seen how our brain's neurons work, let's dive deeper and explore how these computer neurons work and do amazing things!
        </SummaryText>
      </Panel>
    </PanelsContainer>
  );
};

export default NeuralNetworkIntroduction;
