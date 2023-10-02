import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Masthead } from './Masthead';
import { Profile } from './Profile';
import { PageWrapper } from 'app/components/PageWrapper';

export function RealmPage() {
  return (
    <>
      <Helmet>
        <title>+Realm Names</title>
        <meta
          name="description"
          content="Realm name system powered by"
        />
      </Helmet>
      <Profile />
    </>
  );
}
