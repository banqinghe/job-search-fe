import JobPositionCard from '@/components/JobPositionCard';
import { Company, JobPosition } from '@/models';
import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import MockRecommendCompanys from '@/mock/company/recommend-company.json';
import { Tabs } from 'antd';
import CompanyCard from '@/components/CompanyCard';
import SearchInput from '../home/components/SearchInput';

const {TabPane} = Tabs;
function Jobs() {
  

    // console.log('basic info form -> onFinish:', {
    //   jobType: values.jobType[values.jobType.length - 1],
    //   jobTag: values.jobTag,
    //   city: values.city[values.city.length - 1],
    //   salaryRange: [values.minSalary, values.maxSalary],
    //   userType: values.userType,
    // });
  // }

  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 p-6 w-full flex justify-center">
        <SearchInput className="w-7/12" style={{ minWidth: 800 }} placeholder='搜索职位' onSearch={value => location.search = '?searchParams=' + value}/>
      </div>
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门职位" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-3">
            {(MockRecommendJobs as JobPosition[]).map(jobInfo => (
              <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} onClick={() => open('/job/' + jobInfo.id, '_blank')} />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Jobs;
