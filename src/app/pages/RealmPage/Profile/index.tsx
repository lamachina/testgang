import * as React from 'react';
import styled from 'styled-components/macro';
import { Title } from '../components/Title';
import { Lead } from '../components/Lead';
import { A } from 'app/components/A';
import { ProfileOverview } from './ProfileOverview';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';

export function Profile() {
  const { t } = useTranslation();
  const { name }: any = useParams();
  return (
    <div className="container px-3">
     
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ProfileOverview />
        </div>
      </div>
    </div>
  );
} 
const Highlight = styled.span`
  color: #FF914D;
`;
