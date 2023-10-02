import * as React from 'react';
import styled from 'styled-components/macro';
import { Title } from '../components/Title';
import { Lead } from '../components/Lead';
import { SubTitle } from '../components/SubTitle';
import { P } from '../components/P';
import { A } from 'app/components/A';
import { GithubRepoForm } from './GithubRepoForm';
import { ThemeSwitch } from './ThemeSwitch';
import { LanguageSwitch } from './LanguageSwitch';
import { ReactComponent as StateIcon } from './assets/state.svg';
import { ReactComponent as CSSIcon } from './assets/css.svg';
import { ReactComponent as INTLIcon } from './assets/intl.svg';
import { ReactComponent as TSLogo } from './assets/ts.svg';
import { ReactComponent as RouteIcon } from './assets/route.svg';
import { ReactComponent as SEOIcon } from './assets/seo.svg';
import { ReactComponent as InstantFeedbackIcon } from './assets/instant-feedback.svg';
import { ReactComponent as ScaffoldingIcon } from './assets/scaffolding.svg';
import { ReactComponent as CodeAnalysisIcon } from './assets/code-analysis.svg';
import { useTranslation } from 'react-i18next';
import { Link } from 'app/components/Link';
import { messages } from '../messages';
import { BigLogo } from 'app/components/BigLogo';

export function Features() {
  const { t } = useTranslation();

  return (
    <div className="container px-4">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <LogoWrapper>
            <BigLogo />
          </LogoWrapper>
          <Title as="h1">Claim your <Highlight>+name</Highlight> on Bitcoin</Title>
          <Lead>
            The +Realm Name System is the world's first practical alternative to domain names powered by Bitcoin
            {' '}
            <A
              href="https:/atomicals.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
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
  color: #FF914D;
`;

const LogoWrapper = styled.div`

display: flex;
justify-content: center;
`;
