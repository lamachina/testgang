import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { realmsViewSaga } from './saga';
import { RealmsViewState, RealmsViewErrorType, RealmSummary } from './types';

export const initialState: RealmsViewState = {
  realms: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'realmsViewState',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {},
    loadRealms(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.realms = [];
    },
    reposLoaded(state, action: PayloadAction<RealmSummary[]>) {
      const repos = action.payload;
      state.realms = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RealmsViewErrorType>) {
      // state.error = action.payload;
      // state.realmInfo = null;
      // state.loading = false;
    },
    realmInfoLoaded(state, action: PayloadAction<Repo[]>) {
      // const realmInfo: any = action.payload;
      // state.realmInfo = realmInfo.result;
      // state.loading = false;
    },
  },
});

export const { actions: profileOverviewActions, reducer } = slice;

export const useRealmsViewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: realmsViewSaga });
  return { actions: slice.actions };
};
