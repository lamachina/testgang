import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as StarIcon } from './assets/star.svg';
import { ReactComponent as NewWindowIcon } from './assets/new-window.svg';
import { A } from 'app/components/A';

interface Props {
  placeholder: string;
  value: string;
  onChange: any;
}

export function InputSearchRealms({ placeholder, value, onChange }: Props) {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="realm-addon">+</span>
        <input type="text" className="form-control" placeholder={placeholder} aria-label="realmname" aria-describedby="realm-addon" onChange={onChange} value={value} />
      </div>
    </>
  );
}

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;

const Info = styled.div`
  display: flex;
`;

const StarCount = styled.div`
  display: flex;
  align-items: center;
  min-width: 6rem;
  .icon {
    margin-right: 0.125rem;
  }
`;
