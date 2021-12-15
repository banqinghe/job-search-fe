import { Form, FormInstance, Input, Cascader, Select } from 'antd';
import cities from '@/assets/city.json';

const Option = Select.Option;

const expectedSalaryOptions = Array.from({ length: 100 }, (_, index) => (index + 1));

export interface JobPostFormValues {
  title: string;
  location: string[][];
  experienceRequirement?: string;
  educationRequirement?: string;
  minSalary: number;
  maxSalary: number;
  description: string;
}

interface JobPostFormProps {
  className?: string;
  form: FormInstance;
  onFinish: (values: any) => void;
  onFinishFailed?: (errInfo: any) => void;
  initialValues?: any;
}

function JobPostForm(props: JobPostFormProps) {
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
      labelCol={{ span: 5 }}
      initialValues={initialValues}
    >
      <Form.Item
        label="职位名称"
        name="title"
        rules={[{ required: true, message: '请填写职位名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="工作地点"
        name="location"
        rules={[{ required: true, message: '请选择该工作的所在地点' }]}
      >
        <Cascader
          placeholder=""
          multiple
          options={cities.map(province => ({
            value: province.value,
            label: province.value,
            children: province.children.map(city => ({ value: city, label: city }))
          }))}
        />
      </Form.Item>
      <Form.Item
        label="经验要求"
        name="experienceRequirement"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="学历要求"
        name="educationRequirement"
      >
        <Select allowClear>
          <Option value="中专">中专</Option>
          <Option value="大专">大专</Option>
          <Option value="本科">本科</Option>
          <Option value="硕士">硕士</Option>
          <Option value="博士">博士</Option>
        </Select>
      </Form.Item>
      <Form.Item label="薪资范围">
        <Form.Item
          name="minSalary"
          style={{ display: 'inline-flex', marginRight: 10, marginBottom: 0, width: 120 }}
          rules={[{ required: true, message: '请选择最小薪资' }]}
        >
          <Select showSearch placeholder="">
            {expectedSalaryOptions.map(salary => (
              <Option key={salary} value={salary}>{salary + 'k'}</Option>
            ))}
          </Select>
        </Form.Item>
        <span className="text-xl">-</span>
        <Form.Item
          name="maxSalary"
          style={{ display: 'inline-flex', marginLeft: 10, marginBottom: 0, width: 120 }}
          rules={[{ required: true, message: '请选择最大薪资' }]}
        >
          <Select showSearch placeholder="">
            {expectedSalaryOptions.map(salary => (
              <Option key={salary} value={salary}>{salary + 'k'}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="职位描述"
        name="description"
        rules={[{ required: true, message: '请填写职位描述' }]}
      >
        <Input.TextArea placeholder="职位简介、对求职者的要求等信息。内容会以 markdown 格式展示。" />
      </Form.Item>
    </Form>
  );
}

export default JobPostForm;
