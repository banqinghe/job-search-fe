import { useSelector } from 'react-redux';
import { Tag, Avatar, Tooltip } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  CloudUploadOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import pdfUrl from '@/assets/pdf-test.pdf';
import { GlobalState, UserInfoState } from '@/store/state';

// TODO: 推荐职位，iframe 调整一下样式
const recommendation = [
  {  },
]

function PersonalInfo() {
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  return (
    <div className="px-8 py-6 space-y-6">
      {/* Card 1: 个人信息 */}
      <div className="flex space-x-10 mb-12">
        <Avatar size={116} src="https://pic3.zhimg.com/v2-aebd38442f665e76b53b740f2294e9b6_r.jpg" />
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
            <div className="flex items-center mb-2">
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
          <EditOutlined className="cursor-pointer text-lg hover:text-blue-500" />
        </Tooltip>
      </div>

      {/* Card 2: 个人简历 */}
      <div>
        <h2 className="text-xl font-bold pb-4 mb-8 border-b">我的简历</h2>
        <div className="flex space-x-12">
          <ul>
            <li
              className="flex items-center px-2 py-1 cursor-pointer hover:font-bold"
              onClick={() => console.log('click')}
            >
              <CloudUploadOutlined className="text-lg mr-2" />
              <span>更新简历</span>
            </li>
            <li
              className="flex items-center px-2 py-1 cursor-pointer hover:font-bold"
              onClick={() => window.open(pdfUrl, '_blank')}
            >
              <DesktopOutlined className="text-lg mr-2" />
              <span>新窗口打开</span>
            </li>
          </ul>
          <iframe className="w-9/12 flex-1" style={{ height: '60vh' }} src={pdfUrl}></iframe>
        </div>
        {/* <div className="flex justify-center">
          <iframe className="w-10/12" style={{ height: '60vh' }} src={pdfUrl}></iframe>
        </div> */}
      </div>

      {/* Card 3: 推荐职位 */}
      <div>
        <h2 className="text-xl font-bold pb-4 mb-8 border-b">推荐职位</h2>
      </div>
    </div>
  );
}

export default PersonalInfo;
