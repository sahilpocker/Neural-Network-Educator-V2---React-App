import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #282c34;
  color: white;
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => (
  <StyledFooter>
    <p>© 2023 Neural Network Playground</p>
  </StyledFooter>
);

export default Footer;
