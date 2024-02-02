import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectRealms } from './slice/selectors';
import { useRealmsViewSlice } from './slice';
import { FooterBasic } from 'app/components/FooterBasic';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { RealmItem } from './RealmItem';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import TelegramJoinLink from 'app/components/TelegramInviteButton/TelegramInviteButton';
import { AllCentered } from 'app/components/AllCentered';
import { Lead } from 'app/pages/HomePage/components/Lead';

export function RealmsView() {
  const { actions } = useRealmsViewSlice();
  const realms = useSelector(selectRealms);
  const primaryAddress = useSelector(selectPrimaryAddress);
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadRealms(primaryAddress as any));
  });

  const realmsFiltered = () => {
    if (!realms || !realms.length) {
      return [];
    }
    return realms.filter((item: any) => item.subtype === 'subrealm');
  };

  const userOwnsSubrealm = realmsFiltered().some((subrealm) => {
    return (
      subrealm.full_realm_name.startsWith('gang.') &&
      subrealm.request_subrealm_status.status === 'verified'
    );
  });

  return (
    <Wrapper className="mt-5">
      <Header className="mb-5">My gangs</Header>
      {realms?.length !== 0 ?
        realmsFiltered().map((item: any) => (
          <RealmItem key={item.atomical_id} realmInfo={item} />
        )) : 
        <AllCentered>
        <Lead>No gangs found. Searching...</Lead>
        </AllCentered>
        }

      {userOwnsSubrealm && (
        <TelegramJoinLink
          inviteCode={'https://t.me/+2JqReduYWRczNzQ0'}
        />
      )}
      {!realms.length && 
      <AllCentered>
        <LoadingIndicator />
      </AllCentered>
      }
    
      <FooterBasic />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Header = styled.h2`
  color: #fff;
  font-size: 28px;
`;
