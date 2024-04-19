import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 5x;
  margin: 5px;
  background-color: #84c5f4;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
`

const TestDrawableCanvas = ({ onDrawingChange }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);

    const canvasWidth = 300;
    const canvasHeight = 300;
    const lineWidth = 25;

    const updateDataURL = () => {
        if (stageRef.current) {
            const dataUrl = stageRef.current.toDataURL();
            onDrawingChange && onDrawingChange(dataUrl);
        }
    };

    useEffect(() => {
        // Update the data URL whenever the lines change
        updateDataURL();
    }, [lines]);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        setLines([...lines, { points: [point.x, point.y] }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        const newLines = lines.map(line => ({ ...line }));
        const lastLine = newLines[newLines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        setLines(newLines);
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const handleClearCanvas = () => {
        setLines([]);
    };
    
    const handleUndo = () => {
        setLines(lines.slice(0, -1));
    };

    return (
        <>
            <Stage
                ref={stageRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                    <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill="white" />
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="black"
                            strokeWidth={lineWidth}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                        />
                    ))}
                </Layer>
            </Stage>
            <Button onClick={handleClearCanvas}>Clear</Button>
            <Button onClick={handleUndo}>Undo</Button>
        </>
    );
};

export default TestDrawableCanvas;
