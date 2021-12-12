import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { GlobalState, UserInfoState } from '@/store/state';
import { Role } from '@/enums';

const asideContent = [
  { title: '个人信息', link: '' },
  { title: '收藏职位', link: 'star' },
  { title: '投递记录', link: 'records' }
];

function Personal() {
  const navigate = useNavigate();
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  useEffect(() => {
    if (userInfo.role === Role.NOT_LOGGED) {
      message.warning('非法访问, 请先登录账号');
      navigate('/');
    }
  }, [userInfo]);

  const pathname = useLocation().pathname;

  return (
    <div className="flex space-x-3 w-full py-4 px-24 bg-gray-100">
      {/* 侧边栏 */}
      <aside className="w-52 py-4 px-3 bg-white rounded-md">
        <ul className="text-center text-base">
          {asideContent.map(item => (
            <li
              key={item.link} 
              className={'rounded-md cursor-pointer ' +
              (((item.link === '' && pathname.endsWith('personal')) || pathname.endsWith('/' + item.link)) ?
                'bg-blue-50 text-blue-500 font-bold' :
                'hover:bg-blue-50 hover:text-blue-500')
            }>
              <Link className="block py-2" to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* 主页 */}
      <div className="flex-1 bg-white rounded-md">
        <Outlet />
      </div>
    </div>
  );
}

export default Personal;
