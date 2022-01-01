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
  JobPayload,
  UsernameWithPagePayload,
  SearchResumeReceivePayload,
  ChangeResumeStatusPayload,
  CompanyPayload,
  TitleWithPagePayload,
  UsernameWithCountPayload,
  JobIdPayload,
} from './index.d';

const host = 'http://127.0.0.1:8000/'

const service: Service = {
  /** 用户登录 */
  userLogin: (payload: UserLoginPayload) => axios.post(host + 'user/login', payload),

  /** 用户注册 */
  userRegister: (payload: UserRegisterPayload) => axios.post(host + 'user/register', payload),

  /** 更改账户密码 */
  userChangePassword: (payload: UserChangePasswordPayload) =>
    axios.patch(host + 'user/change_password', payload),

  /** 用户信息更新 */
  userUpdateInfo: (payload: JobHunterUpdateInfoPayload | RecruiterUpdateInfoPayload) =>
    axios.patch(host + 'user/update_info', payload),

  /** 文件上传 */
  uploadFile: (payload: UploadFilePayload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    return axios({
      url: host + 'user/upload_file',
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
    });
  },

  // axios.post(host + 'user/upload_file', payload),

  /** 获取推荐职位 */
  userRecommendJobs: (payload: UsernameWithCountPayload) =>
    axios.get(host + 'job/recommend_jobs', {
      params: {
        username: payload.username,
        count: payload.count,
      }
    }),

  /** 获取推荐公司 */
  userRecommendCompanies: (payload: UsernameWithCountPayload) =>
    axios.get(host + 'company/recommend_companies', {
      params: {
        username: payload.username,
        count: payload.count,
      }
    }),

  userGetAllCollectedJobs: (payload: UsernamePayload) =>
    axios.get(host + 'job/get_collected_jobs', {
      params: {
        username: payload.username,
      },
    }),

  userGetAllResumeRecord: (payload: UsernamePayload) =>
    axios.get(host + 'job/job_records', {
      params: {
        username: payload.username,
      },
    }),

  /** 获取某一职位 */
  getOneJob: (payload: JobPayload) =>
    axios.get(host + 'job/get_one', {
      params: {
        id: payload.jobId,
        username: payload.username,
      }
    }),
  
  /** 搜索职位 */
  searchJob: (payload: TitleWithPagePayload) =>
    axios.get(host + 'job/search_job', {
      params: {
        title: payload.title,
        pageSize: payload.pageSize,
        pageNumber: payload.pageNumber
      }
    }),

  /** 获取某一公司 */
  getOneCompany: (payload: CompanyPayload) =>
    axios.get(host + 'company/get_one', {
      params: {
        name: payload.companyName,
      }
    }),

  /** 根据公司名模糊搜索 */
  searchCompany: (payload: CompanyPayload) =>
    axios.get(host + 'company/search_company', {
      params: {
        name: payload.companyName || ' ',
      }
    }),

  /** 获取某公司的所有职位 */
  getAllJobsByCompany: (payload: CompanyPayload) =>
    axios.get(host + 'company/get_jobs', {
      params: {
        name: payload.companyName,
      },
    }),

  /** 收藏岗位 */
  collectJob: (payload: JobPayload) => 
    axios.post(host + 'job/collect', null, {
      params: {
        job_id: payload.jobId,
        username: payload.username
      }
    }),

  /** 投递简历 */
  resumeJob: (payload: JobPayload) => 
    axios.post(host + 'job/resume', null, {
      params: {
        job_id: payload.jobId,
        username: payload.username
      }
    }),

  /** 获取用户收藏的职位 */
  userJobStars: (payload: UsernamePayload) => axios.post(host + 'user/job_stars', payload),

  /** 获取用户投递简历记录 */
  userJobRecords: (payload: UsernamePayload) => axios.post(host + 'user/job_records', payload),

  /** 获取所有本用户发布的职位 */
  getAllPostJobs: (payload: UsernamePayload) =>
    axios.get(host + 'job/get_all_post_job', {
      params: payload,
    }),

  /** 发布职位 */
  postJob: (payload: PostJobPayload) =>
    axios.post(host + 'job/post_job', {
      ...payload.jobPositionDetail,
      detail: payload.jobPositionDetail.description
    },
    {
      params: { username: payload.username }
    }),

  /** 更改已发布职位 */
  changeJob: (payload: ChangeJobPayload) => axios.patch(host + 'job/change_job', payload),

  /** 删除已发布的职位 */
  deleteJob: (payload: JobIdPayload) => 
    axios.delete(host + 'job/delete_job', { params: {
      job_id: payload.jobId,
    }}),

  /** 获取收到的所有简历投递信息 */
  getAllResumeReceive: (payload: UsernameWithPagePayload) =>
    axios.get(host + 'job/get_all_resume_receive', {
      params: {
        username: payload.username,
        pageSize: payload.pageSize,
        pageNumber: payload.pageNumber,
      },
    }),

  /** 查询简历投递信息 */
  searchResumeReceive: (payload: SearchResumeReceivePayload) =>
    axios.get(host + 'job/search_resume_receive', {
      params: {
        ...payload,
      }
    }),

  /** 变更简历查看状态 */
  changeResumeStatus: (payload: ChangeResumeStatusPayload) =>
    axios.post(host + 'job/change_resume_status', null, {
      params: {
        recordId: payload.recordId,
      },
    }),
};

export default service;
