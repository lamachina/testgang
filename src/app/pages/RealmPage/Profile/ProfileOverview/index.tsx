import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { RepoItem } from './RepoItem';
import { SubTitle } from '../../components/SubTitle';
import { TextButton } from './components/TextButton';
import { QRCodeSVG } from 'qrcode.react';
import {
  selectUsername,
  selectRepos,
  selectLoading,
  selectError,
  selectRealmInfo,
} from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { ProfileErrorType } from './slice/types';
import { useProfileOverviewSlice } from './slice';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';
import { InputSearchRealms } from './InputSearchRealms';
import { NotFoundInfo } from './NotFoundInfo';
import { A } from 'app/components/A';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { FooterBasic } from 'app/components/FooterBasic';
import { RealmInfo } from 'app/components/RealmInfo';
import { FirstClaimBox } from 'app/components/FirstClaimBox';
import { selectPrimaryAddress } from 'app/slice/selectors';

export function ProfileOverview() {
  const { actions } = useProfileOverviewSlice();

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const isLoading = useSelector(selectLoading);
  const realmInfo = useSelector(selectRealmInfo);
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

  const fullName = () => {
    if (realmInfo) {
      return realmInfo?.$full_realm_name;
    }
    return '';
  };

  const address = () => {
    if (realmInfo) {
      return realmInfo?.location_info[0].address
        ? realmInfo?.location_info[0].address
        : undefined;
    }
    return '';
  };

  return (
    <Wrapper>
      {realmInfo ? (
        <>
          <Nameheadline className="text-center">
            <Title as="h1">+{fullName()}</Title>
          </Nameheadline>

          <RealmInfo key={realmInfo} data={realmInfo} />
          {}
        </>
      ) : error ? (
        <div className="mt-5">
        <NotFoundInfo>
          <FirstClaimBox name={name} primaryAddress={primaryAddress} />
        </NotFoundInfo>
        </div>
      ) : null}
      <FooterBasic />
    </Wrapper>
  );
}
export const repoErrorText = (error: ProfileErrorType) => {
  switch (error) {
    case ProfileErrorType.REALM_NOT_FOUND:
      return 'That Realm name is not yet claimed!';
    case ProfileErrorType.REALMNAME_EMPTY:
      return 'Type any Realm name';
    case ProfileErrorType.USER_HAS_NO_REPO:
      return 'Realm has no data';
    case ProfileErrorType.GITHUB_RATE_LIMIT:
      return 'Rate limited';
    default:
      return 'An error has occurred!';
  }
};

const Nameheadline = styled.div`
  text-wrap: nowrap;
  whitespace: nowrap;
  text-align: center;
  justify-content: center;
  display: flex;
`;

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;
 
