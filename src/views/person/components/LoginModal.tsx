import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Role } from '@/enums';
interface LoginModalProps {
  visible: boolean;
  onFinish: () => void;
  onCancel: () => void;
}

function LoginModal(props: LoginModalProps) {
  const { visible, onCancel, onFinish } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(values: any) {
    // TODO: 登录验证
    dispatch({type: 'auth/login', payload: {
      username: values.username,
      role: Role.JOB_HUNTER,
    }});
    onFinish && onFinish();
  }

  function handleClickRegister() {
    onCancel();
    navigate('/register');
  }

  return (
    <Modal
      visible={visible}
      width={420}
      maskClosable={false}
      footer={null}
      onCancel={onCancel}
    >
      <p className="mb-8 text-center font-bold text-xl">JOB SEARCH</p>
      <Form
        className="w-10/12 mx-auto"
        colon={false}
        onFinish={handleLogin}
        onFinishFailed={errInfo => console.log(errInfo)}
        requiredMark={false}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" prefix={<UserOutlined className="mr-2.5" />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" prefix={<LockOutlined className="mr-2.5" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-3.5 h-10">登录</Button>
        </Form.Item>
      </Form>
      <div className="mb-4 text-center text-xs">
        还没有创建账户？点击
        <button type="button" className="text-blue-600 hover:underline" onClick={handleClickRegister}>
          注册
        </button>
      </div>
    </Modal>
  );
}

export default LoginModal;
