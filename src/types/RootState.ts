import { ConnectViewState } from 'app/components/ConnectView/slice/types';
import { GithubRepoFormState } from 'app/pages/HomePage/Features/GithubRepoForm/slice/types';
import { ProfileOverviewState } from 'app/pages/RealmPage/Profile/ProfileOverview/slice/types';
import { RealmsViewState } from 'app/pages/RealmsPage/RealmsView/slice/types';
import { AppGlobalState } from 'app/slice/types';
import { ThemeState } from 'styles/theme/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface RootState {
  theme?: ThemeState;
  githubRepoForm?: GithubRepoFormState;
  profileOverview?: ProfileOverviewState;
  connectViewState?: ConnectViewState;
  realmsViewState?: RealmsViewState;
  appGlobalState?: AppGlobalState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
