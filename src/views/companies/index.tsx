import JobPositionCard from '@/components/JobPositionCard';
import { Company, JobPosition } from '@/models';
import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import MockRecommendCompanys from '@/mock/company/recommend-company.json';
import { Tabs } from 'antd';
import CompanyCard from '@/components/CompanyCard';
import SearchInput from '../home/components/SearchInput';
import { useEffect, useState } from 'react';
import service from '@/service';
import { GlobalState, UserInfoState } from '@/store/state';
import { useSelector } from 'react-redux';

const {TabPane} = Tabs;
function Companies() {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  useEffect(() =>{
    service.userRecommendCompanies({username: userInfo.username, count: 9})
      .then(res => setCompanyList(res.data));
  }, []);
  return (
    <div className="flex flex-col w-full">
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门公司" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
            {(companyList as Company[]).map(companyInfo => (
              <CompanyCard key={companyInfo.name} companyInfo={companyInfo} 
                CardClick={() =>open('/company/' + companyInfo.name, '_blank')}
                JobClick={() => open('/jobs/' + companyInfo.name, '_blank')}
                ResumeClick={() => open('/company/' + companyInfo.name, '_blank')}
              />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Companies;
