import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useSlice } from './slice';
import { LoginScreen } from './LoginScreen';
import { GenerateScreen } from './GenerateScreen';
import { PasswordScreen } from './PasswordScreen';
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js';

import {
  selectConfirmedPermanent,
  selectConfirmedStored,
  selectNewPassword,
  selectPhrase,
  selectPrimary,
  selectFunding,
  selectShowLoginConfirm,
  selectConfirmPassword,
} from './slice/selectors';
import { AES_SALT, appGlobalActions, useAppGlobalStateSlice } from 'app/slice';
import { updateSessionCookie } from 'utils/session-validator';
import { addressToP2PKH, addressToScripthash, detectAddressTypeToScripthash } from 'utils/builder/helpers/address-helpers';

interface Props {
  onCompleted?: any;
}

export function ConnectView({ onCompleted }: Props) {
  const { actions } = useSlice();
  const globalSlice = useAppGlobalStateSlice();
  const [cookies, setCookie]: any = useCookies([]);
  const dispatch = useDispatch();
  
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });

  const [unisatInstalled, setUnisatInstalled] = useState(false);
  
  const showLoginConfirm = useSelector(selectShowLoginConfirm);
  const confirmedPermanent = useSelector(selectConfirmedPermanent);
  const confirmedStored = useSelector(selectConfirmedStored);
  const funding = useSelector(selectFunding);
  const primary = useSelector(selectPrimary);
  const confirmPassword = useSelector(selectConfirmPassword);
  const newPassword = useSelector(selectNewPassword);

  // Define the structure of the self object
  const selfRef = useRef<{ accounts?: string[] }>({
    accounts: [],
  });

  const self = selfRef.current;
  const atom = (window as any).atom;

  // Function to connect the wallet and log information
  const connectWallet = async () => {
    try {
      const result = await atom.requestAccounts();
      handleAccountsChanged(result);
      const publicKey = await atom.getPublicKey();

      // Log wallet information
      console.log('Connected Accounts:', accounts);
      console.log('Public Key:', publicKey);
      console.log('Address:', address);
      console.log('Balance:', balance);
    } catch (error) {
      console.error('Error connecting to the wallet:', error);
    }
  };



  const handleAccountsChanged = (_accounts: string[]) => {
    if (self.accounts && self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }

    self.accounts = _accounts;

    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);
      setAddress(_accounts[0]);
      setPublicKey(publicKey);
      
    } else {
      setConnected(false);
    }
  };

  function onChangePhrase(e) {
    dispatch(
      actions.triggerChangePhrase({
        phrase: e.target.value,
      })
    );
  }

  function onChangePath(e) {
    dispatch(
      actions.changePathBase({
        pathBase: e.target.value,
      })
    );
  }

  function onGenerateProfile() {
    dispatch(actions.triggerGenerateProfile());
  }

  function onChangeConfirmedStored(val) {
    dispatch(actions.changeConfirmStored(val));
  }

  function onChangeConfirmedPermanent(val) {
    dispatch(actions.changeConfirmPermanent(val));
  }

  function onChangePassword(val) {
    dispatch(actions.changePassword(val.target.value));
  }
  function onChangePasswordConfirm(val) {
    dispatch(actions.changePasswordConfirm(val.target.value));
  }

  function onAccept() {
    dispatch(actions.onAccept());
  }
  function onResetConnect() {
    dispatch(actions.clear());
  }

  function onAcceptPassword() {
    //const encryptedPhrase = CryptoJS.AES.encrypt(phrase, confirmPassword + AES_SALT).toString();

    const encryptedPrimaryKey = CryptoJS.AES.encrypt(
      primary.addressPrivateKey,
      confirmPassword + AES_SALT
    ).toString();

    const encryptedFundingKey = CryptoJS.AES.encrypt(
      funding.addressPrivateKey,
      confirmPassword + AES_SALT
    ).toString();

    const sha256d = CryptoJS.SHA256(CryptoJS.SHA256(confirmPassword)).toString();

    /* const bytesPhrase = CryptoJS.AES.decrypt(encryptedPhrase, confirmPassword + AES_SALT);
    const originalTextPhrase = bytesPhrase.toString(CryptoJS.enc.Utf8);
    if (originalTextPhrase !== phrase) {
      throw new Error(`Critical error: Invalid matching phrase`);
    } */

    const bytesPrimaryKey = CryptoJS.AES.decrypt(encryptedPrimaryKey, confirmPassword + AES_SALT);
    const originalTextPrimary = bytesPrimaryKey.toString(CryptoJS.enc.Utf8);
    if (originalTextPrimary !== primary.addressPrivateKey) {
      throw new Error(`Critical error: Invalid matching primary.addressPrivateKey`);
    }

    const bytesFundingKey = CryptoJS.AES.decrypt(encryptedFundingKey, confirmPassword + AES_SALT);
    const originalTextFunding = bytesFundingKey.toString(CryptoJS.enc.Utf8);
    if (originalTextFunding !== funding.addressPrivateKey) {
      throw new Error(`Critical error: Invalid matching funding.addressPrivateKey`);
    }
    const newSession = {
      //encryptedPhrase,
      encryptedPrimaryKey,
      encryptedFundingKey,
      primaryPublicKey: primary.addressPublicKey,
      fundingPublicKey: funding.addressPublicKey,
      sha256d,
    };

    dispatch(globalSlice.actions.setEncryptedSession(newSession));
    dispatch(actions.clear());
    setCookie(
      'bpKey',
      JSON.stringify({
        encryptedPrimaryKey,
        encryptedFundingKey,
        sha256d,
        primaryPublicKey: primary.addressPublicKey,
        fundingPublicKey: funding.addressPublicKey,
      }),
      { path: '/', sameSite: 'none', secure: true, maxAge: 3600 * 24 * 365 }
    );
    updateSessionCookie(newSession);
    if (onCompleted) {
      onCompleted();
    }
  }
  
  function onWizz() {
    if (atom) {
      setUnisatInstalled(true);
      // Automatically connect the wallet when Unisat is detected
      connectWallet();
    } 
     // Dispatch the action with the desired primaryAddress
     const newSession = {
      primaryPublicKey: address,
    };
    dispatch(globalSlice.actions.setEncryptedSession(newSession));
    setCookie(
      'bpKey',
      JSON.stringify({
        primaryPublicKey: address,
      }),
      { path: '/', sameSite: 'none', secure: true, maxAge: 3600 * 24 * 365 }
    );
    updateSessionCookie(newSession);
  }
  

  return (
    <Wrapper>
      {showLoginConfirm === 'CONNECT' && (
        <LoginScreen
          //phrase={phrase}
          onAcceptWizz={onWizz}
          onChangePhrase={onChangePhrase}
          onChangePath={onChangePath}
          onGenerateProfile={onGenerateProfile}
          onLogin={onAccept}
        />
      )}
      {showLoginConfirm === 'GENERATED' && (
        <GenerateScreen
          //phrase={phrase}
          addressIdentity={address}
          confirmedStored={confirmedStored}
          confirmedPermanent={confirmedPermanent}
          onChangeConfirmedStored={onChangeConfirmedStored}
          onChangeConfirmedPermanent={onChangeConfirmedPermanent}
          onAccept={onAccept}
          onResetConnect={onResetConnect}
        />
      )}
      {showLoginConfirm === 'PASSWORD' && (
        <PasswordScreen
          addressIdentity={address}
          confirmPassword={confirmPassword}
          newPassword={newPassword}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onAcceptPassword={onAcceptPassword}
          onResetConnect={onResetConnect}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  align-items: center;
  height: 100%;
  padding: 20px;

  @media only screen and (min-width: 576px) {
    justify-content: center;
    display: flex;
  }
  @media only screen and (max-width: 576px) {
    margin-top: 4em;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 0em;
    padding: 0px;
  }
`;

