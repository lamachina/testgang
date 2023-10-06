export interface RealmSummary {}

export interface RealmsViewState {
  loading: boolean;
  error?: RealmsViewErrorType | null;
  realms: RealmSummary[];
}

export const enum RealmsViewErrorType {
  GENERAL_ERROR = 1,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = RealmsViewState;
