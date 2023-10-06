import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectName } from './selectors';
import { githubRepoFormActions as actions } from '.';
import { SearchRealmErrorType } from './types';
import { ElectrumApiInterface } from 'utils/builder/services/electrum-api.interface';
import {
  ElectrumApiFactory,
  ElectrumApiMockFactory,
} from 'utils/builder/services/electrum-api-factory';
import { getMockApi } from './mock-api';
import { isValidRealmName } from 'utils/builder/atomical-format-helpers';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;

export function* getRealmInfoRequest() {
  yield delay(200);
  // Select name from store
  const name: string = yield select(selectName);
  if (name.length === 0) {
    yield put(actions.repoError(SearchRealmErrorType.REALMNAME_EMPTY));
    return;
  }
  try {
    isValidRealmName(name);
  } catch (err) {
    console.log(err);
    yield put(actions.repoError(SearchRealmErrorType.REALM_NAME_INVALID));
    return;
  }
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(getMockApi());
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  try {
    const res = yield client.atomicalsGetRealmInfo(name);
    if (res && res.result && res.result.atomical_id) {
      const atomicalInfo = yield client.atomicalsGetLocation(res.result.atomical_id);
      yield put(actions.realmInfoLoaded(atomicalInfo));
    } else {
      yield put(actions.repoError(SearchRealmErrorType.REALM_NOT_FOUND));
    }
    yield client.close();
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(SearchRealmErrorType.REALM_NOT_FOUND));
    } else {
      yield put(actions.repoError(SearchRealmErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* searchRealmFormSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getRealmInfo.type, getRealmInfoRequest);
}
