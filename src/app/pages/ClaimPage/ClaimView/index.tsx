import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { FormLabel } from 'app/components/FormLabel';
import { TextButton } from './components/TextButton';
import { useRealmsViewSlice } from './slice';
import { FooterBasic } from 'app/components/FooterBasic';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { SearchRealmForm } from 'app/components/SearchRealmForm';


export function ClaimView() {
  const { actions } = useRealmsViewSlice();
  const primaryAddress = useSelector(selectPrimaryAddress);
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(actions.loadRealms(primaryAddress as any));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    // dispatch(actions.loadRealms(primaryAddress as any));
  });

  return (
    <Wrapper>
      <div className="container my-5 px-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <SearchRealmForm />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;