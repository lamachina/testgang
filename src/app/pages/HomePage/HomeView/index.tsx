import * as React from 'react';
import styled from 'styled-components/macro';
import { Title } from '../components/Title';
import { Lead } from '../components/Lead';
import { A } from 'app/components/A';
import { SearchRealmForm } from '../../../components/SearchRealmForm';
import { useTranslation } from 'react-i18next';
import { BigLogo } from 'app/components/BigLogo';
import { Highlight } from 'app/components/Highlight';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';

interface PaginationButtonProps {
  active: boolean;
}

export function HomeView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock data for profiles and pages
  const profiles = Array.from({ length: 100 }, (_, i) => `gang${i + 1}`);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(profiles.length / itemsPerPage);

  const [activePage, setActivePage] = React.useState(1);

  const handleProfileClick = (profile) => {
    navigate(`/test${profile}`);
  };

  const handlePageChange = (page) => {
    // You can implement logic to fetch data for the selected page
    console.log(`Fetching data for page ${page}`);
    setActivePage(page);
  };

  const handleButtonClick = () => {
    navigate('/_realms');
  };

  return (
    <div className="container my-5 px-4">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <LogoWrapper>
            <BigLogo />
          </LogoWrapper>
          <Title as="h1">
            Claim your <Highlight>+bullrun</Highlight> on Bitcoin
          </Title>
          <Lead>
            The Realm Name System (RNS) is the world's first permissionless name system to replace
            domains, built on Bitcoin{' '}
            <A href="https:/atomicals.xyz" target="_blank" rel="noopener noreferrer">
              Atomicals Protocol.
            </A>
          </Lead>
            <ButtonPrimaryNew classes="w-100 btn-lg" onClick={handleButtonClick}>
          <h4>my +bullrun</h4>
            </ButtonPrimaryNew>
        </div>
      </div>
     {/*  <div className="row">
        <div className="col-md-6 offset-md-3">
          <SearchRealmForm redirectOnly={true} redirectPath={'/_search'} />
        </div>
      </div> */}
     {/*  <div className="row mt-4">
        <div className="col-md-12 text-center">
          {profiles
            .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
            .map((profile, index) => (
              <ProfileButton key={index} onClick={() => handleProfileClick(profile)}>
                {profile}
              </ProfileButton>
            ))}
          <br />
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <PaginationButton
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex + 1)}
              active={pageIndex + 1 === activePage}
            >
              {pageIndex + 1}
            </PaginationButton>
          ))}
        </div>
      </div> */}
    </div>
  );
}

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileButton = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #ff914d;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c46429;
  }
`;

const PaginationButton = styled.button<PaginationButtonProps>`
  margin: 5px;
  padding: 10px;
  background-color: ${(props) => (props.active ? '#c46429' : '#ff914d')};
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#c46429' : '#ff914d')};
  }
`;
