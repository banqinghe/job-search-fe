import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined, FileOutlined } from '@ant-design/icons'
import { Company, JobPositionDetail, JobPositionJobHunterDetail } from '@/models';
import ReactMarkdown from 'react-markdown';
import service from '@/service';
import { formatDate } from '@/utils';
import { GlobalState, UserInfoState } from '@/store/state';
import { useSelector } from 'react-redux';
import { Role } from '@/enums';

function Job() {
  const [collectLoading, setCollectLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const params = useParams();
  const [job, setJob] = useState<JobPositionJobHunterDetail>();
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);
  

  useEffect(() => {
    service.getOneJob({jobId: params.id ?? '', username: userInfo.username || 'lzk'})
      .then(res => {
        const jobData: JobPositionJobHunterDetail = res.data;
        // document.title = jobData.title + '招聘';
        setJob(jobData)
        return service.getOneCompany({companyName: jobData.company}).then(
          res => {
            setCompanyInfo(res.data)
          }
        )
      });
  }, [params.id])

  return (
    job ? (
      <div className="flex flex-col w-full bg-gray-100">
        <div className="flex justify-between mx-60">
          <div className="flex flex-col space-y-5" style={{ minWidth: 350 }}>
            <p className="mt-7 space-x-2">
              <span className='text-2xl'>{job.title}</span>
              <span className="text-blue-500 text-2xl font-bold">
                {job.salaryRange[0]}k - {job.salaryRange[1]}k
              </span>
            </p>
            <p className="space-x-2">
                <span>{Array.isArray(job.location) ? job.location.join('、') : job.location} /</span>
                <span>{job.experienceRequirement ?? '经验不限'} /</span>
                <span>{job.educationRequirement ?? '学历不限'}</span>
            </p>
          </div>
          {userInfo.role === Role.JOB_HUNTER && <div className="flex items-end space-x-5">
            <Button
              className="flex items-center"
              type="default"
              loading={collectLoading}
              onClick={() => {
                setCollectLoading(true)
                service.collectJob({username: userInfo.username, jobId: job.id}).then(() =>{
                  // setJob(prev => ({...prev, prev.})})
                  setJob((prev: any) => ({...prev, collected: true}))
                  setCollectLoading(false)
                })
              }}
              disabled={job.collected}
            >
              {job.collected ? '已收藏':'收藏'}
            </Button>
            <Button
              className="flex items-center"
              type="primary"
              loading={resumeLoading}
              onClick={() => {
                setResumeLoading(true)
                service.resumeJob({username: userInfo.username, jobId: job.id}).then(() =>{
                  // setJob(prev => ({...prev, prev.})})
                  setJob((prev: any) => ({...prev, resumed: true}))
                  setResumeLoading(false)
                })
              }}
              disabled={job.resumed}
            >
              {job.resumed ? '已投递':'投递简历'}
            </Button>
          </div>}
        </div>
        <div className="flex ml-60 mb-7" style={{ minWidth: 350 }}>
          <p className="mt-5 space-x-5">
            <span className="text-gray-600 text-base">{job.company}</span>
            <span className="text-gray-400 text-sm">{formatDate(new Date(job.postTime))}</span>
            <span className="text-gray-400 text-sm">发布于本网站</span>
          </p>
        </div>
        
        <div className="flex space-x-2 h-full">
          <div className="flex-1 bg-white pl-60">
            <ReactMarkdown className="markdown-body py-5 pr-12">{job.description}</ReactMarkdown>
          </div>
          <div className="flex flex-col items-start bg-white pr-24 pl-8 pt-6">
            <div className="flex items-end space-x-5 cursor-pointer" style={{ minWidth: 200 }} onClick={() => open('/company/' + job.company, '_blank')}>
              <img className="w-24 h-24 border border-gray-200" src={job.logoUrl} alt={job.company + ' logo'} />
              <span className="text-lg">{job.company}</span>
            </div>
            {companyInfo && (
              <div className="space-y-4 mt-6" style={{ minWidth: 200 }}>
                <p className="flex items-center space-x-2">
                  <HomeOutlined />
                  <a href={companyInfo.officialLink} target="_blank">公司官网</a>
                </p>
                <p className="flex items-center space-x-2">
                  <UserOutlined />
                    <span>{'在招岗位 ' + companyInfo.jobNumber}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <FileOutlined />
                    <span>{'已收简历 ' + companyInfo.resumeNumber}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        
      </div>

    ) : (
      <div>loading...</div>
    )
  );
}

export default Job;
