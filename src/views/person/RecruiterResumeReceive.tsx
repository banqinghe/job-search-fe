import { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { GlobalState, UserInfoState } from '@/store/state';
import service from '@/service';
import { SearchResumeReceivePayload } from '@/service/index.d';
import { handlePdfLink } from '@/utils';

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
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  const [resumeList, setResumeList] = useState<UserResumeInfo[]>([]);

  const [searchForm] = Form.useForm();

  useEffect(() => {
    service.getAllResumeReceive({
      username: userInfo.username,
      pageNumber: 1,
      pageSize: 10,
    })
    .then(res => {
      console.log('get resume', res.data);
      setResumeList(res.data);
    })
  }, []);

  const columns = [
    {
      title: '职位 ID',
      dataIndex: 'jobId',
      key: 'jobId',
      render: (item: string) => (
        <Tooltip title={item}>
          <div className="w-20 truncate">
            {item}
          </div>
        </Tooltip>
      )
    },
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
            onClick={() => {
              service
                .changeResumeStatus({ recordId: record.recordId });
              window.open(record.resumeUrl, '_blank');
            }}
          >
            预览
          </button>
          <button
            type="button"
            className="text-blue-400 hover:underline"
            onClick={() => {
              service
                .changeResumeStatus({ recordId: record.recordId });
              handlePdfLink('http://124.223.21.196:8001/f0f7854d-a672-4a2b-a7c6-06131a0c1e97.pdf', 'test-d.pdf');
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
        onFinish={(values: { jobTitle: string; candidateName: string }) => {
          const formValue: {[key: string]: string} = {};
          for (const [key, value] of Object.entries(values)) {
            if (value) {
              formValue[key] = value;
            }
          }

          let searchPayload: SearchResumeReceivePayload  = {
            pageSize: 10,
            pageNumber: 1,
            username: userInfo.username
          };
          searchPayload = {...searchPayload, ...formValue};
          service.searchResumeReceive(searchPayload)
            .then(res => {
              setResumeList(res.data);
            });
        }}
      >
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
        rowKey={record => (record.jobId + '-' + record.candidatePhoneNumber)}
        dataSource={resumeList}
      />
    </div>
  )
}

export default RecruiterInfo;
