import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Modal, Form } from 'antd';
import service from '@/service';
import { GlobalState, UserInfoState } from '@/store/state';
import { Role } from '@/enums';
import JobInfoForm from './JobInfoForm';
import CompanyInfoForm from './CompanyInfoForm';
import { getLocationArray } from '@/utils';

interface UpdateInfoModal {
  visible: boolean;
  onCancel: () => void;
  role: Role
}

function UpdateInfoModal(props: UpdateInfoModal) {
  const {
    visible,
    onCancel,
    role = Role.JOB_HUNTER,
  } = props;

  const dispatch = useDispatch();
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  const [jobHunterForm] = Form.useForm();
  const [recruiterForm] = Form.useForm();

  useEffect(() => {
    if (role === Role.JOB_HUNTER) {
      jobHunterForm.setFieldsValue({
        city: getLocationArray(userInfo.city!),
        university: userInfo.university,
        education: userInfo.education,
        minSalary: userInfo.salaryRange ? userInfo.salaryRange[0] : 0,
        maxSalary: userInfo.salaryRange ? userInfo.salaryRange[1] : 0,
      });
    } else {
      recruiterForm.setFieldsValue({
        companyName: userInfo.company,
        department: userInfo.department,
      });
    }
  }, [userInfo]);

  function handleOk() {
    if (role === Role.JOB_HUNTER) {
      jobHunterForm.submit();
    } else {
      recruiterForm.submit();
    }
  }

  function updateJobHunterInfo(values: any) {
    const newInfo = {
      jobType: values.jobType[values.jobType.length - 1],
      jobTag: values.jobTag ?? [],
      university: values.university,
      education: values.education,
      city: values.city[values.city.length - 1],
      salaryRange: [values.minSalary, values.maxSalary],
      userType: values.userType,
    };
    service
      .userUpdateInfo({ ...userInfo, ...newInfo } as any)
      .then(res => {
        message.success('修改成功');
        dispatch({ type: 'user/updateInfo', payload: res.data });
        onCancel();
      });
  }

  function updateRecruiterInfo(values: any) {
    const newInfo = {
      company: values.company,
      department: values.department,
    };
    service
      .userUpdateInfo({ ...userInfo, ...newInfo } as any)
      .then(res => {
        message.success('修改成功');
        dispatch({ type: 'user/updateInfo', payload: res.data });
        onCancel();
      });
  }

  return (
    <Modal
      visible={visible}
      title="更新个人信息"
      onCancel={onCancel}
      okText="确认"
      onOk={handleOk}
      cancelText="取消"
    >
      {role === Role.JOB_HUNTER ? (
        <JobInfoForm
          form={jobHunterForm}
          onFinish={updateJobHunterInfo}
        />
      ) : (
        <CompanyInfoForm
          form={recruiterForm}
          onFinish={updateRecruiterInfo}
        />
      )}
    </Modal>
  );
}

export default UpdateInfoModal;
