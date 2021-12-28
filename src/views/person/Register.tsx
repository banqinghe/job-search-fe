import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message } from 'antd';
import RegisterForm from './components/RegisterForm';
import JobInfoForm from './components/JobInfoForm';
import CompanyInfoForm from './components/CompanyInfoForm';
import { GlobalState, UserInfoState } from '@/store/state';
import { Role } from '@/enums';
import service from '@/service';

function Register() {
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch({ type: 'bar/display', payload: false });
    return () => {
      dispatch({ type: 'bar/display', payload: true });
    };
  }, []);

  const [registerForm] = Form.useForm();
  const [infoForm] = Form.useForm();
  const [companyForm] = Form.useForm();

  function handleSubmit(values: any) {
    if (userInfo.role === Role.NOT_LOGGED) {
      service.userRegister({
        username: values.username,
        password: values.password,
        role: values.role === 'jobHunter' ? Role.JOB_HUNTER : Role.RECRUITER,
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
      }).then(res => {
        dispatch({ type: 'user/updateInfo', payload: res.data });
      }).catch(() => {
        message.warning('用户名已存在');
      });
      return;
    } else if (userInfo.role === Role.JOB_HUNTER) {
      service.userUpdateInfo({
        ...userInfo,
        jobType: values.jobType[values.jobType.length - 1],
        jobTag: values.jobTag,
        university: values.university,
        education: values.education,
        city: values.city[values.city.length - 1],
        salaryRange: [values.minSalary, values.maxSalary],
        userType: values.userType,
        resumeUrl: "",
        avatarUrl: "",
      }).then(res => {
        console.log('jobHunter update info res:', res);
        dispatch({ type: 'user/updateInfo', payload: res.data });
        navigate('/');
      });
    } else if (userInfo.role === Role.RECRUITER) {
      service.userUpdateInfo({
        ...userInfo,
        company: values.companyName,
        department: values.department,
      }).then(res => {
        console.log('recruiter update info res:', res.data);
        dispatch({ type: 'user/updateInfo', payload: res.data });
        navigate('/');
      })
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
