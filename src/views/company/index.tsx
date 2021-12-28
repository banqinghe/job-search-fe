import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import MockRecommendCompanies from '@/mock/company/recommend-company.json';
import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined, FileOutlined } from '@ant-design/icons'
import { CompanyDetail, JobPosition } from '@/models'
import JobPositionCard from '@/components/JobPositionCard';
import ReactMarkdown from 'react-markdown';
import service from '@/service';

const {TabPane} = Tabs;

function CompanyPage() {
  const params = useParams();
  const name = params.name ?? '未知公司';
  
  const [companyInfo, setCompanyInfo] = useState<CompanyDetail | null>(null);

  useEffect(() => {
    service.getOneCompany({companyName: name}).then(
      res => {
        setCompanyInfo(res.data)
      }
    )
    document.title = name + '公司详情';
  }, [name])

  return (
    companyInfo && (
      <div className="flex flex-col w-full bg-gray-100">
        <div className="flex justify-start mx-40 border border-gray-200 mt-3 bg-white p-5 rounded-t-lg">
          <img className="w-40 h-40 border border-gray-100" src={companyInfo.logoUrl} alt={companyInfo.name + ' logo'} />
          <div className="flex flex-col w-full">
            <div className="m-5 space-y-3">
              <a href={companyInfo.officialLink} target={"_blank"} className="text-2xl">{companyInfo.name}</a>
              <p>{companyInfo.description}</p>
            </div>
            
            <div className="flex h-full divide-x">
              <div className = "flex flex-col items-center justify-center px-5 text-gray-500">
                <p>{companyInfo.jobNumber}</p>
                <p>招聘岗位</p>
              </div>
              <div className = "flex flex-col items-center justify-center px-5 text-gray-500">
                <p>{companyInfo.resumeNumber}</p>
                <p>收到简历</p>
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultActiveKey="1" className="mx-40 bg-white px-8" style={{ minHeight: '55vh' }}>
          <TabPane tab="公司主页" key="1">
            <ReactMarkdown className="markdown-body py-5 pr-12">{companyInfo.detail}</ReactMarkdown>
          </TabPane>
          <TabPane tab="招聘职位" key="2">
            {(MockRecommendJobs as JobPosition[]).map(jobInfo =>(
              <JobPositionCard jobInfo={jobInfo} />
            ))}
          </TabPane>
        </Tabs>
      </div>
    )
  );
}

export default CompanyPage;
