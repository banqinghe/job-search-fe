import { GlobalState } from './state';
import { Role } from '@/enums';
import { AuthAction, isBarDisplayAction, UserInfoAction } from './actions';

const defaultState: GlobalState = {
  auth: {
    username: '',
    role: Role.NOT_LOGGED,
  },
  userInfo: localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')!) :  {
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
  localStorage.setItem('userInfo', JSON.stringify(action.payload));
  return {
    ...prevState,
    userInfo: action.payload,
  };
}

// 退出登录，移除用户信息，重置角色信息
function logoutReducer(prevState: GlobalState, action: any): GlobalState {
  localStorage.setItem('userInfo', "");
  return {
    ...prevState,
    userInfo: { username: '', role: Role.NOT_LOGGED, name: '', email: '', phoneNumber: '' },
  };
}

// 用户信息更新，用户信息包括基本信息 和 求职者与招聘者不同的特定信息
function UserInfoReducer(prevState: GlobalState, action: UserInfoAction) {
  localStorage.setItem('userInfo', JSON.stringify({
    ...prevState.userInfo,
    ...action.payload
  }));
  return {
    ...prevState,
    userInfo: {
      ...prevState.userInfo,
      ...action.payload
    },
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
    case 'bar/display':
      return barDisplayReducer(state, action);
    default:
      return state;
  }
}

export default reducer;
