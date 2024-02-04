import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import ColorTextDisplay from './ColorTextDisplay';
import { SubTitle } from 'app/pages/ConnectPage/components/SubTitle';
import { Title } from 'app/pages/RealmsPage/RealmsView/components/Title';
import { extractDelegateId } from 'utils/helper';
import { TwitterShareButton, TwitterIcon } from 'react-share';


interface Props {
  data: any;
  delegate: any;
  profileLink?: boolean;
}

export function RealmInfo({ data, delegate, profileLink }: Props) {

const [imageData, setImageData] = React.useState<string | null>(null);

// Function to fetch and set image data
const fetchImageData = async () => {
  if (delegate && delegate.state && delegate.state.history && delegate.state.history[0] && delegate.state.history[0].data.image) {
    const delegateD = delegate.state.history[0].data.image;
    const delegateId = extractDelegateId(delegateD);

    if (delegateId) {
      const apiUrl = `https://ep.atomicalswallet.com/proxy/blockchain.atomicals.get_state?params=["${delegateId}"]&pretty`;

      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        const latestData = result.response.result.state.latest;
        // Find any property in the latestData object
        const imageDataProperty = Object.keys(latestData)[0];

        if (imageDataProperty) {
          let imageDataHex;

          if (latestData[imageDataProperty].$d) {
            imageDataHex = latestData[imageDataProperty].$d;
          } else if (latestData[imageDataProperty].$b && latestData[imageDataProperty].$b.$d) {
            imageDataHex = latestData[imageDataProperty].$b.$d;
          } else {
            // Handle the case where neither $d nor $b.$d is available
            console.error('No valid imageDataHex found');
            return; // or set a default value, throw an error, etc.
          }

          if (imageDataHex) {
            // Convert hex to base64
            const base64ImageData = Buffer.from(imageDataHex, 'hex').toString('base64');
            // Set the base64 image data and filename to state
            setImageData(
           base64ImageData,
            );
            
          }
        }
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    }
  }
};

  // Call the function when component mounts
  React.useEffect(() => {
    fetchImageData();
  }, []);
  
 // Function to render social links from history[0]
const renderSocialLinks = () => {
  if (!delegate || !delegate || !delegate.state || !delegate.state.history) {
    return null;
  }
  const historyItem = delegate.state.history[0];
  if (historyItem && historyItem.data && historyItem.data.links && historyItem.data.links.length > 0) {
    const socialLinks = historyItem.data.links.map((linkGroup: any) => {
      if (linkGroup.group === 'social' && linkGroup.items) {
        return Object.values(linkGroup.items).map((linkItem: any) => (
          <div key={linkItem.type}>
            <FieldLabel>{linkItem.name}:</FieldLabel>
            <FieldItem>
              <A href={linkItem.url} target="_blank">
                {linkItem.url}
              </A>
            </FieldItem>
          </div>
        ));
      }
      return null;
    });

    return socialLinks;
  }

  return null;
};
 // Function to render social links from history[0]
const rendArtLink = () => {
  if (!delegate || !delegate || !delegate.state || !delegate.state.history) {
    return null;
  }
  const historyItem = delegate.state.history[0];
  if (historyItem && historyItem.data && historyItem.data.links && historyItem.data.links.length > 0) {
    const artlink = historyItem.data.links.map((linkGroup: any) => {
      if (linkGroup.group === 'art' && linkGroup.items) {
        return Object.values(linkGroup.items).map((linkItem: any) => (
          <StyledLinkContainer key={linkItem.name}>
          <div className="field-item">
            <a href={`https://wizz.cash/dmint/${linkItem.name.substring(1)}`} target="_blank">
              {linkItem.name}
            </a>
          </div>
        </StyledLinkContainer>
        ));
      }
      return null;
    });

    return artlink;
  }

  return null;
};

    
  const renderDescription = () => {
    if (!delegate) {
      return '';
    }
    return delegate?.state?.history[0]?.data?.desc;
  };

  const realmName = () => {
    if (!delegate) {
      return '';
    }
    return delegate?.state?.history[0]?.data?.name;
  };

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
 /*  const bitworkc = () => {
    if (!data) {
      return '';
    }
    return data?.$bitwork.bitworkc;
  }; */

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
         
          <FieldItemCenter>
            <Img width={'144px'} src={`data:image/png;base64,${imageData}`} alt="Delegate Image" />

            <Title >{realmName()}</Title>

          </FieldItemCenter>
      
          <Divider />
          <FieldItemCenter>
          {renderDescription()}
          </FieldItemCenter>

          <Divider />

          {renderSocialLinks()}

          <Divider />

          <FieldLabel>
            COLLECTIONS
          </FieldLabel>
          <Wrappo>
          {rendArtLink()}
          </Wrappo>
            {/* <FieldLabel>{atomicalNumber()}</FieldLabel> */}

           {/* Twitter Share Button */}
           <Divider />
          <FieldItemCenter>
            <TwitterShareButton
              url={`https://localhost:3000/${realmFullName()}`} // Replace with your app's URL and query parameters
              title={`Check out ${realmName()}\'s +bullrun !`} // Customize the tweet text
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </FieldItemCenter>

        {/*   <FieldLabel>Atomical ID:</FieldLabel>
          <FieldItem>
            <A href={'https://mempool.space/tx/' + realmId()} target="_blank">
              {realmId()}
            </A>
          </FieldItem>

          <FieldLabel>Atomical Ref:</FieldLabel>
          <FieldItem>{atomicalRef()}</FieldItem>
 */}
          {/* <FieldLabel>Bitwork Magic Prefix:</FieldLabel>
          <FieldItem>{bitworkc()}</FieldItem> */}

        {/*   {locationInfo() && (
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
          )} */}
          {/* <FieldLabel>Raw data</FieldLabel>
          <FieldLabel>
            <A href={rawDataUrl()} target="_blank">
              View raw data
            </A>
          </FieldLabel> */}
        </>
      )}
    </Wrapper>
  );
}

/* ProfileField */
const ProfileField = styled.div`
  display: flex;
  align-items: center;
`;

/* ProfileFieldInner */
const ProfileFieldInner = styled.div``;

/* Divider */
const Divider = styled.div`
  color: ${p => p.theme.text};
  border-top: solid 1px #484848;
  margin-top: 15px;
  margin-bottom: 15px;
`;

/* Lead */
const Lead = styled.p`
  color: ${p => p.theme.text};
`;

/* FieldItem */
const FieldItem = styled.p`
  color: ${p => p.theme.text};
  margin-bottom: 10px;
`;

/* FieldItemCenter */
const FieldItemCenter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

/* FieldLabel */
const FieldLabel = styled.div`
  color: ${p => p.theme.textSecondary};
  margin-bottom: 5px;
`;

/* Wrapper */
const Wrapper = styled.div`
  font-weight: 500;
  color: ${p => p.theme.text};
`;

const Wrappo = styled.div`
display: flex;
gap: 2rem;
justify-content: center;
padding-top: 1rem;
`;

/* Img */
const Img = styled.img`
  border-radius: 10%;
`;

/* Nameheadline */
const Nameheadline = styled.div`
  text-wrap: nowrap;
  whitespace: nowrap;
  text-align: center;
  justify-content: center;
  display: flex;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
  border: 1px solid #ccc;
  transition: background-color 0.3s ease; /* Add a smooth transition effect on hover */
  cursor: pointer;
  margin-bottom: 20px;


  &:hover {
    border: 1px solid ${p => p.theme.primary};
    
  }

  .field-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a {
    text-decoration: none;
    color: ${p => p.theme.primary};
  }
`;