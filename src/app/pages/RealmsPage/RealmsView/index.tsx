import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { FormLabel } from 'app/components/FormLabel';
import { TextButton } from './components/TextButton';
import { selectRealms, selectLoading, selectError } from './slice/selectors';
import { RealmsViewErrorType } from './slice/types';
import { useRealmsViewSlice } from './slice';
import { NotFoundInfo } from './NotFoundInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { FooterBasic } from 'app/components/FooterBasic';
import { RealmInfo } from 'app/components/RealmInfo';
import { FirstClaimBox } from 'app/components/FirstClaimBox';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { Title } from './components/Title';

export function RealmsView() {
  const { actions } = useRealmsViewSlice();

  const realms = useSelector(selectRealms);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { name }: any = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const primaryAddress = useSelector(selectPrimaryAddress);

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeUsername(evt.currentTarget.value));
    //dispatch(actions.loadRepos());
  };

  const onSearchName = () => {
    dispatch(actions.loadRepos());
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    dispatch(actions.changeUsername(name));
    dispatch(actions.loadRepos());
  });

  return (
    <Wrapper>
      wrapper
      <FooterBasic />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;
