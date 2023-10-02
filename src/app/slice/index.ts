import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
    saga,
    sagaClearSession,
    sagaInitSessionFromCookie,
    sagaPrepareSendTransaction,
} from './saga';
import { AppGlobalState, LoadErrorType } from './types';
import { getP2TRAddressFromPublicKey } from 'utils/create-key-pair';

export const initialState: AppGlobalState = {
    encryptedPrimaryKey: undefined,
    primaryAddress: undefined,
    primaryPublicKey: undefined,
    encryptedFundingKey: undefined,
    fundingAddress: undefined,
    fundingPublicKey: undefined,
    sha256d: undefined,
    walletInfos: {},
    activeWalletInfo: {
        utxos: [],
        balance: 0,
        confirmed: 0,
        unconfirmed: 0,
        history: [],
    },
    searchString: '',
    searchStringResult: '',
    searchResult: undefined,
    checkoutInfo: null,
    generalError: null,
    sendAddress: '',
    sendAddressValid: false,
    dirtyFlags: {},
    sendAmount: null,
    sendAmountValid: false,
    sendAmountError: null,
    sendTransactionPrepared: {},
    sendTransactionPassword: '',
    sendTransactionError: null,
    sendTransactionResult: null,
    alertMessage: null,
    walletView: 'HOME',
};

function getNameMode(payload) {
    if (payload?.purchasedbyaddress) {
        return 'OWNED';
    }
    if (payload?.disabled) {
        return 'NOT_AVAILABLE';
    }
    return 'AVAILABLE';
}

function isSendAddressValid(text): boolean {
    try {
        
        return true;
    } catch (ex) {}
    return false;
}

