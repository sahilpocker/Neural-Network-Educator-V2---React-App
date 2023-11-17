import React, { useState, useEffect,useCallback } from 'react';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';
import ParameterSlider from './ParameterSlider';
import { MnistData } from './MnistData';




const MainGridContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 2.5fr; // Adjust ratios as needed
  height: 100vh;
`;

const MiddleFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;



const ControlsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const StatusMessageContainer = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: #84c5f4; // You can adjust the color to fit your theme
  color: black;
  border-radius: 5px;
  max-width: 300px; // Adjust as needed
  word-wrap: break-word;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // Optional shadow for depth
  font-size: 0.9em;
  display: flex;
  overflow: scroll;
  align-items: center;
  justify-content: center;
  height: 22vh;
  width: 20vh;
  flex-direction: column;
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
  const [showAnalyseButton, setShowAnalyseButton] = useState(false);
  const [lastEpochMetrics, setLastEpochMetrics] = useState(null);

window.tf = tf;
window.tfvis = tfvis;

const createModel = useCallback(() => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [784], units: hiddenLayer1Neurons, activation: 'relu' }));
  model.add(tf.layers.dense({ units: hiddenLayer2Neurons, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  const optimizer = tf.train.adam(learningRate);
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}, [hiddenLayer1Neurons, hiddenLayer2Neurons, learningRate]);
  // Load MNIST data
  useEffect(() => {
    tfvis.visor().open();
    setIsLoading(true);
    const mnistData = new MnistData();
    mnistData.load(testTrainSplit).then(() => {
      window.data = mnistData; // Set to global scope
      setData(mnistData);
      setIsLoading(false);
      setStatusMessage('Data Loaded');
    });

    const model = createModel();
    window.model = model; // Set to global scope
    setModel(model);
  }, [testTrainSplit,createModel]);

  

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
  
  


  

  // Function to compile and train the model
  const trainModel = async () => {
    if (data && !isTraining) {
      setIsTraining(true);
      setShowAnalyseButton(false);
      setStatusMessage('Training Started');
      const model = createModel(); 
      setModel(model);
  
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
  
      const history = await model.fit(trainBatch.xs, trainBatch.labels, {
        batchSize: BATCH_SIZE,
        validationData: [testBatch.xs, testBatch.labels],
        epochs: epochs,
        shuffle: true,
        callbacks: fitCallbacks
      });
      
      // Extract final epoch metrics
      const finalEpoch = history.history;
      const finalAccuracy = finalEpoch.acc[finalEpoch.acc.length - 1];
      const finalValAccuracy = finalEpoch.val_acc[finalEpoch.val_acc.length - 1];
      const finalLoss = finalEpoch.loss[finalEpoch.loss.length - 1];
      const finalValLoss = finalEpoch.val_loss[finalEpoch.val_loss.length - 1];
      
      // Update status message
      setStatusMessage(`Training Completed. Final Accuracy: ${finalAccuracy.toFixed(2)}, Final Validation Accuracy: ${finalValAccuracy.toFixed(2)}, Final Loss: ${finalLoss.toFixed(2)}, Final Validation Loss: ${finalValLoss.toFixed(2)}`);

      const testBatchForAnalysis = data.nextTestBatch(1000);
      const predictions = model.predict(testBatchForAnalysis.xs).argMax(-1);
      const labels = testBatchForAnalysis.labels.argMax(-1);

      setLastEpochMetrics({ predictions, labels }); // Store in state
  
      // Dispose tensors
      trainBatch.xs.dispose();
      trainBatch.labels.dispose();
      testBatch.xs.dispose();
      testBatch.labels.dispose();
      testBatchForAnalysis.xs.dispose(); // Dispose this tensor if it's not needed elsewhere

  
      setIsTraining(false);
      setShowAnalyseButton(true);

    }
  };

  const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];


  const analyseModel = async() => {
    if (!window.model || !lastEpochMetrics) {
      console.error('Model or last epoch metrics are not available for analysis');
      return;
    }
  
    const { predictions, labels } = lastEpochMetrics;
  
    // Compute per-class accuracy and confusion matrix
    const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, predictions);
  const accuracyContainer = { name: 'Per-Class Accuracy', tab: 'Model Analysis' };
  tfvis.show.perClassAccuracy(accuracyContainer, classAccuracy, classNames);

  // Confusion Matrix
  const confMatrix = await tfvis.metrics.confusionMatrix(labels, predictions);
  const matrixContainer = { name: 'Confusion Matrix', tab: 'Model Analysis' };
  tfvis.render.confusionMatrix(matrixContainer, {
    values: confMatrix,
    tickLabels: classNames
  });
   
  
    // Show per-class accuracy
    const accuracySurface = { name: 'Per-Class Accuracy', tab: 'Model Analysis' };
    tfvis.show.perClassAccuracy(accuracySurface, classAccuracy, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  
    // Show confusion matrix
    const matrixSurface = { name: 'Confusion Matrix', tab: 'Model Analysis' };
    tfvis.render.confusionMatrix(matrixSurface, { values: confMatrix });
  };
  
  
  

  
  

  return (
    <MainGridContainer>

        <VisualizationContainer>
          <NeuralNetworkVisualizer 
              onNeuronCountChange={(layer, count) => {
                if (layer === 1) setHiddenLayer1Neurons(count);
                else if (layer === 2) setHiddenLayer2Neurons(count);
              }}
            />
        </VisualizationContainer>

        <MiddleFlexBox>
          <StatusMessageContainer>
          <strong>Status:</strong> {statusMessage}
          </StatusMessageContainer>
          <ButtonContainer>
            {showAnalyseButton && <Button onClick={analyseModel}>Analyse</Button>}
            <Button onClick={visualizeData} disabled={isLoading || isTraining}>Visualize Data</Button>
            <Button onClick={trainModel} disabled={isLoading || isTraining}>Start Training</Button>
          </ButtonContainer>
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
          
        </MiddleFlexBox>
        
        <ControlsContainer>
        
          
        </ControlsContainer>

        <VisorContainer id="tfjs-visor-container">
        </VisorContainer>
      </MainGridContainer>
  );
};

  


export default NeuralNetworkPlayground;
