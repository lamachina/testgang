import * as React from 'react';
import styled from 'styled-components/macro';
import { Title } from '../components/Title';
import { Lead } from '../components/Lead';
import { A } from 'app/components/A';
import { GithubRepoForm } from './GithubRepoForm';
import { useTranslation } from 'react-i18next';
import { BigLogo } from 'app/components/BigLogo';

export function Features() {
    const { t } = useTranslation();

    return (
        <div className="container my-5 px-4">
            <div className="row">
                <div className="col-md-8 offset-md-2 text-center">
                    <LogoWrapper>
                        <BigLogo />
                    </LogoWrapper>
                    <Title as="h1">
                        Claim your <Highlight>+name</Highlight> on Bitcoin
                    </Title>
                    <Lead>
                        The Realm Name System (RNS) is the world's first permissionless name system to replace domains, built on Bitcoin{' '}
                        <A href="https:/atomicals.xyz" target="_blank" rel="noopener noreferrer">
                            Atomicals Protocol.
                        </A>
                    </Lead>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <GithubRepoForm />
                </div>
            </div>
        </div>
    );
}
const Highlight = styled.span`
    color: #ff914d;
`;

const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
