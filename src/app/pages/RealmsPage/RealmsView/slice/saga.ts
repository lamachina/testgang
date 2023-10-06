import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { profileOverviewActions as actions } from '.';
import { RealmsViewErrorType } from './types';
import { ElectrumApiInterface } from 'services/electrum-api.interface';
import { ElectrumApiFactory } from 'services/electrum-api-factory';
import { mockSearchRealmNameAndStatus } from './mocks';
import { selectPrimaryAddress } from 'app/slice/selectors';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  yield delay(200);
  // Select username from store
  const primaryAddress: string = yield select(selectPrimaryAddress);
  
  let client: ElectrumApiInterface;
  let apiMock: ElectrumApiInterface | undefined = undefined
  if (process.env.REACT_APP_ELECTRUMX_API_MOCK === 'true') {
    if (primaryAddress == 'notfound') {
      apiMock = mockSearchRealmNameAndStatus(true)
    } else {
      apiMock = mockSearchRealmNameAndStatus()
    }
  }
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', apiMock)
  client = factory.create();
  yield client.open();
  try {
    // Call our request helper (see 'utils/request')
    const res = yield client.atomicalsGetRealmInfo(primaryAddress);
    console.log('result', res);
    if (res && res.result && res.result.atomical_id) {
      const atomicalInfo = yield client.atomicalsGetLocation(res.result.atomical_id);
      console.log('atomicalInfo', atomicalInfo);
      yield put(actions.realmInfoLoaded(atomicalInfo));
    } else {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    }
    yield client.close();
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    } else {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* realmsViewSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRepos.type, getRepos);
}
