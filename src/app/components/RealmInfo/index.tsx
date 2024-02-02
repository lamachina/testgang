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
          <div key={linkItem.name}>
            <FieldLabel>{linkItem.name}:</FieldLabel>
            <FieldItem>
              <A href={linkItem.urn} target="_blank">
                {linkItem.urn}
              </A>
            </FieldItem>
          </div>
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
{/* <ColorTextDisplay/> */}
          <FieldItemCenter>
          {renderDescription()}
          </FieldItemCenter>

          <Divider />

          {renderSocialLinks()}
          {rendArtLink()}
            {/* <FieldLabel>{atomicalNumber()}</FieldLabel> */}

           {/* Twitter Share Button */}
           <Divider />
          <FieldItemCenter>
            <TwitterShareButton
              url={`https://localhost:3000/${realmFullName()}`} // Replace with your app's URL and query parameters
              title={`Check out the +bullrun of ${realmName()} !`} // Customize the tweet text
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

const FieldLabel = styled.div`
  color: ${p => p.theme.textSecondary};
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  font-weight: 500;
  color: ${p => p.theme.text};
`;
 
const Img = styled.img`
border-radius: 10%;
`;
 
const Nameheadline = styled.div`
  text-wrap: nowrap;
  whitespace: nowrap;
  text-align: center;
  justify-content: center;
  display: flex;
`;