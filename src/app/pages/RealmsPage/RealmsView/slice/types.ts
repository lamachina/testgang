export interface RealmSummary {
  full_realm_name: string;
  request_subrealm_status: Status;
}
export interface Status {
  status: string;
}

export interface AtomicalsSummary {

}


export interface RealmsViewState {
  loading: boolean;
  error?: RealmsViewErrorType | null;
  atomicals: AtomicalsSummary;
  realms: RealmSummary[];
  requestRealms: RealmSummary[];
  subrealms: RealmSummary[];
  requestSubrealms: RealmSummary[];
}

export const enum RealmsViewErrorType {
  GENERAL_ERROR = 1,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = RealmsViewState;
