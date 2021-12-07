import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message } from 'antd';
import { GlobalState, UserInfoCompletenessState } from '@/store/state';
import SearchInput from './components/SearchInput';

function Home() {
  

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
    <div className="flex flex-col items-center w-full">
      <div className="bg-gray-100 p-6 w-full flex justify-center">
        <SearchInput className="w-7/12" style={{ minWidth: 800 }}/>
      </div>
      
    </div>
  );
}

export default Home;
