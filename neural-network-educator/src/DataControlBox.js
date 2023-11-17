import React, { useState } from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  width: 300px; 
  padding: 20px;
  margin-right: 20px;
  background-color: #f3f3f3; // Light background for the box
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const LoadButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 20px;
  background-color: #4CAF50; // Green color
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049; // Darker shade on hover
  }
`;

const DataVisualization = styled.div`
  height: 200px; 
  overflow-y: auto; // Scroll for overflow
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const DatasetInfo = styled.p`
  font-size: 14px;
  color: #666;
`;

const DataControlBox = () => {
  const [datasetInfo, setDatasetInfo] = useState('');

  const handleLoadData = () => {
    // Implement data loading logic
    // Update dataset information
    setDatasetInfo('MNIST dataset loaded. 70,000 images, 28x28 pixels each.');
  };

  return (
    <BoxContainer>
      <LoadButton onClick={handleLoadData}>Load Data</LoadButton>
      <DataVisualization>
        {/* Data visualization elements go here */}
      </DataVisualization>
      <DatasetInfo>{datasetInfo}</DatasetInfo>
    </BoxContainer>
  );
};

export default DataControlBox;
