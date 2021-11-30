import { Form, FormInstance, Cascader, Select, Radio } from 'antd';
import JobData from '@/assets/job-data/job-type.json';
import JobTag from '@/assets/job-data/job-tag.json';
import cities from '@/assets/city.json';
import { useState } from 'react';

const expectedSalaryOptions = Array.from({ length: 100 }, (_, index) => (index + 1));

interface JobInfoFormProps {
  className?: string;
  form: FormInstance;
  onFinish: (values: any) => void;
  onFinishFailed?: (errInfo: any) => void;
}

function JobInfoForm(props: JobInfoFormProps) {
  const {
    className = '',
    onFinish,
    onFinishFailed,
    form,
  } = props;

  const { Option } = Select;

  const [tagList, setTagList] = useState<string[]>([]);

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
    >
      <Form.Item
        label="期望的职位类型"
        name="jobType"
        rules={[{ required: true, message: '请输入职位类型' }]}
      >
        <Cascader
          options={JobData}
          placeholder="选择职位类型"
          expandTrigger="hover"
          onChange={value => {
            const lastValue = value[value.length - 1];
            const candidateList = (JobTag as Record<string, string[]>)[lastValue];
            if (candidateList && candidateList.length) {
              setTagList(candidateList);
            } else if (tagList.length) {
              setTagList([]);
            }
          }}
        />
      </Form.Item>
      {!!tagList.length && (
        <Form.Item
          label="选择具体标签"
          name="jobTag"
        >
          <Select mode="tags">
            {tagList.map((tag, index) => (
              <Option value={tag} key={index}>{tag}</Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        label="期望城市"
        name="city"
        rules={[{ required: true, message: '请选择期望工作城市' }]}
      >
        <Cascader
          placeholder="选择期望工作城市"
          options={cities.map(province => ({
            value: province.value,
            label: province.value,
            children: province.children.map(city => ({ value: city, label: city }))
          }))}
        />
      </Form.Item>
      <Form.Item label="期望薪资">
        <Form.Item
          name="minSalary"
          style={{ display: 'inline-flex', marginRight: 10, marginBottom: 0, width: 120 }}
          rules={[{ required: true, message: '请选择最小期望薪资' }]}
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
          rules={[{ required: true, message: '请选择最大期望薪资' }]}
        >
          <Select showSearch placeholder="">
            {expectedSalaryOptions.map(salary => (
              <Option key={salary} value={salary}>{salary + 'k'}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label="你的身份"
        name="userType"
        rules={[{ required: true, message: '请选择你的身份' }]}
        initialValue="campus"
      >
        <Radio.Group>
          <Radio.Button value="campus" className="h-10 inline-flex items-center">
            <div className="w-24 text-center">学生</div>
          </Radio.Button>
          <Radio.Button value="social" className="h-10 inline-flex items-center">
            <div className="w-24 text-center">职场人士</div>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}


export default JobInfoForm;
