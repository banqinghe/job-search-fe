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
  userInfo: UserInfoState,
  infoCompleteness: UserInfoCompletenessState,
  isBarDisplay: boolean;
}

export interface UserInfoState {
  username: string;
  role: Role;
  name: string;
  phoneNumber: string;
  email: string;

  // 求职者特定信息
  jobType?: string;
  jobTag?: string[] | undefined;
  university?: string;
  education?: string;
  city?: string;
  salaryRange?: number[] | undefined;
  userType?: string;

  // 招聘者特定信息
  company?: string;
  department?: string;
}

// export interface UserPublicInfo {
//   username: string;
//   role: Role;
//   name: string;
//   email: string;
// }

// export interface UserSpecificInfo {
//   // 求职者特定信息
//   jobType?: string;
//   jobTag?: string[] | undefined;
//   city?: string;
//   minSalary?: number;
//   maxSalary?: number;
//   userType?: string;
  
//   // 招聘者特定信息
//   company?: string;
//   department?: string;
// }
