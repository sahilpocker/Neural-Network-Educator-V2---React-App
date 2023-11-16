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

const ActivationSection = () => {
  return (
    <SectionContainer>
      <Text>
      Inside the neural network, each neuron is like a mini-detector. 
      They look for specific patterns in the input, a process known as 'activation'. <br>
        
      </br>This depends on two things: 'weights', which highlight certain features in the input, and 'biases', which decide when the neuron should activate. These factors help each neuron respond just right to different kinds of input.
      </Text>
      {/* Placeholder for any interactive elements or visuals */}
    </SectionContainer>
  );
};

export default ActivationSection;
