import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.appGlobalState || initialState;

export const selectSha256dFromPassword = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sha256d,
);

export const selectEncryptedPhrase = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.encryptedPhrase,
);

export const selectEncryptedPrimaryKey = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.encryptedPrimaryKey,
);

export const selectEncryptedFundingKey = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.encryptedFundingKey,
);

export const selectPrimaryAddress = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.primaryAddress,
);

export const selectFundingAddress = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.fundingAddress,
);

export const selectPrimaryPublicKey = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.primaryPublicKey,
);

export const selectFundingPublicKey = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.fundingPublicKey,
);


export const selectWalletInfos = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.walletInfos,
);

export const selectSearchResult = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.searchResult,
);

export const selectSearchString = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.searchString,
);
export const selectSearchStringResult = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.searchStringResult,
);

export const selectGeneralError = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.generalError,
);

export const selectSendAddress = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sendAddress,
);

export const selectSendAddressValid = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sendAddressValid,
);

export const selectSendAmountValid = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sendAmountValid,
);

export const selectSendAmount = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sendAmount,
);

export const selectDirtyFlags = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.dirtyFlags,
);
 
export const selectActiveWalletInfo = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.activeWalletInfo,
);

export const selectSha256d = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sha256d,
);

export const selectSendTransactionPrepared = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sendTransactionPrepared,
);

export const selectWalletView = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.walletView,
);

export const selectSendTransactionError = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.sendTransactionError,
);

export const selectAlertMessage = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.alertMessage,
);

export const selectCheckoutInfo = createSelector(
  [selectDomain],
  appGlobalState => appGlobalState.checkoutInfo,
);

