import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { RepoItem } from './RepoItem';
import { SubTitle } from '../../components/SubTitle';
import { TextButton } from './components/TextButton';
import {
  selectUsername,
  selectRepos,
  selectLoading,
  selectError,
  selectRealmInfo,
} from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { RepoErrorType } from './slice/types';
import { useGithubRepoFormSlice } from './slice';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';
import { InputSearchRealms } from './InputSearchRealms';
import { NotFoundInfo } from './NotFoundInfo';
import { A } from 'app/components/A';
import { RealmInfo } from 'app/components/RealmInfo';

export function GithubRepoForm() {
  const { actions } = useGithubRepoFormSlice();

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const isLoading = useSelector(selectLoading);
  const realmInfo = useSelector(selectRealmInfo);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

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
    if (username && username.trim().length > 0) {
      // dispatch(actions.loadRepos());
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  return (
    <Wrapper>
      <FormGroup className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmitForm}>
        <Lead className="lead">Search Realms</Lead>
        <div className="form-floating">
          <InputSearchRealms
            placeholder="Type any Realm name"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <ButtonPrimaryNew block={false} onClick={onSearchName}> Search</ButtonPrimaryNew>
      </FormGroup>
      {realmInfo ? (
        <RealmInfo
          key={realmInfo}
          data={realmInfo}
          profileLink={true}
        />
      ) : error ? (
        <NotFoundInfo>
          <ErrorText>
            {repoErrorText(error)}
          </ErrorText><br/>
          <ClaimInfo>Claim the Realm name <em>+{username}</em> before someone else. <A href="https://docs.atomicals.xyz/reference-and-tools/javascript-library-cli" target="_blank">Claim Realm with the CLI</A></ClaimInfo>
        </NotFoundInfo>
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.REALM_NOT_FOUND:
      return 'That Realm name is not yet claimed!';
    case RepoErrorType.REALMNAME_EMPTY:
      return 'Type any Realm name';
    case RepoErrorType.USER_HAS_NO_REPO:
      return 'Realm has no data';
    case RepoErrorType.GITHUB_RATE_LIMIT:
      return 'Rate limited';
    default:
      return 'An error has occurred!';
  }
};


const Wrapper = styled.div`

  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;


const ClaimInfo = styled.span`
  color: ${p => p.theme.text};
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-color: rgb(60, 16, 105) !important;
  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
  background-color: #101010 !important;
`;
 
