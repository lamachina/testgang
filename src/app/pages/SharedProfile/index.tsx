import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { NavBarNew } from 'app/components/NavBarNew';
import { RealmsView } from '../RealmsPage/RealmsView';
import { ProfileOverview } from '../RealmPage/Profile/ProfileOverview';

export function SharedProfile() {
  return (
    <>
      <Helmet>
        <title>+Realm Names</title>
        <meta name="description" content="Realm name system powered by" />
      </Helmet>
      <NavBarNew />
      <div className="container px-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ProfileOverview/>
          </div>
        </div>
      </div>
    </>
  );
}
