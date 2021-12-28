import { Role } from '@/enums';

export interface AuthState {
  username: string;
  role: Role;
}

export interface GlobalState {
  auth: AuthState;
  userInfo: UserInfoState;
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
  salaryRange?: number[];
  userType?: string;
  resumeUrl?: string;
  avatarUrl?: string;

  // 招聘者特定信息
  company?: string;
  department?: string;
}
