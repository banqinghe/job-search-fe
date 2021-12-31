import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Avatar, Tooltip, Upload, message } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  CloudUploadOutlined,
  DesktopOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { GlobalState, UserInfoState } from '@/store/state';
import JobPositionCard from '@/components/JobPositionCard';
import UploadResumeModal from './components/UploadResumeModal';
import UpdateInfoModal from './components/UpdateInfoModal';
import { JobPosition } from '@/models';
import service from '@/service';
import defaultAvatarUrl from '@/assets/default-avatar.png';

function PersonalInfo() {
  const dispatch = useDispatch();
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  const [uploadResumeVisible, setUploadResumeVisible] = useState(false);
  const [updateInfoVisible, setUpdateInfoVisible] = useState(false);
  const [recommendJobList, setRecommendJobList] = useState<JobPosition[]>([]);

  useEffect(() => {
    service
      .userRecommendJobs({ username: userInfo.username, count: 6 })
      .then(res => {
        setRecommendJobList(res.data);
      });
  }, []);

  return (
    <div className="px-8 py-6 space-y-6">
      {/* Card 1: 个人信息 */}
      <div className="flex space-x-10 mb-12">
        <Upload
          maxCount={1}
          className="avatar-upload"
          customRequest={({ file, onSuccess, onError }) => {
            console.log('file:', file);
            service.uploadFile({
              file: file as File,
            })
              .then(res => {
                message.success('上传成功', res.data);
                onSuccess && onSuccess({ result: res.data })
                console.log('file url', res.data);
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
        <div className="flex-1">
          {/* 真实姓名 */}
          <div className="flex items-end mb-5">
            <span className="mr-2 text-2xl font-bold">{userInfo.name}</span>
            <div className="relative bottom-1 left-1">
              {userInfo.userType === 'campus' ?
                <Tag color="#87d068" className="px-1">应届生</Tag> :
                <Tag color="2db7f5" className="px-1">职场人士</Tag>
              }
            </div>
          </div>

          {/* 具体个人信息 */}
          <div>
            <div className="flex flex-wrap items-center mb-2">
              <div className="mr-8">{userInfo.university} {userInfo.education}</div>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">{<MailOutlined className="mr-1.5" />}{userInfo.email}</div>
                <div className="flex items-center">{<PhoneOutlined className="mr-1.5" />}(+86) {userInfo.phoneNumber}</div>
              </div>
            </div>
            <div>{userInfo.jobType} {userInfo.city}</div>
          </div>
        </div>

        <Tooltip title="编辑个人信息">
          {/* TODO: 调用个人信息表单，发送请求成功后更新 */}
          <EditOutlined
            className="cursor-pointer text-lg hover:text-blue-500"
            onClick={() => {
              setUpdateInfoVisible(true);
            }}
          />
        </Tooltip>
      </div>

      {/* Card 2: 个人简历 */}
      <div>
        <h2 className="text-xl font-bold pb-4 mb-8 border-b">我的简历</h2>
        {userInfo.resumeUrl ? (
          <div className="flex space-x-12">
            <ul>
              <li
                className="flex items-center px-2 py-1 cursor-pointer hover:font-bold"
                onClick={() => setUploadResumeVisible(true)}
              >
                <CloudUploadOutlined className="text-lg mr-2" />
                <span>更新简历</span>
              </li>
              <li
                className="flex items-center px-2 py-1 cursor-pointer hover:font-bold"
                onClick={() => window.open(userInfo.resumeUrl, '_blank')}
              >
                <DesktopOutlined className="text-lg mr-2" />
                <span>新窗口打开</span>
              </li>
            </ul>
            <iframe
              className="w-9/12 flex-1 rounded-md border-2 border-gray-200"
              style={{ height: '60vh' }}
              src={userInfo.resumeUrl}
            />
          </div>
        ) : (
          <Upload.Dragger
            maxCount={1}
            customRequest={({ file, onSuccess, onError }) => {
              console.log('file:', file);
              service.uploadFile({
                file: file as File,
              })
                .then(res => {
                  message.success('上传成功');
                  onSuccess && onSuccess({ result: res.data })
                  console.log('file url', res.data);
                  return service.userUpdateInfo({
                    ...userInfo,
                    resumeUrl: res.data,
                  } as any);
                })
                .then(res => {
                  dispatch({
                    type: 'user/updateInfo', payload: {
                      ...userInfo,
                      resumeUrl: res.data.resumeUrl,
                    }
                  });
                })
                .catch(e => {
                  onError && onError(e);
                });
            }}
          >
            <div className="text-gray-400 hover:text-blue-400">
              <p><InboxOutlined style={{ fontSize: '50px' }} /></p>
              <p>你尚未上传简历，点击或将文件拖拽至此处上传</p>
            </div>
          </Upload.Dragger>
        )}
      </div>

      {/* Card 3: 推荐职位 */}
      <div>
        <h2 className="text-xl font-bold pb-4 mb-4 border-b">推荐职位</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {recommendJobList.map(jobInfo => (
            <JobPositionCard key={jobInfo.id} jobInfo={jobInfo} onClick={() => window.open('/job/' + jobInfo.id)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <UploadResumeModal
        visible={uploadResumeVisible}
        onCancel={() => setUploadResumeVisible(false)}
      />
      <UpdateInfoModal
        role={userInfo.role}
        visible={updateInfoVisible}
        onCancel={() => setUpdateInfoVisible(false)}
      />
    </div>
  );
}

export default PersonalInfo;
