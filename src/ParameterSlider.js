import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const SliderContainer = styled.div`
  margin: 10px 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  cursor: pointer;
`;

const ParameterSlider = ({ label, min, max, step, defaultValue, onChange, isLogarithmic }) => {
  const [value, setValue] = useState(isLogarithmic ? Math.log10(defaultValue) : defaultValue);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.to(sliderRef.current, { value: isLogarithmic ? Math.log10(defaultValue) : defaultValue, duration: 0.2 });
  }, [defaultValue, isLogarithmic]);

  const handleChange = (e) => {
    let newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(isLogarithmic ? Math.pow(10, newValue) : newValue);
  };

  return (
    <SliderContainer>
      <Label>{`${label}: ${isLogarithmic ? Math.pow(10, value).toFixed(4) : value}`}</Label>
      <Slider min={min} max={max} step={step} value={value} onChange={handleChange} ref={sliderRef} />
    </SliderContainer>
  );
};

export default ParameterSlider;
