import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Tooltip, Upload, message, Table, Button, Form, Modal, Popconfirm } from 'antd';
import { MailOutlined, PhoneOutlined, EditOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { GlobalState, UserInfoState } from '@/store/state';
import { JobPositionDetail } from '@/models';
import { getLocationArray, formatDate } from '@/utils';
import JobPostForm, { JobPostFormValues } from './components/JobPostForm';
import service from '@/service';
import defaultAvatarUrl from '@/assets/default-avatar.png';

function RecruiterInfo() {
  const dispatch = useDispatch();
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  const [jobModalVisible, setJobModalVisible] = useState(false);
  const [jobPositionList, setJobPositionList] = useState<JobPositionDetail[]>([]);
  const currentFormStatus = useRef<'create' | 'update'>('create');
  const currentJobRecord = useRef<JobPositionDetail>();

  const [jobForm] = Form.useForm();

  useEffect(() => {
    service.getAllPostJobs({ username: userInfo.username })
      .then(res => setJobPositionList(res.data));
  }, []);

  function refreshTable(promise: Promise<any>, successCallback?: () => void, errorMsg?: string) {
    promise
      .then(() => {
        return service.getAllPostJobs({ username: userInfo.username });
      })
      .then(res => {
        setJobPositionList(res.data);
        successCallback && successCallback();
      })
      .catch(() => {
        errorMsg && message.error(errorMsg);
      });
  }

  // TODO: 提交新的信息
  function handleSubmitJobForm(values: JobPostFormValues) {
    console.log('form values:', values);
    if (currentFormStatus.current === 'create') {
      refreshTable(
        service.postJob({
          username: userInfo.username,
          jobPositionDetail: {
            title: values.title,
            location: values.location.map(item => item[item.length - 1]),
            experienceRequirement: values.experienceRequirement,
            educationRequirement: values.educationRequirement,
            salaryRange: [values.minSalary, values.maxSalary],
            company: userInfo.company as string,
            department: userInfo.department as string,
            description: values.description,
            id: '',
            postTime: '',
            logoUrl: '',
          }
        }),
        () => {
          message.success('发布成功');
          setJobModalVisible(false);
        }
      );
    } else {
      refreshTable(
        service.changeJob({
          title: values.title,
          location: values.location.map(item => item[item.length - 1]),
          experienceRequirement: values.experienceRequirement,
          educationRequirement: values.educationRequirement,
          salaryRange: [values.minSalary, values.maxSalary],
          company: userInfo.company as string,
          department: userInfo.department as string,
          description: values.description,
          id: currentJobRecord.current?.id ?? 'invalid id',
          postTime: currentJobRecord.current?.postTime ?? new Date().toString(),
          logoUrl: currentJobRecord.current?.logoUrl ?? 'null',
          poster: userInfo.username,
        }),
        () => {
          message.success('更改成功');
          setJobModalVisible(false);
        },
        '修改失败'
      );
    }
  }

  function handleDeleteJob(jobId: string) {
    refreshTable(service.deleteJob({ jobId }));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (item: string) => (
        <Tooltip title={item}>
          <div className="w-20 truncate">
            {item}
          </div>
        </Tooltip>
      )
    },
    { title: '职位名称', dataIndex: 'title', key: 'title' },
    {
      title: '工作地点',
      dataIndex: 'location',
      key: 'location',
      render: (item: any) => (Array.isArray(item) ? item.join(', ') : item),
    },
    {
      title: '发布时间',
      dataIndex: 'postTime',
      key: 'postTime',
      render: ((item: string) => formatDate(new Date(item))),
    },
    { title: '经验要求', dataIndex: 'experienceRequirement', key: 'experienceRequirement' },
    { title: '学历要求', dataIndex: 'educationRequirement', key: 'educationRequirement' },
    {
      title: '薪资范围 (k)',
      dataIndex: 'salaryRange',
      key: 'salaryRange',
      render: (item: any) => (item.join(' - ')),
    },
    {
      title: '操作',
      key: 'operation',
      render: (_: any, record: JobPositionDetail) => (
        <div className="space-x-2">
          <button
            type="button"
            className="text-blue-400 hover:underline"
            onClick={() => {
              currentFormStatus.current = 'update';
              currentJobRecord.current = record;
              jobForm.setFieldsValue({
                title: record.title,
                location: Array.isArray(record.location) ?
                  record.location.map(city => getLocationArray(city)) :
                  [getLocationArray(record.location)],
                experienceRequirement: record?.experienceRequirement,
                educationRequirement: record?.educationRequirement,
                minSalary: record.salaryRange[0],
                maxSalary: record.salaryRange[1],
                description: record.description
              });
              // jobForm.resetFields();
              setJobModalVisible(true);
            }}
          >
            修改
          </button>
          <Popconfirm
            title="确认删除该职位信息吗？"
            onConfirm={() => handleDeleteJob(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <button
              type="button"
              className="text-blue-400 hover:underline"
            >
              删除
            </button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="px-8 py-8 space-y-6">
      {/* Card 1: 个人信息 */}
      <div className="flex space-x-10 mb-10">
        <Upload
          maxCount={1}
          className="avatar-upload"
          customRequest={({ file, onSuccess, onError }) => {
            service.uploadFile({
              file: file as File,
            })
              .then(res => {
                message.success('上传成功', res.data);
                onSuccess && onSuccess({ result: res.data })
                return service.userUpdateInfo({
                  ...userInfo,
                  avatarUrl: res.data,
                } as any);
              })
              .then(res => {
                dispatch({
                  type: 'user/updateInfo', payload: {
                    ...userInfo,
                    avatarUrl: res.data.avatarUrl,
                  }
                });
              })
              .catch(e => {
                onError && onError(e);
              });
          }}
        >
          <Avatar size={116} src={userInfo.avatarUrl ?? userInfo.avaterUrl ?? defaultAvatarUrl} />
        </Upload>
        {/* <Avatar size={116} src="https://up.enterdesk.com/edpic/6f/0b/c1/6f0bc15cfd268f459ac9c6340ca248de.jpg" /> */}
        <div className="flex-1">
          {/* 真实姓名 */}
          <div className="flex items-end mb-5">
            <span className="mr-2 text-2xl font-bold">{userInfo.name}</span>
          </div>

          {/* 具体个人信息 */}
          <div>
            <div className="mb-2">
              <div className="mb-2">{userInfo.company} {userInfo.department}</div>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">{<MailOutlined className="mr-1.5" />}{userInfo.email}</div>
                <div className="flex items-center">{<PhoneOutlined className="mr-1.5" />}(+86) {userInfo.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>

        <Tooltip title="编辑个人信息">
          {/* TODO: 调用个人信息表单，发送请求成功后更新 */}
          <EditOutlined className="cursor-pointer text-lg hover:text-blue-500" />
        </Tooltip>
      </div>

      {/* Card 2: 发布职位 */}
      <div>
        <div className="flex justify-between pb-4 mb-8 border-b">
          <h2 className="text-xl font-bold">我发布的职位</h2>
          <Button
            className="self-end" type="primary" size="middle"
            onClick={() => {
              currentFormStatus.current = 'create';
              jobForm.resetFields();
              setJobModalVisible(true);
            }}
          >
            新增
          </Button>
        </div>
        <Table
          // className="text-xs"
          style={{ fontSize: 12 }}
          columns={columns}
          rowKey="id"
          dataSource={jobPositionList}
          pagination={false}
          expandable={{
            expandedRowRender: record => <ReactMarkdown className="markdown-body">{record.description}</ReactMarkdown>,
          }}
        />
      </div>

      {/* 职位发布和修改 Modal */}
      <Modal
        visible={jobModalVisible}
        title={<h2 className="font-bold">职位新增与变更</h2>}
        onCancel={() => setJobModalVisible(false)}
        footer={null}
        maskClosable={false}
      >
        <JobPostForm
          className="px-8"
          form={jobForm}
          onFinish={handleSubmitJobForm}
        // initialValues={currentRowValues}
        />
        <div className="flex justify-end pr-8 mt-1">
          <Button
            className="w-24"
            type="primary"
            onClick={() => jobForm.submit()}
          >
            提交
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default RecruiterInfo;
