import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { profileOverviewActions as actions } from '.';
import { ProfileErrorType } from './types';
import { ElectrumApiInterface } from 'utils/builder/services/electrum-api.interface';
import { ElectrumApiFactory } from 'utils/builder/services/electrum-api-factory';
import { mockSearchRealmNameAndStatus } from './mocks';
import { selectName } from './selectors';
import { extractDelegateIdWithoutEnd, extractUrnDatWithoutEnd } from 'utils/helper';
import { Transaction } from 'bitcoinjs-lib/src/transaction';
import { buildAtomicalsFileMapFromRawTx, extractFileFromInputWitness } from 'utils/builder/atomical-format-helpers';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;

interface ItemInfo {
  result: {
    state: {
      history: {
        data: {
          image?: string;
        };
      }[];
    };
  };
}
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  yield delay(200);
  // Select username from store
  const name: string = yield select(selectName);
  if (name.length === 0) {
    yield put(actions.repoError(ProfileErrorType.REALMNAME_EMPTY));
    return;
  }
  let client: ElectrumApiInterface;
  let apiMock: ElectrumApiInterface | undefined = undefined
  if (process.env.REACT_APP_ELECTRUMX_API_MOCK === 'true') {
    if (name === 'notfound') {
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
    const res = yield client.atomicalsGetRealmInfo(name);

    if (res && res.result && res.result.atomical_id) {
      const atomicalInfo = yield client.atomicalsGetStateHistory(res.result.atomical_id);
      const atomicalsDelegate = atomicalInfo.result.state.history[0].data.d
      const delegateInfo = yield client.atomicalsGetStateHistory(atomicalsDelegate);
      
      if (atomicalsDelegate.length > 0) {
        // Loop through each link in state.history[0].data.links
        const links = delegateInfo.result.state.history[0].data.links;
      
        for (let i = 0; i < links.length; i++) {
          // Check if the group is "art"
          if (links[i].group === 'art' && links[i].items) {
            const linkItems = links[i].items;
            const delegateInfoArray = [];
          
            // Loop through each key in the art link group
            Object.keys(linkItems).forEach(async (key) => {
              const item = linkItems[key];
              const urnToFetch = item.urn;
              const uniqueKey = `${urnToFetch}-${key}`;
          
              // Fetch data for each item
              const urnID = extractDelegateIdWithoutEnd(urnToFetch);
              console.log("URN ID", urnID);
          
              if (urnID !== null) {
                try {
                  const itemInfo: ItemInfo = await client.atomicalsGetStateHistory(urnID);
                  console.log("ITEM INFOS COLLEC", itemInfo);
              
                  // Check if itemInfo has a valid result and state history
                  if (itemInfo && itemInfo.result && itemInfo.result.state && itemInfo.result.state.history) {
                    // Map through the history array
                    itemInfo.result.state.history.forEach(async (historyItem, i) => {
                      // Check if the data object has an 'image' property
                      if (historyItem.data && historyItem.data.image) {
                        // Log the value of 'image'
                        const TxToFetch = extractUrnDatWithoutEnd(historyItem.data.image)
                        console.log(TxToFetch);
                        
                        if (TxToFetch !== null) {
                          // Fetch additional data using the image value
                          try {
                            const additionalData = await client.getTx(TxToFetch);
                            console.log('Additional Data:', additionalData);
                        
                            if (additionalData !== null && additionalData.tx !== null) {
                              const rawtx = buildAtomicalsFileMapFromRawTx(additionalData.tx);
                              console.log(rawtx.res);
                              // Handle the fetched data as needed
                            }
                        
                          } catch (error) {
                            console.error('Error fetching additional data:', error);
                          }
                        }
                      }
                    });
                  }
                } catch (error) {
                  console.error('Error fetching item data:', error);
                }
              }
              
            })
            // Now, delegateInfoArray contains the responses for each item
            console.log('Delegate Info Array:', delegateInfoArray);
          
            // Dispatch an action with the array of responses
            yield put(actions.delegateInfoLoaded(delegateInfoArray));
          }}

//        const delegateInfo = yield client.atomicalsGetStateHistory(atomicalsDelegate);
        yield put(actions.delegateInfoLoaded(delegateInfo));
      } else {
        yield put(actions.repoError(ProfileErrorType.REALM_NOT_FOUND));
        console.log("Unable to find the ID in the string");
      }

      
      
     // console.log('atomicalInfo', atomicalInfo);
      yield put(actions.realmInfoLoaded(atomicalInfo));
    } else {
      yield put(actions.repoError(ProfileErrorType.REALM_NOT_FOUND));
    }
    yield client.close();
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(ProfileErrorType.REALM_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(ProfileErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(ProfileErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* profileOverviewSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRepos.type, getRepos);
}
