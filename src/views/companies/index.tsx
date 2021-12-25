import JobPositionCard from '@/components/JobPositionCard';
import { Company, JobPosition } from '@/models';
import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import MockRecommendCompanys from '@/mock/company/recommend-company.json';
import { Tabs } from 'antd';
import CompanyCard from '@/components/CompanyCard';
import SearchInput from '../home/components/SearchInput';

const {TabPane} = Tabs;
function Companies() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 p-6 w-full flex justify-center">
        <SearchInput className="w-7/12" style={{ minWidth: 800 }} placeholder="搜索公司"/>
      </div>
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门公司" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
            {(MockRecommendCompanys as Company[]).map(companyInfo => (
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
