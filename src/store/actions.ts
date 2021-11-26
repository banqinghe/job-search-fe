import { AuthState } from "./state";

export interface GlobalAction {
  type: string;
  payload: any;
};

export interface AuthAction extends GlobalAction {
  payload: AuthState;
}
