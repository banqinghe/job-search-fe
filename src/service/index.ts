import axios from 'axios';
import {
  Service,
  UserLoginPayload,
  UserRegisterPayload,
  JobHunterUpdateInfoPayload,
  RecruiterUpdateInfoPayload,
  UserChangePasswordPayload,
  UserUploadAvatarPayload,
  UserUploadResumePayload,
  UsernamePayload,
  PostJobPayload,
  ChangeJobPayload,
  DeleteJobPayload,
  UsernameWithPagePayload,
  SearchResumeReceivePayload,
  ChangeResumeStatusPayload,
} from './index.d';

const service: Service = {
  /** 用户登录 */
  userLogin: (payload: UserLoginPayload) => axios.post('/user/login', payload),

  /** 用户注册 */
  userRegister: (payload: UserRegisterPayload) => axios.post('/user/register', payload),
  
  /** 更改账户密码 */
  userChangePassword: (payload: UserChangePasswordPayload) =>
    axios.post('/user/change_password', payload),

  /** 用户信息更新 */
  userUpdateInfo: (payload: JobHunterUpdateInfoPayload | RecruiterUpdateInfoPayload) =>
    axios.post('/user/update_info', payload),
  
  /** 头像上传 */
  userUploadAvatar: (payload: UserUploadAvatarPayload) =>
    axios.post('/user/upload_avatar', payload),

  /** 简历上传 */
  userUploadResume: (payload: UserUploadResumePayload) => 
    axios.post('/user/upload_resume', payload),
    
  /** 获取推荐职位 */
  userRecommendJobs: (payload: UsernamePayload) =>
    axios.post('/user/recommend_jobs', payload),
  
  /** 获取用户收藏的职位 */
  userJobStars: (payload: UsernamePayload) => axios.post('/user/job_stars', payload),

  /** 获取用户投递简历记录 */
  userJobRecords: (payload: UsernamePayload) => axios.post('/user/job_records', payload),

  /** 获取所有本用户发布的职位 */
  getAllPostJobs: (payload: UsernamePayload) =>
    axios.post('/job/get_all_post_job', payload),
  
  /** 发布职位 */
  postJob: (payload: PostJobPayload) => axios.post('/job/post_job', payload),

  /** 更改已发布职位 */
  changeJob: (payload: ChangeJobPayload) => axios.post('/job/change_job', payload),

  /** 删除已发布的职位 */
  deleteJob: (payload: DeleteJobPayload) => axios.post('/job/delete_job', payload),

  /** 获取收到的所有简历投递信息 */
  getAllResumeReceive: (payload: UsernameWithPagePayload) =>
    axios.post('/job/get_all_resume_receive', payload),
  
  /** 查询简历投递信息 */
  searchResumeReceive: (payload: SearchResumeReceivePayload) =>
    axios.post('/job/search_resume_receive', payload),

  /** 变更简历查看状态 */
  changeResumeStatus: (payload: ChangeResumeStatusPayload) =>
    axios.post('/job/change_resume_status', payload),
}; 

export default service;
