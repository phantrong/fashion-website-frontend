import React from 'react';
import Cookies from 'js-cookie';
import { Menu, Dropdown } from 'antd';

import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'api/authentication';

import avatarImg from 'assets/images/avatar.svg';
import logoHeader from 'assets/images/logo-header.svg';
import useProfile from 'hooks/useProfile';
import { IUserProfile } from 'common/interface';
import Loading from 'components/Loading';

export default function PageHeader() {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('token');
  const { data: profile, isLoading: isLoadingProfile }: { data?: IUserProfile; isLoading: boolean } =
    useProfile(isAuthenticated);

  const authRoutes = [
    {
      key: '1',
      text: 'Nhà trọ sinh viên',
      url: '/room/search',
    },
    {
      key: '2',
      text: 'Chung cư mini',
      url: '/room/search',
    },
  ];

  const anonymousRoutes = [
    {
      key: '3',
      text: 'Đăng nhập',
      url: '/login',
    },
  ];

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      Cookies.remove('token');
      navigate('/login');
    }, 500);
  };

  const menu = (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key="1">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="2">Lịch sử xem trọ</Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.logoHeader}>
          <img src={logoHeader} alt="logo top" />
          <h1 className={styles.appName}>ThuePhongTro TTH</h1>
        </div>
        <div className={styles.menuHeader}>
          <Menu theme="light" mode="horizontal" className={styles.menuContent}>
            {authRoutes.map((route) => (
              <Menu.Item key={route.key}>
                <Link to={route.url}>{route.text}</Link>
              </Menu.Item>
            ))}
            {!profile &&
              !isLoadingProfile &&
              anonymousRoutes.map((route) => (
                <Menu.Item key={route.key}>
                  <Link to={route.url}>{route.text}</Link>
                </Menu.Item>
              ))}
          </Menu>
        </div>
        {profile && !isLoadingProfile && (
          <div className={styles.menuItem}>
            <Dropdown overlay={menu} trigger={['click']}>
              <div className={styles.dropdownToggle}>
                <img className={styles.icon} src={profile.avatar || avatarImg} alt="avatar user" />
                <span className={styles.userName}>
                  {profile.first_name} {profile.last_name}
                </span>
              </div>
            </Dropdown>
          </div>
        )}
        {isLoadingProfile && <Loading />}
      </div>
    </div>
  );
}
