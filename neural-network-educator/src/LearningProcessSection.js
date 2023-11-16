import React from 'react';
import styled from 'styled-components';

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
   font-size: 2em;
    color: white;
    font-weight: normal;
    opacity: 1;
    font-family: system-ui;
    line-height: 1.5em;
    width:54%;
`;
const LearningProcessSection = () => {
  return (
    <SectionContainer>
      <Text>
      Think of training a neural network like coaching a cricket player. 
      At first, the player's aim might not be perfect. By observing and adjusting their technique,
       they get better over time.
       <br></br> 
       In our network, it begins with guesses. But as it learns from the MNIST dataset, it fine-tunes its weights and biases to reduce errors, much like coaching the player to improve their aim. Each tweak brings the network closer to recognizing digits accurately.
      </Text>
      {/* Placeholder for any interactive elements or visuals */}
    </SectionContainer>
  );
};

export default LearningProcessSection;
