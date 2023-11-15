import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';

const DrawableCanvas = ({ onDrawingChange }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);

    const canvasWidth = 300;
    const canvasHeight = 300;
    const lineWidth = 20;

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
            <button onClick={handleClearCanvas}>Clear</button>
            <button onClick={handleUndo}>Undo</button>
        </>
    );
};

export default DrawableCanvas;
