import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import MockRecommendCompanies from '@/mock/company/recommend-company.json';
import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons'
import { Company } from '@/models';

function Job() {
  const [collectLoading, setCollectLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const params = useParams();
  const id = parseInt(params.id ?? '-1', 10);
  const job = MockRecommendJobs[id];
  
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);

  useEffect(() => {
    (MockRecommendCompanies as Company[]).map(company => {
      if (company.name === job.company){
        setCompanyInfo(company)
      }
    })
  }, [id])

  return (
    <div className="flex flex-col w-full bg-gray-100">
      <div className="flex justify-between mx-60">
        <div className="flex flex-col space-y-5">
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
        <div className="flex items-end space-x-5">
          <Button
            className="flex items-center"
            type="default"
            loading={collectLoading}
            onClick={() => {
              console.log(params)
              setCollectLoading(true)
              setTimeout(() => setCollectLoading(false), 1000)
            }}
          >
            收藏
          </Button>
          <Button
            className="flex items-center"
            type="primary"
            loading={sendLoading}
            onClick={() => {
              setSendLoading(true)
              setTimeout(() => setSendLoading(false), 1000)
            }}
          >
            投递简历
          </Button>
        </div>
      </div>
      <div className="flex ml-60 mb-10">
        <p className="mt-5 space-x-5">
          <span className="text-gray-600 text-base">{job.company}</span>
          <span className="text-gray-400 text-sm">{job.postTime}</span>
          <span className="text-gray-400 text-sm">发布于本网站</span>
        </p>
      </div>
      
      <div className="flex space-x-2 h-full">
        <div className="flex-1 bg-white pl-60">
          123
        </div>
        <div className="flex flex-col items-start bg-white pr-60 pl-8 pt-6 space-y-5">
          <div className="flex items-end space-x-5">
            <img className="w-24 h-24 border border-gray-200" src={job.logoUrl} alt={job.company + ' logo'} />
            <span className="text-lg">{job.company}</span>
          </div>
          <p>
            <HomeOutlined />
            {companyInfo && (
              <a href={companyInfo.officialLink}>公司官网</a>
            )}
            {/* <a href={company. }>公司官网</a> */}
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Job;
