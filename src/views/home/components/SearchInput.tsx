import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface SearchInputProps {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  onSearch: (value: string) => void;
//   form: FormInstance;
//   onFinish: (values: any) => void;
//   onFinishFailed?: (errInfo: any) => void;
}

function SearchInput(props: SearchInputProps) {
  const {
    className = '',
    style,
    placeholder = '请输入查询条件',
    onSearch
  } = props;

  const [value, setValue] = useState('');

  return (
    <div className={className + ' flex'} style={style}>
      <Input className="flex-1" placeholder={placeholder} onPressEnter={() => onSearch(value)} onChange={e => setValue(e.target.value)} />
      <Button type="primary" onClick={() => onSearch(value)}>搜索</Button>
    </div>   
  );
}

export default SearchInput;
