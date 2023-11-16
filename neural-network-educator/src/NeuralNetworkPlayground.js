import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';
import ParameterSlider from './ParameterSlider';
import { MnistData } from './MnistData';
import theme from './theme';

const AppContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: row;
  overflow: hidden;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SlidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 3;
  overflow: auto;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center; 
  justify-content: center; 
  flex-wrap: wrap;
  overflow: hidden;
`;

const RightColumn = styled.div`
  flex: 1;
  overflow: auto;
`;

const VisualizationContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisorContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Button = styled.button`
  padding: 5px 5x;
  margin: 5px;
  background-color: #84c5f4;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #4fc3f7;
  }
`;



const NeuralNetworkPlayground = () => {
  // State for the model's parameters
  const [epochs, setEpochs] = useState(5);
  const [learningRate, setLearningRate] = useState(0.01);
  const [testTrainSplit, setTestTrainSplit] = useState(0.2);
  const [hiddenLayer1Neurons, setHiddenLayer1Neurons] = useState(10);
  const [hiddenLayer2Neurons, setHiddenLayer2Neurons] = useState(10);
  const [data, setData] = useState(null);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready');

  // Load MNIST data
  useEffect(() => {
    setIsLoading(true);
    const mnistData = new MnistData();
    mnistData.load(testTrainSplit).then(() => { // Updated to include testTrainSplit
      setData(mnistData);
      setIsLoading(false);
      setStatusMessage('Data Loaded');
    });
  }, [testTrainSplit]); // Add testTrainSplit as a dependency
  

  // Function to visualize MNIST data
  const visualizeData = () => {
    if (data) {
      const surface = tfvis.visor().surface({ name: 'MNIST Samples', tab: 'Input Data' });
      const testData = data.nextTestBatch(20); // Fetch 20 test samples using nextTestBatch
      const examples = testData.xs.reshape([20, 28, 28]); // Shape: [20, 28, 28]
  
      for (let i = 0; i < examples.shape[0]; i++) {
        const imageTensor = tf.tidy(() => examples.slice([i, 0, 0], [1, 28, 28]).reshape([28, 28, 1]));
  
        const canvas = document.createElement('canvas');
        canvas.width = 28;
        canvas.height = 28;
        canvas.style = 'margin: 4px;';
        tf.browser.toPixels(imageTensor, canvas);
        surface.drawArea.appendChild(canvas);
      }
    }
  };
  
  

  // Function to create a model
  const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [784], units: hiddenLayer1Neurons, activation: 'relu' }));
    model.add(tf.layers.dense({ units: hiddenLayer2Neurons, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
  
    // Use state value for learning rate, if applicable
    const optimizer = tf.train.adam(learningRate);
  
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  
    return model;
  };
  

  // Function to compile and train the model
  const trainModel = async () => {
    if (data && !isTraining) {
      setIsTraining(true);
      setStatusMessage('Training Started');
      const model = createModel();
  
      const BATCH_SIZE = 64;
      const trainDataSize = 5500; // Sample smaller batch from training data
      const testDataSize = 1000;  // Sample smaller batch from test data
  
      // Fetching data directly without destructuring
      const trainBatch = data.nextTrainBatch(trainDataSize);
      const testBatch = data.nextTestBatch(testDataSize);
  
      // Check if trainBatch and testBatch are valid
      if (!trainBatch || !testBatch) {
        console.error('Invalid trainBatch or testBatch');
        return;
      }
  
      const fitCallbacks = tfvis.show.fitCallbacks(
        { name: 'Training Performance', tab: 'Training' },
        ['loss', 'val_loss', 'acc', 'val_acc'],
        { height: 200 }
      );
  
      await model.fit(trainBatch.xs, trainBatch.labels, {
        batchSize: BATCH_SIZE,
        validationData: [testBatch.xs, testBatch.labels],
        epochs: epochs, // Use state value for epochs
        shuffle: true,
        callbacks: fitCallbacks
      });
  
      // Dispose tensors
      trainBatch.xs.dispose();
      trainBatch.labels.dispose();
      testBatch.xs.dispose();
      testBatch.labels.dispose();
  
      setIsTraining(false);
      setStatusMessage('Training Completed');
    }
  };

  
  
  
  
  
  return (
    <AppContainer>
      <LeftColumn>
        <VisualizationContainer>
        <NeuralNetworkVisualizer 
            onNeuronCountChange={(layer, count) => {
              if (layer === 1) setHiddenLayer1Neurons(count);
              else if (layer === 2) setHiddenLayer2Neurons(count);
            }}
          />
        </VisualizationContainer>
        
        <ControlsContainer>
        <div>
        <strong>Status:</strong> {statusMessage}
      </div>
          <SlidersContainer>
          <ParameterSlider 
            label="Epochs" 
            min={1} 
            max={50} 
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
          />          </SlidersContainer>
          <ButtonContainer>
          <Button>Load Data</Button>
          <Button onClick={visualizeData} disabled={isLoading || isTraining}>Visualize Data</Button>
        <Button onClick={trainModel} disabled={isLoading || isTraining}>Start Training</Button>
          </ButtonContainer>
        </ControlsContainer>
      </LeftColumn>

      <RightColumn>
        <VisorContainer id="tfjs-visor-container">
        </VisorContainer>
      </RightColumn>
    </AppContainer>
  );
};

  


export default NeuralNetworkPlayground;
