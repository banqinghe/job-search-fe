import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message } from 'antd';
import RegisterForm from './components/RegisterForm';
import JobInfoForm from './components/JobInfoForm';
import CompanyInfoForm from './components/CompanyInfoForm';
import { GlobalState, UserInfoState } from '@/store/state';
import { Role } from '@/enums';

function Register() {
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('current user info', userInfo);

  useEffect(() => {
    // 已经完成注册流程，非法访问，重定向至主页
    // if (infoCompleteness.account) {
    //   message.warning('你已完成注册流程');
    //   navigate('/', { replace: true });
    // }
    dispatch({ type: 'bar/display', payload: false });
    return () => {
      dispatch({ type: 'bar/display', payload: true });
    };
  }, []);

  const [registerForm] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [companyForm] = Form.useForm();

  function handleSubmit(values: any) {
    console.log('invoke onFinish:', values);

    if (userInfo.role === Role.NOT_LOGGED) {
      // TODO: 发送账户注册请求，变更全局状态
      Promise
        .resolve()
        .then(() => {
          dispatch({
            type: 'user/updateInfo',
            payload: {
              username: values.username,
              name: values.name,
              role: values.role === 'job_hunter' ? Role.JOB_HUNTER : Role.RECRUITER,
              phoneNumber: values.phoneNumber,
              email: values.email,
            },
          });
        });

      return;
    } else if (userInfo.role === Role.JOB_HUNTER) {
      // TODO: 发送工作信息请求，直接登录，导航至首页
      Promise
        .resolve()
        .then(() => {
          dispatch({
            type: 'user/updateInfo',
            payload: {
              ...userInfo,
              jobType: values.jobType[values.jobType.length - 1],
              jobTag: values.jobTag,
              university: values.university,
              education: values.education,
              city: values.city[values.city.length - 1],
              salaryRange: [values.minSalary, values.maxSalary],
              userType: values.userType,
            },
          });
          navigate('/');
        });
    } else if (userInfo.role === Role.RECRUITER) {
      Promise
        .resolve()
        .then(() => {
          dispatch({
            type: 'user/updateInfo',
            payload: {
              ...userInfo,
              company: values.companyName,
              department: values.department,
            },
          });
          navigate('/');
        });
    }

  }

  return (
    <div className="flex justify-center items-center w-full bg-blue-400">
      {userInfo.role === Role.NOT_LOGGED && (
        // 登录信息表单
        <div className="w-4/12 border rounded-2xl px-20 pt-8 pb-12 bg-white" style={{ minWidth: 400 }}>
          <h1 className="mb-8 text-center text-xl font-bold">填写用户基本信息</h1>
          <RegisterForm form={registerForm} onFinish={handleSubmit} />
          <Button type="primary" className="w-full" onClick={() => registerForm.submit()}>下一步</Button>
        </div>
      )}
      {userInfo.role === Role.JOB_HUNTER && (
        // 基本求职信息表单
        <div className="w-5/12 border rounded-2xl px-16 pt-8 pb-12 bg-white" style={{ minWidth: 540 }}>
          <h1 className="mb-8 text-center text-xl font-bold">填写你的求职期望</h1>
          <JobInfoForm form={infoForm} onFinish={handleSubmit} />
          <Button type="primary" className="w-full" onClick={() => infoForm.submit()}>完成</Button>
        </div>
      )}
      {userInfo.role === Role.RECRUITER && (
        // 招聘者信息表单
        // TODO: 招聘者需要与其所在公司联系起来，利用 Select 
        // 公司的注册则需要其他流程，比如相关法律程序，太麻烦也不了解，不做
        <div className="w-4/12 border rounded-2xl px-20 pt-8 pb-12 bg-white" style={{ minWidth: 400 }}>
          <h1 className="mb-8 text-center text-xl font-bold">填写所在公司的基本信息</h1>
          <CompanyInfoForm form={companyForm} onFinish={handleSubmit} />
          <Button type="primary" className="w-full" onClick={() => companyForm.submit()}>完成</Button>
        </div>
      )}
    </div>
  );
}

export default Register;
