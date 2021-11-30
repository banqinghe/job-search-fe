import { Form, FormInstance, Input } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';

interface RegisterFormProps {
  className?: string;
  form: FormInstance;
  onFinish: (values: any) => void;
  onFinishFailed?: (errInfo: any) => void;
}

function RegisterForm(props: RegisterFormProps) {
  const {
    className = '',
    onFinish,
    onFinishFailed,
    form,
  } = props;

  return (
    <Form form={form} className={className} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" prefix={<UserOutlined className="mr-2.5" />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请设置密码' }]}
      >
        <Input.Password placeholder="设置密码" prefix={<LockOutlined className="mr-2.5" />} visibilityToggle={false} />
      </Form.Item>
      <Form.Item
        name="passwordConfirm"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            // 确认密码验证
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码输入不一致'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="确认密码" prefix={<UnlockOutlined className="mr-2.5" />} visibilityToggle={false} />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入你的邮箱' },
          { type: 'email', message: '请输入有效的邮箱格式' }
        ]}
      >
        <Input placeholder="邮箱地址" prefix={<MailOutlined className="mr-2.5" />} />
      </Form.Item>
    </Form>
  );
}

export default RegisterForm;
