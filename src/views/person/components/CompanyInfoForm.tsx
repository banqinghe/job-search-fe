
import { Form, FormInstance, Input, Select } from 'antd';
import companyList from '@/mock/company/company-list.json';

interface CompanyInfoFormProps {
  className?: string;
  form: FormInstance;
  onFinish: (values: any) => void;
  onFinishFailed?: (errInfo: any) => void;
  initialValues?: any;
}

const Option = Select.Option;

/**
 * 招聘者的公司信息, 表单项包括:
 * - companyName: string
 * - department: string
 */
function CompanyInfoForm(props: CompanyInfoFormProps) {
  const {
    className = '',
    onFinish,
    onFinishFailed,
    form,
    initialValues,
  } = props;

  return (
    <Form
      form={form}
      className={className}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
      requiredMark={false}
      colon={false}
      labelCol={{ span: 6 }}
      initialValues={initialValues}
    >
      <Form.Item
        name="companyName"
        label="我的公司"
        rules={[{ required: true, message: '请选择你所在的公司' }]}
      >
        <Select showSearch placeholder="">
          {companyList.map((item, index) => (
            <Option key={index} value={item.name}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="department"
        label="我的部门"
        rules={[{ required: true, message: '请填写你所在的部门' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default CompanyInfoForm;
