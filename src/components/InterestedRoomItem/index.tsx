import { Avatar, Image } from 'antd';
import {
  AddressText,
  MainImage,
  SubImage,
  TextMoney,
  TitleContent,
  WrapperContent,
  WrapperFirstSubImage,
  WrapperFooter,
  WrapperImages,
  WrapperMoney,
  WrapperSearchProductItem,
  WrapperSecondSubImage,
  WrapperSubImages,
  WrapperUser,
  WrapperUserInfo,
} from './style';
import React, { useState } from 'react';
import images from 'assets';
import { SpaceStyle } from 'styles/styled';
import { EActionStore, IInterestedRoomListResponse } from 'types';
import { calculateDaysToTargetDate, convertNumberToMoney } from 'helper/format';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from 'stores';
import { useSavedRoom } from 'services';
import ImageError from 'components/ImageError';
import WrapperLoading from 'components/WrapperLoading';

interface IInterestedRoomItem extends IInterestedRoomListResponse {
  onSuccessClickSave?: (status: boolean, item: IInterestedRoomListResponse) => void;
  isLoading?: boolean;
}
const InterestedRoomItem: React.FC<IInterestedRoomItem> = ({ title, onSuccessClickSave, isLoading, ...props }) => {
  const { myContextValue, dispatch } = useMyContext();
  const navigate = useNavigate();
  const { deleteRoomInterested, saveRoomInterested } = useSavedRoom();
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const clickTitle = (id: number) => {
    navigate(`/room/detail/${id}`);
  };

  const renderTextUpdatedAt = (date?: string) => {
    if (!date) return;
    const absDateDiff = Math.abs(calculateDaysToTargetDate(date));
    return absDateDiff === 0 ? 'Đăng hôm nay' : `Đăng ${absDateDiff} ngày trước`;
  };

  const renderIconName = (name?: string) => {
    if (!name) return;
    const splitString = name?.split(' ');
    return splitString?.[splitString?.length - 1]?.[0];
  };

  const handleAddToSavedRoom = () => {
    const oldValue = myContextValue.isChangeSavedRooms;

    const isSaved = 1;

    if (isSaved) {
      deleteRoomInterested(props?.room_id).then(() => {
        dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
        setIsFavorite(!isFavorite);
        onSuccessClickSave?.(!isFavorite, { ...props, title });
      });
      return;
    }

    saveRoomInterested(props?.room_id).then(() => {
      dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
      setIsFavorite(!isFavorite);
      onSuccessClickSave?.(!isFavorite, { ...props, title });
    });
  };

  return (
    <WrapperSearchProductItem>
      <WrapperImages onClick={() => clickTitle(props?.room_id)}>
        <MainImage>
          <ImageError isLoading={isLoading} preview={false} src={props?.room?.medias?.[0]?.link} alt="main" />
        </MainImage>
        <WrapperSubImages>
          <WrapperFirstSubImage>
            <ImageError isLoading={isLoading} preview={false} src={props?.room?.medias?.[1]?.link} alt="main" />
          </WrapperFirstSubImage>

          <WrapperSecondSubImage className="d-flex">
            <SubImage borderRadius="none">
              <ImageError
                isLoading={isLoading}
                preview={false}
                src={props?.room?.medias?.[2]?.link || props?.room?.medias?.[0]?.link}
                alt="main"
              />
            </SubImage>
            <SubImage borderRadius="none">
              <ImageError
                isLoading={isLoading}
                preview={false}
                src={props?.room?.medias?.[3]?.link || props?.room?.medias?.[1]?.link}
                alt="main"
              />
            </SubImage>
          </WrapperSecondSubImage>
        </WrapperSubImages>
      </WrapperImages>

      <WrapperLoading isLoading={isLoading || false}>
        <WrapperContent>
          <TitleContent onClick={() => clickTitle(props?.room_id)}>{title?.toLocaleUpperCase()}</TitleContent>

          <SpaceStyle padding="5px" />
          <WrapperMoney>
            <TextMoney>
              {props?.is_negotiate === 0 ? convertNumberToMoney(props?.cost) + ' triệu' : 'Giá thương lượng'}
            </TextMoney>
            <TextMoney>{props?.acreage} m²</TextMoney>
            <AddressText>{props?.district_name + ', ' + props?.province_name}</AddressText>
          </WrapperMoney>
          <SpaceStyle padding="5px" />
        </WrapperContent>

        <WrapperFooter>
          <WrapperUser>
            <Avatar style={{ backgroundColor: '#FFECEB', verticalAlign: 'middle' }} size="large" gap={4}>
              {renderIconName(props?.admin_name)}
            </Avatar>

            <WrapperUserInfo>
              <p>{props?.admin_name}</p>
              <span>{renderTextUpdatedAt(props?.updated_at)}</span>
            </WrapperUserInfo>
          </WrapperUser>
          <Image
            onClick={handleAddToSavedRoom}
            height={22}
            width={18}
            preview={false}
            style={{ cursor: 'pointer' }}
            src={isFavorite ? images.icons.HeartRed : images.icons.HeartOutline}
          />
        </WrapperFooter>
      </WrapperLoading>
    </WrapperSearchProductItem>
  );
};

export default InterestedRoomItem;
