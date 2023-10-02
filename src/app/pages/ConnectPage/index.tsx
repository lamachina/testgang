import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { FooterBasic } from 'app/components/FooterBasic';
import { ConnectView } from 'app/components/ConnectView';
import { useAppGlobalStateSlice } from 'app/slice';
import styled from 'styled-components/macro';
import {
  selectFundingAddress,
  selectFundingPublicKey,
  selectPrimaryAddress,
  selectPrimaryPublicKey,
} from 'app/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { WalletInfo } from './WalletInfo';
import { useNavigate } from "react-router-dom";
import {
  selectFunding,
  selectPrimary,
} from 'app/components/ConnectView/slice/selectors';
import { ButtonSecondaryNew } from 'app/components/ButtonSecondaryNew';
import { NavBarNew } from 'app/components/NavBarNew';

export function ConnectPage() {
  const globalSlice = useAppGlobalStateSlice();
  const navigate = useNavigate();
  const primaryAddress = useSelector(selectPrimaryAddress);
  const primaryPublicKey = useSelector(selectPrimaryPublicKey);
  const fundingAddress = useSelector(selectFundingAddress);
  const fundingPublicKey = useSelector(selectFundingPublicKey);
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(globalSlice.actions.clearSession());
    //  dispatch(push('/connect'));
  }

  function gotoConnect() {
    navigate('/connect');
  }

  function isLoggedIn() {
    return primaryAddress;
  }

  const onOpenHome = (evt: any) => {
    dispatch(push('/'));
    evt.preventDefault();
    return false;
  };
  return (
    <>
      <Helmet>
        <title>+Realm Names</title>
        <meta name="description" content="Realm name system powered by" />
      </Helmet>
      <NavBarNew />
      <Container className="container mt-5 pt-5">
        <div className="row">
          <div className="col">
            {!isLoggedIn() && <ConnectView />}
            {isLoggedIn() && (
              <>
                <WalletInfo
                  primaryAddress={primaryAddress}
                  fundingAddress={fundingAddress}
                  onDisconnect={onLogout}
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div``;
