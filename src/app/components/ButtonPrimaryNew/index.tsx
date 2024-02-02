import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  disabled?: boolean;
  onClick?: any;
  classes?: string;
  children: any;
  block?: boolean;
}

export function ButtonPrimaryNew({
  disabled,
  block,
  onClick,
  classes,
  children,
}: Props) {
  return (
    <Div>
      <Button
        className={
          `btn ${classes ? classes : ''}` +
          (+!!block ? ' w-100 ' : '') +
          (disabled ? ' disabled ' : ' ')
        }
        onClick={onClick}
      >
        {children}
      </Button>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  border: solid 2px transparent;
  text-align: center;
  font-weight: normal;
  display: block;
  color: #eee;
  width: 100%;
  &:hover {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  background-color: rgba(170, 228, 186,1);
  background-image: rgba(170, 228, 186,1);
  color: #333;

  &:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    background-color: rgba(170, 228, 186,0.6);
  background-image: rgba(170, 228, 186,0.6);
  }

  &.disabled {
    opacity: 0.5;
    color: #000;
    &:hover {
      cursor: not-allowed;
      background-image: linear-gradient(
        270deg,
        hsl(210, 85%, 45%) 0%,
        #0abcf9 95%
      );
    }
    border: dashed 2px #eee;
  }
`;
