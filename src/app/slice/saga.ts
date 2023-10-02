import { takeLatest, put } from 'redux-saga/effects';
import { appGlobalActions as actions } from '.';
import { deleteSessionFromCookie, getSessionFromCookie } from 'utils/session-validator';
import { select, delay } from 'redux-saga/effects';
import axios from 'axios';
import { selectPrimaryAddress, selectSearchString } from './selectors';
import { LoadErrorType } from './types';
import { serverApiUrl } from 'environment';
import getName from 'app/helpers/getName';
import getCheckoutInfo from 'app/helpers/getCheckoutInfo';

export function* initSessionFromCookie() {
    let session = getSessionFromCookie();
    if (!session) {
        yield put(actions.setUnauthenticated());
        return;
    }
    yield put(actions.setEncryptedSession(session));
}
    
export function* sagaGetCheckoutInfo(action) {
    yield delay(200);
    const searchString: string =
        action && action.payload ? action.payload : yield select(selectSearchString);
    const identityAddress: string = yield select(selectPrimaryAddress);

    if (!searchString || !searchString.length) {
        return;
    }

    try {
        const requestURL = serverApiUrl();
        axios.defaults.withCredentials = false;
        const result = yield axios.post(requestURL + '/graphql', {
            query: getCheckoutInfo(searchString, identityAddress),
        });
        yield put(actions.setCheckoutInfo(result.data.data.getCheckoutInfo));
    } catch (err) {
        console.log('err', err);
        yield put(actions.setGeneralError(LoadErrorType.RESPONSE_ERROR));
    }
}

export function* sagaGetSearchRequest(action) {
    yield delay(200);
    const searchString: string =
        action && action.payload ? action.payload : yield select(selectSearchString);
    const identityAddress: string = yield select(selectPrimaryAddress);

    if (!searchString || !searchString.length) {
        return;
    }

    try {
        const requestURL = serverApiUrl();
        axios.defaults.withCredentials = false;
        const result = yield axios.post(requestURL + '/graphql', {
            query: getName(searchString, identityAddress ? identityAddress : ''),
        });
        yield put(actions.searchResultsLoaded(result.data.data.getNameInfo));
    } catch (err) {
        console.log('err', err);
        yield put(actions.setGeneralError(LoadErrorType.RESPONSE_ERROR));
    }
}

export function* clearSession() {
    deleteSessionFromCookie();
}

export function* sagaInitSessionFromCookie() {
    yield takeLatest(actions.initSessionFromCookie.type, initSessionFromCookie);
}

export function* sagaClearSession() {
    yield takeLatest(actions.clearSession.type, clearSession);
}

export function* sagaPrepareSendTransaction(action) {
    if (!action || !action.payload) {
        return;
    }
    yield put(actions.setWalletView('SEND'));
    yield put(actions.changeSendAddress(action.payload.address));
    yield put(actions.changeSendAmount(action.payload.amount));
    const elem = document.getElementById('offcanvasWallet');
    const oc2 = new window['bootstrap'].Offcanvas(elem);
    oc2.show();
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
    // Watches for loadRepos actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(actions.loadProfile.type, sagaInitSessionFromCookie);
    yield takeLatest(actions.clearSession.type, sagaClearSession);
    yield takeLatest(actions.getSearchResults.type, sagaGetSearchRequest);
    yield takeLatest(actions.getCheckoutInfo.type, sagaGetCheckoutInfo);
    yield takeLatest(actions.prepareSendTransaction.type, sagaPrepareSendTransaction);
}
