export interface ActiveWalletInfo {
    utxos: any[];
    history: any[];
    balance: number;
    confirmed: number;
    unconfirmed: number;
}

export interface CheckoutInfo {
    name: string;
    expectedowneraddress: string;
    payaddress: string;
    pricesats: number;
    pricegooduntil: number;
}

export interface AppGlobalState {
    encryptedPhrase?: string;
    encryptedPrimaryKey?: string;
    encryptedFundingKey?: string;
    primaryPublicKey?: string;
    primaryAddress?: string;
    fundingPublicKey?: string;
    fundingAddress?: string;
    sha256d?: string;
    walletInfos: {
        [address: string]: {
            balance: number;
            confirmed?: number;
            unconfirmed?: number;
            utxos?: any[];
        };
    };
    activeWalletInfo: ActiveWalletInfo;
    searchString: string;
    searchStringResult: string;
    searchResult?: SearchResult;
    generalError?: LoadErrorType | null;
    checkoutInfo: CheckoutInfo | null;
    sendAddress: string;
    sendAddressValid: boolean;
    dirtyFlags: any;
    sendAmount?: number | null;
    sendAmountValid?: boolean;
    sendAmountError?: string | null;
    sendTransactionPrepared: any;
    sendTransactionPassword: string;
    sendTransactionError: any;
    sendTransactionResult: any;
    alertMessage: string | null;
    walletView:
        | 'HOME'
        | 'HISTORY'
        | 'ASSETS'
        | 'SEND'
        | 'SENDCONFIRM'
        | 'DEPOSIT'
        | 'SETTINGS'
        | string;
}

export interface SearchResult {
    id: string;
    name: string;
    punycoded: string;
    purchasedbyaddress: string;
    disabled: boolean;
    priceusd: number;
    mode?: 'AVAILABLE' | 'NOT_AVAILABLE' | 'OWNED';
    tags: string;
}

export enum LoadErrorType {
    RESPONSE_ERROR = 1,
    NOT_FOUND = 2,
}

export enum ErrorType {
    RESPONSE_ERROR = 1,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = AppGlobalState;
