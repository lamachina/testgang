import { GithubRepoFormState } from 'app/pages/HomePage/Features/GithubRepoForm/slice/types';
import { ProfileOverviewState } from 'app/pages/RealmPage/Profile/ProfileOverview/slice/types';
import { AppGlobalState } from 'app/slice/types';
import { ThemeState } from 'styles/theme/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface ConnectViewState {
    phrase: string;
    isValidPhrase: boolean;
    pathBase: string;
    primary: {
        address: string;
        addressPath: string;
        addressPrivateKey: string;
        addressPublicKey: string;
    };
    funding: {
        address: string;
        addressPath: string;
        addressPrivateKey: string;
        addressPublicKey: string;
    };
    confirmedPermanent: boolean;
    confirmedStored: boolean;
    showLoginConfirm: string | 'CONNECT' | 'GENERATED' | 'PASSWORD';
    newPassword: string;
    confirmPassword: string;
    isValidPassword: boolean;
    privKeyCipherText: string;
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = ConnectViewState;

export interface RootState {
    theme?: ThemeState;
    githubRepoForm?: GithubRepoFormState;
    profileOverview?: ProfileOverviewState;
    connectViewState?: ConnectViewState;
    appGlobalState?: AppGlobalState;
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
