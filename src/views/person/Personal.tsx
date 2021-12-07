import { Link, Outlet, useLocation } from 'react-router-dom';

const asideContent = [
  { title: '个人信息', link: '' },
  { title: '收藏职位', link: 'star' },
  { title: '投递记录', link: 'records' }
];

function Personal() {
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
