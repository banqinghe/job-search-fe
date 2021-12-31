import SearchInput from './components/SearchInput';
import JobPositionCard from '@/components/JobPositionCard';
import { Company, JobPosition } from '@/models';
import { Tabs } from 'antd';
import CompanyCard from '@/components/CompanyCard';
import { useEffect, useState } from 'react';
import service from '@/service';
import { GlobalState, UserInfoState } from '@/store/state';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

function Home() {
  const [jobPositionList, setJobPositionList] = useState<JobPosition[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);
  useEffect(() => {
    service.userRecommendJobs({ username: userInfo.username, count: 9 })
      .then(res => setJobPositionList(res.data));
    service.userRecommendCompanies({ username: userInfo.username, count: 9 })
      .then(res => setCompanyList(res.data));
  }, []);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 p-6 w-full flex justify-center">
        <SearchInput className="w-7/12" style={{ minWidth: 800 }} placeholder="搜索职位或公司"
          onSearch={value => navigate(`/jobs?searchParams=${value}`)}
        />
      </div>
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门职位" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {(jobPositionList).map(jobInfo => (
              <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} onClick={() => open('/job/' + jobInfo.id, '_blank')} />
            ))}
          </div>
        </TabPane>
      </Tabs>
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门公司" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
            {(companyList as Company[]).map(companyInfo => (
              <CompanyCard key={companyInfo.name} companyInfo={companyInfo}
                CardClick={() => open('/company/' + companyInfo.name, '_blank')}
                JobClick={() => open('/company/' + companyInfo.name +'?showJob=true', '_blank')}
                ResumeClick={() => open('/company/' + companyInfo.name, '_blank')}
              />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Home;
