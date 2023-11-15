import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #282c34;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Header = () => (
  <StyledHeader>
    <h1>Neural Network Playground</h1>
  </StyledHeader>
);

export default Header;
