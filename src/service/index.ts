import axios from 'axios';
import {
  Service,
  UserLoginPayload,
  UserRegisterPayload,
  JobHunterUpdateInfoPayload,
  RecruiterUpdateInfoPayload,
  UserChangePasswordPayload,
  UploadFilePayload,
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
  userLogin: (payload: UserLoginPayload) => axios.post('http://127.0.0.1:8000/user/login', payload),

  /** 用户注册 */
  userRegister: (payload: UserRegisterPayload) => axios.post('http://127.0.0.1:8000/user/register', payload),

  /** 更改账户密码 */
  userChangePassword: (payload: UserChangePasswordPayload) =>
    axios.patch('http://127.0.0.1:8000/user/change_password', payload),

  /** 用户信息更新 */
  userUpdateInfo: (payload: JobHunterUpdateInfoPayload | RecruiterUpdateInfoPayload) =>
    axios.patch('http://127.0.0.1:8000/user/update_info', payload),

  /** 文件上传 */
  uploadFile: (payload: UploadFilePayload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    return axios({
      url: 'http://127.0.0.1:8000/user/upload_file',
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
    });
  },

  // axios.post('http://127.0.0.1:8000/user/upload_file', payload),

  /** 获取推荐职位 */
  userRecommendJobs: (payload: UsernamePayload) =>
    axios.post('http://127.0.0.1:8000/user/recommend_jobs', payload),

  /** 获取用户收藏的职位 */
  userJobStars: (payload: UsernamePayload) => axios.post('http://127.0.0.1:8000/user/job_stars', payload),

  /** 获取用户投递简历记录 */
  userJobRecords: (payload: UsernamePayload) => axios.post('http://127.0.0.1:8000/user/job_records', payload),

  /** 获取所有本用户发布的职位 */
  getAllPostJobs: (payload: UsernamePayload) =>
    axios.get('http://127.0.0.1:8000/job/get_all_post_job', {
      params: payload,
    }),

  /** 发布职位 */
  postJob: (payload: PostJobPayload) =>
    axios.post('http://127.0.0.1:8000/job/post_job', {
      ...payload.jobPositionDetail,
      detail: payload.jobPositionDetail.description
    },
    {
      params: { username: payload.username }
    }),

  /** 更改已发布职位 */
  changeJob: (payload: ChangeJobPayload) => axios.patch('http://127.0.0.1:8000/job/change_job', payload),

  /** 删除已发布的职位 */
  deleteJob: (payload: DeleteJobPayload) => 
    axios.delete('http://127.0.0.1:8000/job/delete_job', { params: {
      job_id: payload.jobId,
    }}),

  /** 获取收到的所有简历投递信息 */
  getAllResumeReceive: (payload: UsernameWithPagePayload) =>
    axios.get('http://127.0.0.1:8000/job/get_all_resume_receive', {
      params: {
        username: payload.username,
        pageSize: payload.pageSize,
        pageNumber: payload.pageNumber,
      },
    }),

  /** 查询简历投递信息 */
  searchResumeReceive: (payload: SearchResumeReceivePayload) =>
    axios.get('http://127.0.0.1:8000/job/search_resume_receive', {
      params: {
        ...payload,
      }
    }),

  /** 变更简历查看状态 */
  changeResumeStatus: (payload: ChangeResumeStatusPayload) =>
    axios.post('http://127.0.0.1:8000/job/change_resume_status', payload),
};

export default service;
