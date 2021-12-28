import { Modal, Form, Input, Button, message } from 'antd';
import { FireOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { GlobalState, UserInfoState } from '@/store/state';
import service from '@/service';

interface ChangePasswordProps {
  visible: boolean;
  onCancel: () => void;
}

function ChangePasswordModal(props: ChangePasswordProps) {
  const { visible, onCancel } = props;

  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  function handleChangePassword(values: any) {
    service.userChangePassword({
      username: userInfo.username,
      password: values.password,
      newPassword: values.newPassword,
    }).then(() => {
      message.success('密码修改成功');
      onCancel();
    }).catch(() => {
      message.warning('密码输入错误');
    })
  }


  return (
    <Modal
      visible={visible}
      width={420}
      maskClosable={false}
      footer={null}
      onCancel={onCancel}
    >
      <p className="mb-8 text-center font-bold text-xl">修改密码</p>
      <Form
        className="w-10/12 mx-auto"
        colon={false}
        onFinish={handleChangePassword}
        onFinishFailed={errInfo => console.log(errInfo)}
        requiredMark={false}
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入现在的密码' }]}
        >
          <Input.Password placeholder="现在的密码" prefix={<LockOutlined className="mr-2.5" />} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password placeholder="新密码" prefix={<FireOutlined className="mr-2.5" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-3.5 h-10">点击更改</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
