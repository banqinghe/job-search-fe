import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from 'antd';
import LoginModal from '@/views/person/components/LoginModal';
import ChangePasswordModal from '@/views/person/components/ChangePasswordModal';
import { UserInfoState, GlobalState } from '@/store/state';
import { Role } from '@/enums';

interface HeaderProps{
  className?: string;
  style?: React.CSSProperties;
}

function Header(props: HeaderProps) {
  const { className = '', style } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [changPasswordModalVisible, setChangePasswordModalVisible] = useState(false);

  function handleClickLogin() {
    setLoginModalVisible(true);
  }

  function handleLoginFinish() {
    setLoginModalVisible(false);
  }

  function handleChangePassword() {
    setChangePasswordModalVisible(true);
  }

  function handleLogout() {
    dispatch({type: 'user/logout'});
    navigate('/');
    // setLoginModalVisible(false);
  }

  return (
    <header
      style={style}
      className={"flex justify-between items-center h-12 px-8 " + className}
    >
      <div className="flex items-center">
        <div className="text-lg font-bold">
          <Link to="/">JOB SEARCH</Link>
        </div>
        <div className="ml-10">
          <ul className="flex space-x-4">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/jobs">职位</Link></li>
            <li><Link to="/companies">公司</Link></li>
          </ul>
        </div>
      </div>
      <div>
        {/* 
          判断是否登录
          1. 登录，显示个人中心按钮
          2. 未登录，显示登录按钮
        */}
        {userInfo.role !== Role.NOT_LOGGED ? (
          <>
            <Popover
              content={(
                <div className="flex flex-col">
                  <button type="button" className="mb-2">
                    <Link className="text-black" to="/personal">个人中心</Link>
                  </button>
                  <button
                    type="button"
                    className="hover:text-blue-400 mb-2"
                    onClick={handleChangePassword}
                  >
                    修改密码
                  </button>
                  <button
                    type="button"
                    className="hover:text-blue-400"
                    onClick={handleLogout}
                  >
                    退出登录
                  </button>
                </div>
              )}
              // visible={userPopoverVisible}
              trigger={['hover', 'focus']}
              placement="bottom"
            >
              <div tabIndex={0} className="cursor-pointer">
                用户 {userInfo.username}
              </div>
            </Popover>
            <ChangePasswordModal
              visible={changPasswordModalVisible}
              onCancel={() => setChangePasswordModalVisible(false)}
            />
          </>
        ) : (
          <>
            <div className="cursor-pointer" onClick={handleClickLogin}>登录</div>
            <LoginModal 
              visible={loginModalVisible}
              onFinish={handleLoginFinish}
              onCancel={() => setLoginModalVisible(false)}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
