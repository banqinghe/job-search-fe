import { GlobalState, UserInfoCompletenessState } from './state';
import { Role } from '@/enums';
import { AuthAction, isBarDisplayAction, UserInfoCompletenessAction, UserInfoAction } from './actions';

const defaultState: GlobalState = {
  auth: {
    username: '',
    role: Role.NOT_LOGGED,
  },
  infoCompleteness: {
    account: false,
    jobInfo: false,
  },
  userInfo: {
    username: '',
    role: Role.NOT_LOGGED,
    name: '',
    email: '',
    phoneNumber: '',
    // jobType: '前端',
    // jobTag: ['JavaScript', 'React'],
    // city: '上海',
    // minSalary: 1,
    // maxSalary: 100,
    // userType: 'campus',
  },
  isBarDisplay: true,
};

// 登录，获取用户信息
function loginReducer(prevState: GlobalState, action: UserInfoAction): GlobalState {
  return {
    ...prevState,
    userInfo: action.payload,
  };
}

// 退出登录，移除用户信息，重置角色信息
function logoutReducer(prevState: GlobalState, action: any): GlobalState {
  return {
    ...prevState,
    userInfo: { username: '', role: Role.NOT_LOGGED, name: '', email: '', phoneNumber: '' },
  };
}

function UserInfoCompletenessReducer(prevState: GlobalState, action: UserInfoCompletenessAction): GlobalState {
  return {
    ...prevState,
    infoCompleteness: {...prevState.infoCompleteness, ...action.payload},
  };
}

// 用户信息更新，用户信息包括基本信息 和 求职者与招聘者不同的特定信息
function UserInfoReducer(prevState: GlobalState, action: UserInfoAction) {
  return {
    ...prevState,
    userInfo: {...action.payload},
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
    case 'user/login':
      return loginReducer(state, action);
    case 'user/logout':
      return logoutReducer(state, action);
    case 'user/updateInfo':
      return UserInfoReducer(state, action);
    case 'user/infoCompleteness':
      return UserInfoCompletenessReducer(state, action);
    case 'bar/display':
      return barDisplayReducer(state, action);
    default:
      return state;
  }
}

export default reducer;
