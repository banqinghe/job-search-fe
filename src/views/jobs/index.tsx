import JobPositionCard from '@/components/JobPositionCard';
import { Company, JobPosition } from '@/models';
import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import MockRecommendCompanys from '@/mock/company/recommend-company.json';
import { Tabs } from 'antd';
import CompanyCard from '@/components/CompanyCard';
import SearchInput from '../home/components/SearchInput';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import service from '@/service';

const {TabPane} = Tabs;
function Jobs() {
  const params = (new URLSearchParams(location.search));
  const searchParams = params.get('searchParams') ?? '';
  const [jobPositionList, setJobPositionList] = useState<JobPosition[]>([]);
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    service.searchJob({title: searchParams, pageNumber: 1, pageSize: 9})
      .then(res => setJobPositionList(res.data))
    service.searchCompany({companyName: searchParams})
      .then(res => setCompany(res.data[0]))  
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 p-6 w-full flex justify-center">
        <SearchInput
          className="w-7/12"
          style={{ minWidth: 800 }}
          placeholder='搜索职位'
          onSearch={value => {location.search = '?searchParams=' + value}}
          defaultSearchParams={searchParams}
        />
      </div>
      {company && 
        <div className="w-full flex flex-col items-center">
          <CompanyCard companyInfo={company} className="w-2/3 m-3"
            CardClick={() => open('/company/' + company.name, '_blank')}
            JobClick={() => open('/company/' + company.name + '?showJob=true', '_blank')}
            ResumeClick={() => open('/company/' + company.name, '_blank')}
          />
        </div>
      }
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门职位" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-3">
            {(jobPositionList as JobPosition[]).map(jobInfo => (
              <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} onClick={() => open('/job/' + jobInfo.id, '_blank')} />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Jobs;
