import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { Menu, Dropdown, Badge, Image, Divider } from 'antd';

import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'api/authentication';

import avatarImg from 'assets/images/avatar.svg';
import logoHeader from 'assets/images/logo-header.svg';
import useProfile from 'hooks/useProfile';
import { IUserProfile } from 'common/interface';
import Loading from 'components/Loading';
import { WrapperAction } from './style';
import images from 'assets';
import ButtonCustom from 'components/Button';
import SaveRoomHeader from './components/SaveRoom';
import { useMyContext } from 'stores';
import { EActionStore } from 'types';
import { useSavedRoom } from 'services';
import { IInterestedRoomListResponse } from 'types/interested-room';
import { sendGet } from 'api/axios';

export default function PageHeader() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<IInterestedRoomListResponse[]>([]);
  const totalRecord = useRef<number>();
  const { deleteRoomInterested, getListRoomInterest } = useSavedRoom();
  const isAuthenticated = !!Cookies.get('token');
  const { data: profile, isLoading: isLoadingProfile }: { data?: IUserProfile; isLoading: boolean } =
    useProfile(isAuthenticated);
  const { myContextValue, dispatch } = useMyContext();

  const handleGetListRoomInterest = async () => {
    const result = await getListRoomInterest();
    totalRecord.current = result?.data?.total || 0;
    setRooms(result?.data?.items || []);
    dispatch({
      type: EActionStore.UPDATE_SAVED_ROOM_ID,
      payload: (result?.data?.items || []).map((item: IInterestedRoomListResponse) => item.room_id),
    });
  };

  const handleGetRoomTye = async () => {
    const roomTypes = JSON.parse(localStorage.getItem('roomTypes') || '[]');
    if (roomTypes?.length > 0) {
      dispatch({ type: EActionStore.UPDATE_ROOM_TYPE, payload: roomTypes });
      return;
    }

    const result = await sendGet('/api/room-type/list', {});

    dispatch({ type: EActionStore.UPDATE_ROOM_TYPE, payload: result?.data || [] });
  };

  const authRoutes = [
    {
      key: '1',
      text: 'Nhà trọ sinh viên',
      url: '/room/search?room_type_id=1',
    },
    {
      key: '2',
      text: 'Chung cư mini',
      url: '/room/search?room_type_id=2',
    },
  ];

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      Cookies.remove('token');
      navigate('/login');
    }, 500);
  };

  const deleteRoomSaved = (room: IInterestedRoomListResponse) => {
    const restRooms = rooms.filter((item: IInterestedRoomListResponse) => item?.item_id !== room?.item_id);

    deleteRoomInterested(room?.item_id).then(() => {
      dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: restRooms as any });
    });
  };

  const menus = (
    <Menu>
      <SaveRoomHeader rooms={rooms || []} onClickClose={deleteRoomSaved} />
    </Menu>
  );

  const menu = (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key="1">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="2">Lịch sử xem trọ</Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    handleGetListRoomInterest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myContextValue.isChangeSavedRooms]);

  useEffect(() => {
    handleGetRoomTye();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.logoHeader} onClick={() => navigate('/')}>
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
          </Menu>
        </div>

        <WrapperAction>
          <Dropdown trigger={['click']} overlay={menus}>
            <div>
              <ButtonCustom
                hover={{ border: 'none' }}
                style={{ background: 'transparent', border: 'none', padding: '13px 15px' }}
              >
                <Badge count={totalRecord.current}>
                  <Image height={27} width={27} preview={false} src={images.icons.HeartOutline} />
                </Badge>
              </ButtonCustom>
            </div>
          </Dropdown>

          <ButtonCustom
            hover={{ border: 'none' }}
            style={{ background: 'transparent', border: 'none', padding: '13px 15px' }}
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </ButtonCustom>
          <Divider type="vertical" />
          <ButtonCustom
            hover={{ border: 'none' }}
            style={{ background: 'transparent', border: 'none', padding: '13px 15px' }}
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </ButtonCustom>
        </WrapperAction>

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
