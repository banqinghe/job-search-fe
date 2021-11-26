import { Role } from '../enums';

export interface AuthState {
  username: string;
  role: Role;
}

export interface GlobalState {
  auth: AuthState;
}
