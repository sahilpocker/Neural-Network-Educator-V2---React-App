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

const ActivationSection = () => {
  return (
    <SectionContainer>
      <Text>
        In these hidden layers, each neuron acts like a sensor, responding to specific patterns in the input. This response 
        is called 'activation'. The level of activation is determined by two main factors: 'weights', which influence the 
        neuron's focus on certain input features, and 'biases', which set the threshold for the neuron to activate. These 
        elements fine-tune the neuron's responsiveness, ensuring it reacts appropriately to different inputs.
      </Text>
      {/* Placeholder for any interactive elements or visuals */}
    </SectionContainer>
  );
};

export default ActivationSection;
