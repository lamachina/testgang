import { put, select, takeLatest } from 'redux-saga/effects';

import { connectViewActions as actions, generateKeysFromPhrase } from '.';
var Buffer = require('buffer/').Buffer; // note: the trailing slash is important!
window['Buffer'] = window['Buffer'] || Buffer;
window['bitcoin'] = window['bitcoin'] || {};
// eslint-disable-next-line import/first
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
// eslint-disable-next-line import/first
window['bitcoin'].initEccLib(ecc);
// eslint-disable-next-line import/first
import { createMnemonicPhrase } from 'utils/create-mnemonic-phrase';
// eslint-disable-next-line import/first
import { CreateKeyPairInterface } from 'utils/create-key-pair';
// eslint-disable-next-line import/first
import * as bip39 from 'bip39';
// eslint-disable-next-line import/first
import { selectPathBase } from './selectors';

export function* triggerGenerateProfileRequest(action) {
    const pathBase = yield select(selectPathBase);
    console.log('pathBase', pathBase);
    const primaryPath = `${pathBase}/0/0`;
    const fundingPath = `${pathBase}/1/0`;
    const mnemonic = createMnemonicPhrase();
    const primary: CreateKeyPairInterface = yield generateKeysFromPhrase(
        mnemonic.phrase,
        primaryPath,
    );
    const funding: CreateKeyPairInterface = yield generateKeysFromPhrase(
        mnemonic.phrase,
        fundingPath,
    );

    yield put(actions.setGenerateProfile({ phrase: mnemonic.phrase, primary, funding }));
}

export function* triggerChangePhraseRequest(action) {
    const pathBase = yield select(selectPathBase);
    console.log('pathBase', pathBase);
    const isValid = bip39.validateMnemonic(action.payload.phrase);
    console.log('isValid in connectivew', isValid, action);
    if (isValid) {
        //const generated: any = generateKeysFromPhrase(action.payload, `m/86'/0'/0`);
        const primaryPath = `${pathBase}/0/0`;
        const fundingPath = `${pathBase}/1/0`;
        const mnemonic = action.payload.phrase;
        const primary: CreateKeyPairInterface = yield generateKeysFromPhrase(mnemonic, primaryPath);
        const funding: CreateKeyPairInterface = yield generateKeysFromPhrase(mnemonic, fundingPath);

        yield put(actions.setChangePhrase({ phrase: mnemonic, primary, funding }));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getConnectSaga() {
    // Watches for loadRepos actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(actions.triggerGenerateProfile.type, triggerGenerateProfileRequest);

    yield takeLatest(actions.triggerChangePhrase.type, triggerChangePhraseRequest);
}