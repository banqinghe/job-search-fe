import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

function Header() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  function handleLogin() {
    setLoginModalVisible(true);
  }

  return (
    <>
      <header className="flex justify-between items-center h-12 px-8">
        <div className="flex items-center">
          <div className="text-lg font-bold">
            <Link to="/">JOB SEARCH</Link>
          </div>
          <div className="ml-10">
            <ul className="flex space-x-4">
              <li><Link to="/">首页</Link></li>
              <li><Link to="/job">职位</Link></li>
              <li><Link to="/company">公司</Link></li>
            </ul>
          </div>
        </div>
        <div>
          {/* 
            判断是否登录
            1. 登录，显示个人中心按钮
            2. 未登录，显示登录按钮
          */}
          <div className="cursor-pointer" onClick={handleLogin}>登录</div>
          <LoginModal visible={loginModalVisible} onCancel={() => setLoginModalVisible(false)} />
        </div>
      </header>
    </>
  );
}

export default Header;
