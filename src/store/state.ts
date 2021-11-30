import { Role } from '@/enums';

export interface AuthState {
  username: string;
  role: Role;
}

export interface UserInfoCompletenessState {
  account?: boolean;
  jobInfo?: boolean;
}

export interface GlobalState {
  auth: AuthState;
  infoCompleteness: UserInfoCompletenessState,
  isBarDisplay: boolean;
}
