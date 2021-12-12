import { AuthState, UserInfoState } from "./state";

export interface GlobalAction {
  type: string;
  payload: any;
};

export interface AuthAction extends GlobalAction {
  payload: AuthState;
}

export interface UserInfoAction extends GlobalAction {
  payload: UserInfoState;
}

export interface isBarDisplayAction extends GlobalAction {
  payload: boolean;
}
