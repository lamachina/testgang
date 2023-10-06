import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { searchRealmFormSaga } from './saga';
import { SearchRealmFormState, SearchRealmErrorType } from './types';

export const initialState: SearchRealmFormState = {
  name: '',
  repositories: [],
  loading: false,
  error: null,
  realmInfo: null
};

const slice = createSlice({
  name: 'searchRealmForm',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.realmInfo = null;
      state.name = action.payload;
    },
    clearRealmInfo(state) {
      state.realmInfo = null;
      state.name = '';
    },
    clearError(state) {
      state.error = null;
    },
    getRealmInfo(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<SearchRealmErrorType>) {
      state.error = action.payload;
      state.realmInfo = null;
      state.loading = false;
    },
    realmInfoLoaded(state, action: PayloadAction<Repo[]>) {
      const realmInfo: any = action.payload;
      state.realmInfo = realmInfo.result;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoFormActions, reducer } = slice;

export const useSearchRealmFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: searchRealmFormSaga });
  return { actions: slice.actions };
};
