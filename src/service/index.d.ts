import { JobPositionDetail } from '@/models';
import { AxiosResponse } from 'axios';

type ServiceFunction<T> = (payload: T) => Promise<AxiosResponse<any, any>>;

export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserRegisterPayload {
  username: string;
  password: string;
  name: string;
  phoneNumber: string;
  email: string;
  role: string;
}

export interface UserChangePasswordPayload {
  username: string;
  password: string;
  newPassword: string;
}

interface UserUpdateInfoPayload {
  username: string;
  name: string;
  phoneNumber: string;
  role: string;
  email: string;
}

export interface JobHunterUpdateInfoPayload extends UserUpdateInfoPayload {
  jobType: string;
  jobTag: string[];
  university: string;
  education: string;
  city: string;
  salaryRange: number[];
  userType: string;
  resumeUrl: string;
  avatarUrl: string;
}

export interface RecruiterUpdateInfoPayload extends UserUpdateInfoPayload {
  company: string;
  department: string;
}

export interface UploadFilePayload {
  file: File;
}

export interface UploadFilePayload {
  file: File;
}

/** 只需要用户名的公用 PayLoad 类型 */
export interface UsernamePayload {
  username: string;
  // count: number;
}

export interface PostJobPayload {
  username: string;
  jobPositionDetail: JobPositionDetail;
}

export interface ChangeJobPayload {
  title: string;
  id: string;
  postTime: string
  location: string | string[];
  experienceRequirement?: string;
  educationRequirement?: string;
  salaryRange: number[];
  company: string;
  department: string;
  logoUrl: string;
  description: string;
  poster: string;
}

export interface JobPayload {
  jobId: string;
  username: string;
}

export interface CompanyPayload {
  companyName: string;
}

/** 需要用户名分页信息的 Payload 类型 */
export interface UsernameWithPagePayload {
  username: string;
  pageSize: number;
  pageNumber: number;
}

export interface UsernameWithCountPayload {
  username: string;
  count: number;
}

export interface TitleWithPagePayload {
  title: string;
  pageSize: number;
  pageNumber: number;
}

export interface SearchResumeReceivePayload {
  username: string;
  jobTitle?: string;
  candidateName?: string;
  pageSize: number;
  pageNumber: number;
}

export interface ChangeResumeStatusPayload {
  recordId: string;
}

export interface Service {
  userLogin: ServiceFunction<UserLoginPayload>;
  userRegister: ServiceFunction<UserRegisterPayload>;
  userChangePassword: ServiceFunction<UserChangePasswordPayload>;
  userUpdateInfo: ServiceFunction<JobHunterUpdateInfoPayload | RecruiterUpdateInfoPayload>;
  uploadFile: ServiceFunction<UploadFilePayload>;
  userRecommendJobs: ServiceFunction<UsernameWithCountPayload>;
  userRecommendCompanies: ServiceFunction<UsernameWithCountPayload>;
  userJobStars: ServiceFunction<UsernamePayload>;
  userJobRecords: ServiceFunction<UsernamePayload>;
  userGetAllCollectedJobs: ServiceFunction<UsernamePayload>;
  userGetAllResumeRecord: ServiceFunction<UsernamePayload>;

  getAllJobsByCompany: ServiceFunction<CompanyPayload>;
  getAllPostJobs: ServiceFunction<UsernamePayload>;
  postJob: ServiceFunction<PostJobPayload>;
  getOneJob: ServiceFunction<JobPayload>;
  changeJob: ServiceFunction<ChangeJobPayload>;
  deleteJob: ServiceFunction<JobPayload>;
  getOneCompany: ServiceFunction<CompanyPayload>;
  getAllResumeReceive: ServiceFunction<UsernameWithPagePayload>;
  searchResumeReceive: ServiceFunction<SearchResumeReceivePayload>;
  changeResumeStatus: ServiceFunction<ChangeResumeStatusPayload>;
  searchJob: ServiceFunction<TitleWithPagePayload>;
  searchCompany: ServiceFunction<CompanyPayload>;
  collectJob: ServiceFunction<JobPayload>;
  resumeJob: ServiceFunction<JobPayload>;
}
