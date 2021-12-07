import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';

interface SearchInputProps {
  className?: string;
  style?: React.CSSProperties;
//   form: FormInstance;
//   onFinish: (values: any) => void;
//   onFinishFailed?: (errInfo: any) => void;
}

function RegisterForm(props: SearchInputProps) {
  const {
    className = '',
    style
  } = props;

  return (
    <div className={className + ' flex'} style={style}>
      <Input className="flex-1" placeholder="搜索职位或公司" />
      <Button type="primary">搜索</Button>
    </div>   
  );
}

export default RegisterForm;
