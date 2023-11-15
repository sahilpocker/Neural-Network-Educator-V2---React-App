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
  font-size: 1.5em;
  color: #4fc3f7;
  text-shadow: 1px 1px 2px #aaa;
`;
const LearningProcessSection = () => {
  return (
    <SectionContainer>
      <Text>
        The learning process in neural networks resembles training a cricket player to bowl accurately. Initially, the 
        bowler's aim might be off. By observing the distance between the ball and the stumps, we can adjust the bowler's 
        technique. Similarly, our network starts with random predictions. Through training with the MNIST dataset, it adjusts 
        its weights and biases to minimize the 'cost', which is the difference between its predictions and the actual labels. 
        Each adjustment is a step towards more accurate digit recognition, akin to guiding the bowler to hit the stumps more 
        consistently.
      </Text>
      {/* Placeholder for any interactive elements or visuals */}
    </SectionContainer>
  );
};

export default LearningProcessSection;
