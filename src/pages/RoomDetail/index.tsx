import React, { useState, useEffect } from 'react';
import {
  AddressText,
  ButtonEmail,
  ButtonPhone,
  CreateBy,
  DescriptionTitle,
  HouseWareItem,
  NameStyle,
  TitleCity,
  TitleHouseWare,
  TitleStyle,
  WrapperBody,
  WrapperCity,
  WrapperDescription,
  WrapperDetailSwiper,
  WrapperHouseWare,
  WrapperHouseWareInfo,
  WrapperInfo,
  WrapperInfoUser,
  WrapperRoomDetail,
  WrapperRoomInfo,
  WrapperRoomInfoItem,
  WrapperSideBar,
} from './style';
import { Avatar, Image } from 'antd';
import images from 'assets';
import SwiperCustom from 'components/Swiper';
import { IRoomDetailResponse, IRoomHouseWare } from 'types';
import { useRoomService } from 'services';
import { useParams } from 'react-router-dom';
import { convertNumberToMoney } from 'helper/format';
const RoomDetail = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const param = useParams();

  const [room, setRoom] = useState<IRoomDetailResponse>();

  const { getDetailRoom } = useRoomService();

  const handleGetDetailRoom = async () => {
    const result = await getDetailRoom((param as any)?.id);
    setRoom(result?.data || {});
  };

  const renderIconName = (name: string) => {
    const splitString = name?.split(' ');
    return splitString?.[splitString?.length - 1]?.[0];
  };

  useEffect(() => {
    handleGetDetailRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperRoomDetail>
      <WrapperBody>
        <WrapperDetailSwiper>
          <SwiperCustom medias={room?.medias || []} />
        </WrapperDetailSwiper>
        <TitleStyle>{room?.title}</TitleStyle>

        <AddressText>{room?.address_detail}</AddressText>

        <WrapperInfo>
          <WrapperRoomInfo>
            <WrapperRoomInfoItem>
              <span>Mức giá</span>
              <span>{room?.is_negotiate === 1 ? 'Thỏa thuận' : convertNumberToMoney(room?.cost || 0) + ' triệu'}</span>
            </WrapperRoomInfoItem>

            <WrapperRoomInfoItem>
              <span>Diện tích</span>
              <span>{room?.acreage} m²</span>
            </WrapperRoomInfoItem>

            {/* <WrapperRoomInfoItem>
              <span>Phòng ngủ</span>
              <span>3 PN</span>
            </WrapperRoomInfoItem> */}
          </WrapperRoomInfo>

          <Image
            onClick={() => setIsFavorite(!isFavorite)}
            height={22}
            width={18}
            preview={false}
            src={isFavorite ? images.icons.HeartRed : images.icons.HeartOutline}
          />
        </WrapperInfo>

        <WrapperDescription>
          <DescriptionTitle>Thông tin mô tả</DescriptionTitle>
          <p>34m² - 2 tầng - hẻm 5m.</p>

          <p>Lê Quang Định - P5 - Bình Thạnh.</p>

          <p>Nhà 3 phòng ngủ, 3 toilet, hẻm dân trí, an.</p>
          <p> Ninh, cách mặt tiền chỉ 25m, pháp lý chuẩn.</p>
          <p> Không lộ giới, hoàn công đầy đủ.</p>
        </WrapperDescription>

        <WrapperHouseWareInfo>
          <TitleHouseWare>Các đồ dùng có sẵn</TitleHouseWare>
          <WrapperHouseWare>
            {room?.housewares?.map((item: IRoomHouseWare) => (
              <HouseWareItem key={item?.id}>{item?.name}</HouseWareItem>
            ))}
          </WrapperHouseWare>
        </WrapperHouseWareInfo>
      </WrapperBody>

      <WrapperSideBar>
        <WrapperInfoUser>
          <Avatar style={{ backgroundColor: '#FFECEB', verticalAlign: 'middle' }} size="large" gap={4}>
            {renderIconName(room?.admin_name || '')}
          </Avatar>
          <CreateBy>Được đăng bởi</CreateBy>
          <NameStyle>{room?.admin_name}</NameStyle>

          <ButtonPhone>0327440698. Hiện số</ButtonPhone>

          <ButtonEmail>Gửi email</ButtonEmail>

          <ButtonEmail>Yêu cầu liên hệ lại</ButtonEmail>
        </WrapperInfoUser>

        <WrapperCity>
          <TitleCity></TitleCity>
        </WrapperCity>
      </WrapperSideBar>
    </WrapperRoomDetail>
  );
};

export default RoomDetail;
