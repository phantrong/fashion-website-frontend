import React, { useState, useEffect } from 'react';
import {
  AddressText,
  CreateBy,
  DescriptionTitle,
  EmailText,
  HouseWareItem,
  NameStyle,
  ProductSuggestDetail,
  TitleHouseWare,
  TitleStyle,
  ViewFrame,
  WrapperBody,
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
import { EActionStore, IRoomDetailResponse, IRoomHouseWare } from 'types';
import { useRoomService, useSavedRoom } from 'services';
import { useParams } from 'react-router-dom';
import { convertNumberToMoney } from 'helper/format';
import SwiperCustom from 'components/Swiper';
import ProductSuggest from './ProductSuggest';
import ProductRelated from './ProductRelated';
import { SpaceStyle } from 'styles/styled';
import { useMyContext } from 'stores';
import WrapperLoading from 'components/WrapperLoading';
import ImageError from 'components/ImageError';
import Paragraph from 'antd/lib/typography/Paragraph';
const RoomDetail = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const param = useParams();
  const { myContextValue, dispatch } = useMyContext();
  const [room, setRoom] = useState<IRoomDetailResponse>();
  const { deleteRoomInterested, saveRoomInterested } = useSavedRoom();
  const { getDetailRoom } = useRoomService();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetDetailRoom = async () => {
    setIsLoading(true);
    const result = await getDetailRoom((param as any)?.id).finally(() => {
      setIsLoading(false);
    });

    setIsFavorite(result?.data?.is_interested === 1);
    setRoom(result?.data || {});
  };

  const handleAddToSavedRoom = () => {
    const oldValue = myContextValue.isChangeSavedRooms;

    const isSaved = room?.is_interested === 1;

    if (isSaved) {
      deleteRoomInterested(room?.id).then(() => {
        dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
        setIsFavorite(!isFavorite);
      });
      return;
    }
    saveRoomInterested(room?.id || 0).then(() => {
      dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
      setIsFavorite(!isFavorite);
    });
  };

  const renderIconName = (name: string) => {
    const splitString = name?.split(' ');
    return splitString?.[splitString?.length - 1]?.[0];
  };

  useEffect(() => {
    handleGetDetailRoom();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(param as any)?.id]);

  return (
    <WrapperRoomDetail>
      <WrapperBody>
        <WrapperDetailSwiper>
          <SwiperCustom isLoading={isLoading} medias={room?.medias || []} />
        </WrapperDetailSwiper>
        <SpaceStyle padding="10px 0" />

        <WrapperLoading isLoading={isLoading}>
          <TitleStyle>{room?.title}</TitleStyle>

          <AddressText>{room?.address_detail}</AddressText>

          <WrapperInfo>
            <WrapperRoomInfo>
              <WrapperRoomInfoItem>
                <span>Mức giá</span>
                <span>
                  {room?.is_negotiate === 1 ? 'Thỏa thuận' : convertNumberToMoney(room?.cost || 0) + ' triệu'}
                </span>
              </WrapperRoomInfoItem>

              <WrapperRoomInfoItem>
                <span>Diện tích</span>
                <span>{room?.acreage} m²</span>
              </WrapperRoomInfoItem>

              <WrapperRoomInfoItem>
                <span>Lượt xem</span>
                <ViewFrame>
                  <ImageError width={20} height={20} preview={false} src={images.icons.EyesImage} />
                  <span>{room?.total_view_times}</span>
                </ViewFrame>
              </WrapperRoomInfoItem>

              {/* <WrapperRoomInfoItem>
      <span>Phòng ngủ</span>
      <span>3 PN</span>
    </WrapperRoomInfoItem> */}
            </WrapperRoomInfo>

            <Image
              onClick={handleAddToSavedRoom}
              height={22}
              width={19}
              preview={false}
              src={isFavorite ? images.icons.HeartRed : images.icons.HeartOutline}
            />
          </WrapperInfo>
        </WrapperLoading>

        <WrapperLoading isLoading={isLoading}>
          <WrapperDescription>
            <DescriptionTitle>Thông tin mô tả</DescriptionTitle>
            <p>{room?.more_description}</p>
          </WrapperDescription>
        </WrapperLoading>

        <WrapperHouseWareInfo>
          <TitleHouseWare>Các đồ dùng có sẵn</TitleHouseWare>
          <WrapperHouseWare>
            <WrapperLoading isLoading={isLoading}>
              {room?.housewares?.map((item: IRoomHouseWare) => (
                <HouseWareItem key={item?.id}>{item?.name}</HouseWareItem>
              ))}
            </WrapperLoading>
          </WrapperHouseWare>
        </WrapperHouseWareInfo>

        <ProductSuggestDetail>
          <TitleHouseWare>Nhà trọ gợi ý cho bạn</TitleHouseWare>
          <WrapperLoading isLoading={isLoading}>
            <ProductSuggest />
          </WrapperLoading>
        </ProductSuggestDetail>

        <ProductSuggestDetail>
          <TitleHouseWare>Nhà trọ liên quan</TitleHouseWare>
          <WrapperLoading isLoading={isLoading}>{room && <ProductRelated roomId={room.id} />}</WrapperLoading>
        </ProductSuggestDetail>
      </WrapperBody>

      <WrapperSideBar>
        <WrapperInfoUser>
          <Avatar style={{ backgroundColor: '#FFECEB', verticalAlign: 'middle' }} size="large" gap={4}>
            {renderIconName(room?.admin_name || '')}
          </Avatar>
          <CreateBy>Được đăng bởi</CreateBy>
          <NameStyle>{room?.admin_name}</NameStyle>

          {/* <ButtonPhone>{room?.admin_phone}</ButtonPhone> */}
          <SpaceStyle padding="5px 0" />
          <Paragraph copyable>{room?.admin_phone}</Paragraph>
          {/* <SpaceStyle padding='5px 0' /> */}
          <EmailText copyable>
            <div className="email-text">{room?.admin_email}</div>
          </EmailText>
          {/* <ButtonEmail>{room?.admin_email}</ButtonEmail> */}

          {/* <ButtonEmail>Yêu cầu liên hệ lại</ButtonEmail> */}
        </WrapperInfoUser>

        {/* <WrapperCity>
          <TitleCity></TitleCity>
        </WrapperCity> */}
      </WrapperSideBar>
    </WrapperRoomDetail>
  );
};

export default RoomDetail;
