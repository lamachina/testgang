import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { profileOverviewSaga } from './saga';
import { ProfileOverviewState, ProfileErrorType } from './types';

export const initialState: ProfileOverviewState = {
  name: '',
  repositories: [],
  loading: false,
  error: null,
  realmInfo: null
};

const slice = createSlice({
  name: 'profileOverview',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.realmInfo = null;
      state.name = action.payload;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<ProfileErrorType>) {
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

export const { actions: profileOverviewActions, reducer } = slice;

export const useProfileOverviewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileOverviewSaga });
  return { actions: slice.actions };
};
