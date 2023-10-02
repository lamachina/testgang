import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import { BigLogo } from 'app/components/BigLogo';
import { FooterBasic } from 'app/components/FooterBasic';
import { NavBarNew } from 'app/components/NavBarNew';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>+Realm Names</title>
        <meta name="description" content="Realm name system powered by" />
      </Helmet>
      <NavBarNew/>
      <div>
      <Features />
      <FooterBasic />
      </div>
    </>
  );
}
