import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  border: 3px solid #84c5f4;
  border-radius: 10px;
  padding: 15px;
  background: #f0f8ff;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 30px repeat(28, 20px);
  grid-gap: 1px;
`;

const NumberCell = styled.div`
  font-size: 10px;
  color: #aaa;
  text-align: center;
  line-height: 20px; // Align text vertically
  width: 20px;
  height: 20px;
`;

const Pixel = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => `rgb(${props.value}, ${props.value}, ${props.value})`};
`;

const PixelGrid = ({ gridData }) => {
    return (
        <Frame>
            <GridContainer>
                {/* Empty top-left corner cell */}
                <NumberCell />
                {/* Top row for column numbers */}
                {Array.from({ length: 28 }, (_, i) => (
                    <NumberCell key={`top-${i}`}>{i + 1}</NumberCell>
                ))}
                {/* Side column for row numbers and grid pixels */}
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
