import React, { useState } from 'react';
import styled from 'styled-components';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';
import DataControlBox from './DataControlBox';
import ParameterSlider from './ParameterSlider';
import TrainingInterface from './TrainingInterface';


const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 20px;
`;

const VisualizationContainer = styled.div`
  margin-right: 20px;
`;

const SlidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const NeuralNetworkPlayground = () => {
  const [epochs, setEpochs] = useState(50); // Default value for epochs
  const [learningRate, setLearningRate] = useState(0.01); // Default learning rate
  const [testTrainSplit, setTestTrainSplit] = useState(0.2); // Default test-train split

  return (
    <AppContainer>
      <VisualizationContainer>
        <NeuralNetworkVisualizer />
        <SlidersContainer>
          <ParameterSlider 
            label="Epochs" 
            min={1} 
            max={500} 
            step={1} 
            defaultValue={epochs} 
            onChange={setEpochs} 
          />
          <ParameterSlider 
            label="Learning Rate" 
            min={-4} 
            max={-1} 
            step={0.1} 
            defaultValue={learningRate} 
            onChange={setLearningRate} 
            isLogarithmic={true} 
          />
          <ParameterSlider 
            label="Test-Train Split" 
            min={0.1} 
            max={0.5} 
            step={0.01} 
            defaultValue={testTrainSplit} 
            onChange={setTestTrainSplit} 
          />
          
        </SlidersContainer>
      </VisualizationContainer>
      <DataControlBox />
      <TrainingInterface />
    </AppContainer>
  );
};

export default NeuralNetworkPlayground;
