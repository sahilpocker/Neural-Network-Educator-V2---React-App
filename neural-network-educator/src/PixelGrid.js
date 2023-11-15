import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  border: 3px solid #84c5f4;
  border-radius: 10px;
  padding: 15px;
  background: #f0f8ff;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto repeat(28, 1fr);
  grid-gap: 1px;
  width: 100%;
  max-width: 500px;
`;

const NumberCell = styled.div`
  font-size: 10px;
  color: #aaa;
  text-align: center;
  line-height: 1.5;
`;

const Pixel = styled.div`
  background-color: ${props => `rgb(${props.value}, ${props.value}, ${props.value})`};
  position: relative;
  width: 100%;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%; // Maintains aspect ratio
  }
`;

const PixelGrid = ({ gridData }) => {
    return (
        <Frame>
            <GridContainer>
                <NumberCell /> {/* Top-left corner cell */}
                {Array.from({ length: 28 }, (_, i) => (
                    <NumberCell key={`top-${i}`}>{i + 1}</NumberCell>
                ))}
                {gridData.map((row, rowIndex) => [
                    <NumberCell key={`side-${rowIndex}`}>{rowIndex + 1}</NumberCell>,
                    ...row.map((value, colIndex) => (
                        <Pixel key={`${rowIndex}-${colIndex}`} value={value} />
                    ))
                ])}
            </GridContainer>
        </Frame>
    );
};

export default PixelGrid;
