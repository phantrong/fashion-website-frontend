import { Image } from 'antd';
import {
  InfoText,
  TextAddress,
  TimeText,
  TittleStyle,
  WrapperContent,
  WrapperImage,
  WrapperInfo,
  WrapperLocation,
  WrapperProductDetail,
  WrapperTime,
} from './style';
import React, { useState } from 'react';
import images from 'assets';
import { EActionStore, IRoomListResponse } from 'types';
import { calculateDaysToTargetDate, convertNumberToMoney } from 'helper/format';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from 'stores';
import { useSavedRoom } from 'services';
import WrapperLoading from 'components/WrapperLoading';
import ImageError from 'components/ImageError';

interface IProductDetailProps extends IRoomListResponse {
  lint?: boolean;
  isLoading?: boolean;
}

const ProductDetail: React.FC<IProductDetailProps> = ({ title, acreage, isLoading, ...props }) => {
  const { myContextValue, dispatch } = useMyContext();
  const [isFavorite, setIsFavorite] = useState<boolean>(!!props?.is_interested);
  const { deleteRoomInterested, saveRoomInterested } = useSavedRoom();
  const navigate = useNavigate();

  const clickTitle = (id: number) => {
    navigate(`/room/detail/${id}`);
  };

  const handleAddToSavedRoom = () => {
    const oldValue = myContextValue.isChangeSavedRooms;

    const isSaved = props?.is_interested === 1;

    if (isSaved) {
      deleteRoomInterested(props?.id).then(() => {
        dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
        setIsFavorite(!isFavorite);
      });
      return;
    }
    saveRoomInterested(props?.id).then(() => {
      dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
      setIsFavorite(!isFavorite);
    });
  };

  return (
    <WrapperProductDetail className="d-flex flex-column">
      <WrapperImage onClick={() => clickTitle(props?.id)}>
        <ImageError
          isLoading={isLoading}
          preview={false}
          src={props?.medias?.[0]?.link}
          alt={props?.medias?.[0]?.room_id + 'image'}
        />
      </WrapperImage>

      <WrapperLoading isLoading={isLoading || false}>
        <WrapperContent>
          <TittleStyle onClick={() => clickTitle(props?.id)} title={title}>
            {title?.toLocaleUpperCase()}
          </TittleStyle>

          <WrapperInfo className="d-flex">
            <InfoText>
              {props?.is_negotiate === 0 ? `${convertNumberToMoney(props?.cost)} triệu/tháng` : 'Giá thương lượng'}
            </InfoText>

            <InfoText>{acreage} m²</InfoText>
          </WrapperInfo>

          <WrapperLocation>
            <Image height={24} width={14} preview={false} src={images.icons.LocationIcon} />
            <TextAddress title={`${props?.district_name}, ${props?.province_name}`}>
              {props?.district_name}, {props?.province_name}
            </TextAddress>
          </WrapperLocation>

          <WrapperTime>
            <TimeText>Đăng {Math.abs(calculateDaysToTargetDate(props?.updated_at))} ngày trước</TimeText>

            <Image
              onClick={handleAddToSavedRoom}
              height={22}
              width={isFavorite ? 19 : 18}
              preview={false}
              style={{ cursor: 'pointer' }}
              src={isFavorite ? images.icons.HeartRed : images.icons.HeartOutline}
            />
          </WrapperTime>
        </WrapperContent>
      </WrapperLoading>
    </WrapperProductDetail>
  );
};

export default ProductDetail;
