import { GlobalState, UserInfoCompletenessState } from './state';
import { Role } from '@/enums';
import { AuthAction, isBarDisplayAction, UserInfoCompletenessAction } from './actions';

const defaultState: GlobalState = {
  auth: {
    username: '',
    role: Role.NOT_LOGGED,
  },
  infoCompleteness: {
    account: true,
    jobInfo: false,
  },
  isBarDisplay: true,
};

function loginReducer(prevState: GlobalState, action: AuthAction): GlobalState {
  return {
    ...prevState,
    auth: action.payload,
  };
}

function UserInfoCompletenessReducer(prevState: GlobalState, action: UserInfoCompletenessAction): GlobalState {
  return {
    ...prevState,
    infoCompleteness: {...prevState.infoCompleteness, ...action.payload},
  };
}

function barDisplayReducer(prevState: GlobalState, action: isBarDisplayAction): GlobalState {
  return {
    ...prevState,
    isBarDisplay: action.payload,
  };
}

function reducer(state = defaultState, action: any): GlobalState {
  switch (action.type) {
    case 'auth/login':
      return loginReducer(state, action);
    case 'auth/logout':
      return loginReducer(state, {
        type: 'auth/login',
        payload: { username: '', role: Role.NOT_LOGGED }
      });
    case 'auth/infoCompleteness':
      return UserInfoCompletenessReducer(state, action);
    case 'bar/display':
      return barDisplayReducer(state, action);
    default:
      return state;
  }
}

export default reducer;
