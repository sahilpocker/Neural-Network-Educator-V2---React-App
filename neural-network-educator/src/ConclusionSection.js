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
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #84c5f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #4fc3f7;
  }
`;

const ConclusionSection = () => {
  const handleQuizClick = () => {
    // Logic to navigate to the quiz
  };

  const handlePlaygroundClick = () => {
    // Logic to navigate to the playground
  };

  return (
    <SectionContainer>
      <Text>
        Congratulations on exploring the fascinating world of neural networks! Now that you've learned how they work, 
        why not head over to the playground to experiment and learn more!
      </Text>
      <Button onClick={handlePlaygroundClick}>Go to Playground</Button>
    </SectionContainer>
  );
};

export default ConclusionSection;
