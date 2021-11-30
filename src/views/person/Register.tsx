import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message } from 'antd';
import RegisterForm from './components/RegisterForm';
import JobInfoForm from './components/JobInfoForm';
import { GlobalState, UserInfoCompletenessState } from '@/store/state';

function Register() {
  const infoCompleteness = useSelector<GlobalState, UserInfoCompletenessState>(state => state.infoCompleteness);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 已经完成注册流程，非法访问，重定向至主页
    // if (infoCompleteness.account) {
    //   message.warning('你已完成注册流程');
    //   navigate('/', { replace: true });
    // }
    dispatch({type: 'bar/display', payload: false });
    return () => {
      dispatch({type: 'bar/display', payload: true });
    };
  }, []);

  const [registerForm] = Form.useForm();
  const [infoForm] = Form.useForm();

  function handleSubmit(values: any) {
    console.log('invoke onFinish:', values);

    if (!infoCompleteness.account) {
      // TODO: 发送账户注册请求，变更全局状态
      Promise
        .resolve()
        .then(() => {
          dispatch({
            type: 'auth/infoCompleteness',
            payload: {
              account: true,
            },
          });
        });

      return;
    }

    if (!infoCompleteness.jobInfo) {
      // TODO: 发送工作信息请求，直接登录，导航至首页
      Promise
        .resolve()
        .then(() => {
          dispatch({
            type: 'auth/infoCompleteness',
            payload: {
              jobInfo: true,
            },
          });
          navigate('/');
        });
    }

    // console.log('basic info form -> onFinish:', {
    //   jobType: values.jobType[values.jobType.length - 1],
    //   jobTag: values.jobTag,
    //   city: values.city[values.city.length - 1],
    //   salaryRange: [values.minSalary, values.maxSalary],
    //   userType: values.userType,
    // });
  }

  return (
    <div className="flex justify-center items-center w-full bg-blue-400">
      {!infoCompleteness.account ? (
        // 登录信息表单
        <div className="w-4/12 border rounded-2xl px-20 pt-8 pb-12 bg-white" style={{ minWidth: 400 }}>
          <h1 className="mb-8 text-center text-xl font-bold">填写用户基本信息</h1>
          <RegisterForm form={registerForm} onFinish={handleSubmit} />
          <Button type="primary" className="w-full" onClick={() => registerForm.submit()}>下一步</Button>
        </div>
      ) : (
        // 基本求职信息表单
        <div className="w-5/12 border rounded-2xl px-16 pt-8 pb-12 bg-white" style={{ minWidth: 540 }}>
          <h1 className="mb-8 text-center text-xl font-bold">填写你的求职期望</h1>
          <JobInfoForm form={infoForm} onFinish={handleSubmit} />
          <Button type="primary" className="w-full" onClick={() => infoForm.submit()}>完成</Button>
        </div>
      )}
    </div>
  );
}

export default Register;
