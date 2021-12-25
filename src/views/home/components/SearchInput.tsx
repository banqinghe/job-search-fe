import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';

interface SearchInputProps {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
//   form: FormInstance;
//   onFinish: (values: any) => void;
//   onFinishFailed?: (errInfo: any) => void;
}

function SearchInput(props: SearchInputProps) {
  const {
    className = '',
    style,
    placeholder = '请输入查询条件'
  } = props;

  return (
    <div className={className + ' flex'} style={style}>
      <Input className="flex-1" placeholder={placeholder} />
      <Button type="primary">搜索</Button>
    </div>   
  );
}

export default SearchInput;
