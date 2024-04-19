import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';
import ParameterSlider from './ParameterSlider';
import { MnistData } from './MnistData';
import TestDrawableCanvas from './TestCanvas';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css'



const showVisor = () => {
  tfvis.visor().toggle();
};

const TooltipIcon = styled.span`
  margin-left: 5px;
  cursor: pointer;
`;
const StyledTooltip = styled(Tooltip)`
  max-width: 300px; /* Set the maximum width */
  background-color: #fff; /* Set the background color */
  color: #333; /* Set the text color */
  border-radius: 4px; /* Add border radius for rounded corners */
  padding: 8px 12px; /* Add some padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  text-align: left; /* Align the text to the left */
  z-index: 50;
  &[data-tooltip-place="left"] {
    margin-right: 10px; /* Add some spacing to the right of the tooltip */
  }
`;


const Modal = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

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

      console.log('Training batch examples:');
for (let i = 0; i < 5; i++) {
  const example = trainBatch.xs.slice([i, 0], [1, 784]);
  console.log(`Example ${i}:`, example.arraySync());
}

console.log('Test batch examples:');
for (let i = 0; i < 5; i++) {
  const example = testBatch.xs.slice([i, 0], [1, 784]);
  console.log(`Example ${i}:`, example.arraySync());
}
  
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
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [mnistSamples, setMnistSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPrediction(null);
    setCanvasImage(null);
    setSelectedSample(null);
  };

  const predictDrawing = async () => {
    if (!window.model || (!canvasImage && !selectedSample)) {
      console.error('Model, canvas image, or selected sample is not available for prediction');
      return;
    }
  
    let processedTensor;
  
    if (selectedSample) {
      processedTensor = tf.tensor(selectedSample)
        .reshape([1, 784]);
    } else {
      const image = new Image();
      image.src = canvasImage;
      await new Promise((resolve) => {
        image.onload = resolve;
      });
  
      const img = await tf.browser.fromPixels(image, 1);
      processedTensor = await tf.tidy(() => {
        let tensor = img.toFloat().div(tf.scalar(255));  // Normalize the pixel values
        tensor = tf.image.resizeBilinear(tensor, [28, 28]);
        tensor = tensor.reshape([1, 784]);
        return tensor;
      });
    }
  
    // Create a new canvas for the processed image
    const processedCanvas = document.createElement('canvas');
    processedCanvas.width = 28;
    processedCanvas.height = 28;
    const ctx = processedCanvas.getContext('2d');
    await tf.browser.toPixels(processedTensor.reshape([28, 28]), processedCanvas);  // Draw the processed image on the canvas
  
    // Store the processed image data URL in the state
    setProcessedImage(processedCanvas.toDataURL());
  
    // Log the processed input tensor values
    console.log('Processed input tensor values:', processedTensor.arraySync());
  
    const output = model.predict(processedTensor);
    const predictions = output.dataSync();
    console.log('Predictions:', predictions);
    const predictedClass = predictions.indexOf(Math.max(...predictions));
    setPrediction(predictedClass);
    console.log('Predicted digit:', predictedClass);
  
    // Dispose the tensors
    processedTensor.dispose();
    output.dispose();
  };


  const handleDrawingChange = (dataURL) => {
    setCanvasImage(dataURL);
    setSelectedSample(null);
  };

  const handleSampleClick = (sample) => {
    setSelectedSample(sample);
    setCanvasImage(null);
  };

  useEffect(() => {
    if (data) {
      const testData = data.nextTestBatch(20);
      const samples = testData.xs.arraySync();
      setMnistSamples(samples);
    }
  }, [data]);


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
            {showAnalyseButton && <Button onClick={openModal}>Test</Button>}

            <Button onClick={visualizeData} disabled={isLoading || isTraining}>Visualize Data</Button>
            <Button onClick={trainModel} disabled={isLoading || isTraining}>Start Training</Button>
                        <Button onClick={showVisor}>Toggle Monitor</Button>


          </ButtonContainer>
         
          

          <SlidersContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ParameterSlider
              label="Epochs"
              min={1}
              max={50}
              step={1}
              defaultValue={epochs}
              onChange={setEpochs}
            />
            <TooltipIcon
              data-tooltip-id="epochsTooltip"
              data-tooltip-content="An epoch is a complete pass through the entire training dataset. Increasing the number of epochs allows the model to learn more from the data, but may also lead to overfitting."
            >
              ⓘ
            </TooltipIcon>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ParameterSlider
              label="Learning Rate"
              min={-4}
              max={-1}
              step={0.1}
              defaultValue={learningRate}
              onChange={setLearningRate}
              isLogarithmic={true}
            />
            <TooltipIcon
              data-tooltip-id="learningRateTooltip"
              data-tooltip-content="The learning rate determines the step size at which the model's weights are updated during training. A higher learning rate can lead to faster convergence but may overshoot the optimal solution, while a lower learning rate can lead to slower convergence but may find a better solution."
            >
              ⓘ
            </TooltipIcon>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ParameterSlider
              label="Test-Train Split"
              min={0.1}
              max={0.5}
              step={0.01}
              defaultValue={testTrainSplit}
              onChange={setTestTrainSplit}
            />
            <TooltipIcon
              data-tooltip-id="testTrainSplitTooltip"
              data-tooltip-content="The test-train split determines the proportion of the dataset that is used for evaluating the model's performance (test set) and the proportion used for training the model (train set). A common split is 20% for testing and 80% for training."
            >
              ⓘ
            </TooltipIcon>
          </div>
        </SlidersContainer>



          
        </MiddleFlexBox>
        
        <ControlsContainer>
        
          
        </ControlsContainer>

        <VisorContainer id="tfjs-visor-container">
        </VisorContainer>
        <Modal show={isModalOpen}>
        <ModalContent>
          <h2>Test Drawing</h2>
          <TestDrawableCanvas onDrawingChange={handleDrawingChange} />

          <h3>Or Select an MNIST Sample:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {mnistSamples.map((sample, index) => (
    <div
      key={index}
      style={{
        border: selectedSample && JSON.stringify(sample) === JSON.stringify(selectedSample) ? '2px solid blue' : 'none',
        margin: '5px',
        cursor: 'pointer',
      }}
      onClick={() => handleSampleClick(sample)}
    >
      <canvas
        width="28"
        height="28"
        style={{ margin: '4px' }}
        ref={(canvas) => {
          if (canvas) {
            const imageTensor = tf.tidy(() => tf.tensor(sample).reshape([28, 28, 1]));
            tf.browser.toPixels(imageTensor, canvas);
            imageTensor.dispose();
          }
        }}
      />
    </div>
  ))}
</div>

          {processedImage && (
            <div>
              <h3>Processed Image:</h3>
              <img src={processedImage} alt="Processed" />
            </div>
          )}

          {prediction !== null && <p>Predicted Digit: {prediction}</p>}
          <Button onClick={predictDrawing}>Predict</Button>
          <Button onClick={closeModal}>Close</Button>
        </ModalContent>
      </Modal>
<StyledTooltip id="epochsTooltip" place="left" />
<StyledTooltip id="learningRateTooltip" place="left" />
<StyledTooltip id="testTrainSplitTooltip" place="left" />

      </MainGridContainer>
  );
};

  


export default NeuralNetworkPlayground;
