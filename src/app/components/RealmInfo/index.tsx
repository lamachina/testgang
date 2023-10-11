import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';

interface Props {
  data: any;
  profileLink?: boolean;
}

export function RealmInfo({ data, profileLink }: Props) {
  const realmFullName = () => {
    if (!data) {
      return '';
    }
    return data?.$full_realm_name;
  };

  const rawDataUrl = () => {
    if (!data) {
      return '';
    }
    return `https://ep.atomicals.xyz/proxy/blockchain.atomicals.get?params=["${data.atomical_id}"]&pretty`;
  };

  const realmLocation = () => {
    if (!data) {
      return '';
    }
    return data?.mint_info.reveal_location_txid;
  };
  const realmId = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_id;
  };
  const atomicalNumber = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_number;
  };
  const atomicalRef = () => {
    if (!data) {
      return '';
    }
    return data?.atomical_ref;
  };
  const bitworkc = () => {
    if (!data) {
      return '';
    }
    return data?.$bitwork.bitworkc;
  };

  const locationInfo = () => {
    if (!data) {
      return '';
    }
    return !!data?.location_info.length;
  };
  const locationInfoTxId = () => {
    if (!data) {
      return '';
    }
    return data?.location_info[0].txid;
  };

  const locationInfoAddress = () => {
    if (!data) {
      return '';
    }
    return data?.location_info[0].scripthash;
  };

  return (
    <Wrapper>
      {data && (
        <>
          <Lead className="lead">
            {' '}
            &rarr; Realm whois info for <u>{realmFullName()}</u>
          </Lead>
          {profileLink && (
            <ProfileField>
              <ProfileFieldInner>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                &nbsp;&nbsp;
                <A href={'/' + realmFullName()}>View +{realmFullName()}'s profile</A>
              </ProfileFieldInner>
            </ProfileField>
          )}
          <Divider />
          <FieldLabel>Atomical ID:</FieldLabel>
          <FieldItem>
            <A href={'https://mempool.space/tx/' + realmId()} target="_blank">
              {realmId()}
            </A>
          </FieldItem>
          <FieldLabel>Atomical Number:</FieldLabel>
          <FieldItem>{atomicalNumber()}</FieldItem>

          <FieldLabel>Atomical Ref:</FieldLabel>
          <FieldItem>{atomicalRef()}</FieldItem>

          <FieldLabel>Bitwork Magic Prefix:</FieldLabel>
          <FieldItem>{bitworkc()}</FieldItem>

          {locationInfo() && (
            <>
              <FieldLabel>Location:</FieldLabel>
              <FieldItem>
                <A href={'https://mempool.space/tx/' + locationInfoTxId()} target="_blank">
                  {locationInfoTxId()}
                </A>
              </FieldItem>

              <FieldLabel>Location Scripthash:</FieldLabel>
              <FieldItem>
                <A href={'https://mempool.space/address/' + locationInfoAddress()} target="_blank">
                  {locationInfoAddress()}
                </A>
              </FieldItem>
            </>
          )}
          <FieldLabel>Raw data</FieldLabel>
          <FieldItem>
            <A href={rawDataUrl()} target="_blank">
              View raw data
            </A>
          </FieldItem>
        </>
      )}
    </Wrapper>
  );
}

const ProfileField = styled.div`
  display: flex;

  align-items: center;
`;
const ProfileFieldInner = styled.div``;

const Divider = styled.div`
  color: ${p => p.theme.text};
  border-top: solid 1px #484848;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const FieldItem = styled.p`
  color: ${p => p.theme.text};
  margin-bottom: 10px;
`;

const FieldLabel = styled.div`
  color: ${p => p.theme.textSecondary};
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  font-weight: 500;
  color: ${p => p.theme.text};
`;
 