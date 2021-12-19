import JobPositionCard from '@/components/JobPositionCard';
import { JobPosition } from '@/models';
import MockRecommendJobs from '@/mock/company/recommend-job-position.json';
import { Tabs } from 'antd';

const {TabPane} = Tabs;
function Job() {
  

    // console.log('basic info form -> onFinish:', {
    //   jobType: values.jobType[values.jobType.length - 1],
    //   jobTag: values.jobTag,
    //   city: values.city[values.city.length - 1],
    //   salaryRange: [values.minSalary, values.maxSalary],
    //   userType: values.userType,
    // });
  // }

  return (
    // <div className="flex justify-center items-center w-full bg-blue-400">
    //   {!infoCompleteness.account ? (
    //     // 登录信息表单
    //     <div className="w-4/12 border rounded-2xl px-20 pt-8 pb-12 bg-white" style={{ minWidth: 400 }}>
    //       <h1 className="mb-8 text-center text-xl font-bold">填写用户基本信息</h1>
    //       <RegisterForm form={registerForm} onFinish={handleSubmit} />
    //       <Button type="primary" className="w-full" onClick={() => registerForm.submit()}>下一步</Button>
    //     </div>
    //   ) : (
    //     // 基本求职信息表单
    //     <div className="w-5/12 border rounded-2xl px-16 pt-8 pb-12 bg-white" style={{ minWidth: 540 }}>
    //       <h1 className="mb-8 text-center text-xl font-bold">填写你的求职期望</h1>
    //       <JobInfoForm form={infoForm} onFinish={handleSubmit} />
    //       <Button type="primary" className="w-full" onClick={() => infoForm.submit()}>完成</Button>
    //     </div>
    //   )}
    // </div>
    <div className="flex flex-col w-full">
      <Tabs defaultActiveKey="1" className="mx-20 mt-5">
        <TabPane tab="热门职位" key="1">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {(MockRecommendJobs as JobPosition[]).map(jobInfo => (
              <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Job;
