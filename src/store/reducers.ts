import { GlobalState } from './state';
import { Role } from '@/enums';
import { AuthAction } from './actions';

const defaultState: GlobalState = {
  auth: {
    username: '',
    role: Role.NOT_LOGGED,
  },
};

function loginReducer(prevState: GlobalState, action: AuthAction): GlobalState {
  return {
    ...prevState,
    auth: action.payload,
  };
}

function reducer(state = defaultState, action: any): GlobalState {
  switch (action.type) {
    case 'auth/login':
      return loginReducer(state, action);
    default:
      return state;
  }
}

export default reducer;