const slice = createSlice({
    name: 'appGlobalState',
    initialState,
    reducers: {
        loadProfile(state, action: PayloadAction<any>) {
            // Load profile when it counts
        },

        // Get session/cookie releated
        setUnauthenticated(state) {
            state.primaryPublicKey = 'unauthenticated';
        },

        setEncryptedSession(
            state,
            action: PayloadAction<{
                encryptedPhrase: string;
                encryptedPrimaryKey: string;
                encryptedFundingKey: string;
                primaryPublicKey: string;
                fundingPublicKey: string;
                sha256d: string;
            }>,
        ) {
            state.encryptedPhrase = action.payload.encryptedPhrase;
            state.encryptedPrimaryKey = action.payload.encryptedPrimaryKey;
            state.encryptedFundingKey = action.payload.encryptedFundingKey;
            state.primaryPublicKey = action.payload.primaryPublicKey;
            state.fundingPublicKey = action.payload.fundingPublicKey;
            state.sha256d = action.payload.sha256d;
            state.primaryAddress = getP2TRAddressFromPublicKey(action.payload.primaryPublicKey);
            state.fundingAddress = getP2TRAddressFromPublicKey(action.payload.fundingPublicKey);
        },

        clearSession(state) {
            state.encryptedPhrase = undefined;
            state.encryptedPrimaryKey = undefined;
            state.encryptedFundingKey = undefined;
            state.primaryPublicKey = undefined;
            state.fundingPublicKey = undefined;
            state.primaryAddress = undefined;
            state.fundingAddress = undefined;
            state.sha256d = undefined;
        },

        initSessionFromCookie(state) {
            // Do nothing since the saga fetches the cookie then calls setEncryptedSession
        },

        // Get address history
        getAddressHistory(state, action: PayloadAction<{ address: string }>) {},

        prepareSendTransaction(
            state,
            action: PayloadAction<{ address: string; amount: number }>,
        ) {},

        setAddressHistory(state, action: PayloadAction<any>) {
            const historyList = action.payload;
            if (!historyList) {
                return;
            }
            historyList.reverse();

            state.activeWalletInfo = Object.assign({}, state.activeWalletInfo, {
                history: historyList,
            });
        },

        // Get Balance/Wallet Info
        getAddressBalance(state, action: PayloadAction<{ address: string }>) {
            state.walletInfos[action.payload.address] = {
                balance: 0,
                unconfirmed: 0,
                confirmed: 0,
            };
        },

        setAddressBalance(
            state,
            action: PayloadAction<{
                utxos: any[];
                address: string;
                balance: number;
                unconfirmed: number;
                confirmed: number;
            }>,
        ) {
 
 
            const reformattedUtxos = action.payload.utxos.map(item => {
                return {
                    txId: item.tx_hash,
                    txid: item.tx_hash,
                    outputIndex: item.tx_pos,
                    satoshis: item.value,
                    height: item.height,
                 
                };
            });
            state.walletInfos[action.payload.address] = {
                balance: action.payload.balance,
                confirmed: action.payload.confirmed,
                unconfirmed: action.payload.unconfirmed,
                utxos: reformattedUtxos,
            };
            state.activeWalletInfo = Object.assign({}, state.activeWalletInfo, {
                balance: action.payload.balance,
                confirmed: action.payload.confirmed,
                unconfirmed: action.payload.unconfirmed,
                utxos: reformattedUtxos,
            });
        },
        setAddressBalanceError(state, action: PayloadAction<{ address: string; error?: any }>) {
            state.walletInfos[action.payload.address] = Object.assign(
                {},
                state.walletInfos[action.payload.address],
                {
                    error: action.payload.error,
                },
            );
        },

        // Search releated
        changeSearchString(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        },
        getSearchResults(state, action: PayloadAction<string>) {
            state.generalError = null;
        },
        searchResultsLoaded(state, action: PayloadAction<any>) {
            state.searchResult = action.payload;
            state.searchResult = Object.assign({}, action.payload, {
                mode: getNameMode(action.payload),
            });
            state.searchStringResult = action.payload.name;
        },

        getCheckoutInfo(state, action: PayloadAction<string>) {
            state.generalError = null;
        },
        setCheckoutInfo(state, action: PayloadAction<any>) {
            state.checkoutInfo = action.payload;
        },

        setGeneralError(state, action: PayloadAction<any>) {
            state.generalError = action.payload;
        },

        getAllNames(state) {
            state.generalError = null;
        },
        getAllNamesLoaded(state, action: PayloadAction<any>) {},

        getAllNamesError(state, action: PayloadAction<LoadErrorType>) {
            state.generalError = action.payload;
        },
        // send related
        changeSendAddress(state, action: PayloadAction<string>) {
            state.sendAddress = action.payload;
            state.dirtyFlags['sendAddress'] = true;
            state.sendAddressValid = isSendAddressValid(action.payload);
        },
        changeSendAmount(state, action: PayloadAction<any>) {
            state.sendAmount = action.payload;
            state.dirtyFlags['sendAmount'] = true;
            state.sendAmountValid = isNaN(action.payload) || action.payload <= 0 ? false : true;
        },

        changeSendTransactionPassword(state, action: PayloadAction<any>) {
            state.sendTransactionPassword = action.payload;
        },

        clearSendScreen(state) {
            state.sendAmount = null;
            state.dirtyFlags['sendAmount'] = false;
            state.sendAmountValid = false;
            state.sendAddress = '';
            state.dirtyFlags['sendAddress'] = false;
            state.sendAddressValid = false;
        },

        monitorCheckoutTransaction(state, action: PayloadAction<string>) {},

        prepareTransaction(state) {},

        sendTransaction(state, action: PayloadAction<{ rawtx: string }>) {},

        setSendTransactionError(state, action: PayloadAction<any>) {
            state.sendTransactionError = action && action.payload ? action.payload : null;
        },

        setSendTransactionResult(state, action: PayloadAction<any>) {
            state.sendTransactionResult = action.payload;
        },

        showAlert(state, action: PayloadAction<string | null>) {
            state.alertMessage = action.payload;
        },

        hideAlert(state) {
            state.alertMessage = null;
        },

        setWalletView(state, action: PayloadAction<string>) {
            state.walletView = action.payload;
        },
    },
});

export const { actions: appGlobalActions, reducer } = slice;

export const useAppGlobalStateSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: saga });
    useInjectSaga({
        key: slice.name + 'initSessionFromCookie',
        saga: sagaInitSessionFromCookie,
    });
    useInjectSaga({
        key: slice.name + 'sagaClearSession',
        saga: sagaClearSession,
    });
    useInjectSaga({
        key: slice.name + 'sagaPrepareSendTransaction',
        saga: sagaPrepareSendTransaction,
    });
    return { actions: slice.actions };
};
