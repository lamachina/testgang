import React from 'react';
import styled from 'styled-components';

const lightTheme = {
  primary: 'rgba(134, 93, 255,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  background: 'rgba(255,255,255,1)',
  backgroundVariant: 'rgba(251,249,249,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
};

const darkTheme = {
  primary: 'rgba(220,120,95,1)',
  text: 'rgba(241,233,231,1)',
  textSecondary: 'rgba(241,233,231,0.6)',
  background: 'rgba(0,0,0,1)',
  backgroundVariant: 'rgba(28,26,26,1)',
  border: 'rgba(241,233,231,0.15)',
  borderLight: 'rgba(241,233,231,0.05)',
};

const ColorText = styled.p`
  color: ${({ color }) => color};
`;

const ColorTextDisplay = () => {
  return (
    <div>
      <ColorText color={lightTheme.primary}>Primary Color Light Theme</ColorText>
      <ColorText color={lightTheme.text}>Text Color Light Theme</ColorText>
      <ColorText color={lightTheme.textSecondary}>Text Secondary Color Light Theme</ColorText>
      <ColorText color={lightTheme.background}>Background Color Light Theme</ColorText>
      <ColorText color={lightTheme.border}>Border Color Light Theme</ColorText>

      <ColorText color={darkTheme.primary}>Primary Color Dark Theme</ColorText>
      <ColorText color={darkTheme.text}>Text Color Dark Theme</ColorText>
      <ColorText color={darkTheme.textSecondary}>Text Secondary Color Dark Theme</ColorText>
      <ColorText color={darkTheme.background}>Background Color Dark Theme</ColorText>
      <ColorText color={darkTheme.border}>Border Color Dark Theme</ColorText>
    </div>
  );
};

export default ColorTextDisplay;
