import { Table, Form, Input, Button, message } from 'antd';

// mock user send resume info
import MockUserResume from '@/mock/user/user-send-resume.json';
interface UserResumeInfo {
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEducation: string;
  candidatePhoneNumber: string;
  candidateEmail: string;
  resumeUrl: string;
}

function RecruiterInfo() {
  const [searchForm] = Form.useForm();

  const columns = [
    { title: '职位 ID', dataIndex: 'jobId', key: 'jobId' },
    { title: '职位名称', dataIndex: 'jobTitle', key: 'jobTitle' },
    { title: '投递人姓名', dataIndex: 'candidateName', key: 'candidateName' },
    { title: '投递人学历', dataIndex: 'candidateEducation', key: 'candidateEducation' },
    { title: '投递人电话', dataIndex: 'candidatePhoneNumber', key: 'candidatePhoneNumber' },
    { title: '投递人邮箱', dataIndex: 'candidateEmail', key: 'candidateEmail' },
    {
      title: '简历操作',
      key: 'operation',
      render: (_: any, record: any) => (
        <div className="space-x-2">
          <button
            type="button"
            className="text-blue-400 hover:underline"
            onClick={() => window.open(record.resumeUrl, '_blank')}
          >
            预览
          </button>
          <button
            type="button"
            className="text-blue-400 hover:underline"
            onClick={() => {
              message.info('未开发完毕');
              // TODO: 替换为 File Access API
              // const $a = document.createElement('a');
              // $a.href = record.resumeUrl,
              // $a.download = record.candidateName + '_简历';
              // $a.click();
            }}
          >
            下载
          </button>
        </div>
      )
    }
  ];


  return (
    <div className="p-8">
      <Form
        className="mb-5"
        form={searchForm}
        layout="inline"
        onFinish={values => console.log('search', values)}
      >
        <Form.Item
          name="jobId"
          label="职位 ID"
        >
          <Input className="w-28" />
        </Form.Item>
        <Form.Item
          name="jobTitle"
          label="职位名称"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="candidateName"
          label="候选人名称"
        >
          <Input className="w-28" />
        </Form.Item>
        <Form.Item label="">
          <Button className="mr-2" onClick={() => searchForm.resetFields()}>重置</Button>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        rowKey={record => record.jobId + '-' + record.candidatePhoneNumber}
        dataSource={(MockUserResume as UserResumeInfo[])}
      />
    </div>
  )
}

export default RecruiterInfo;
