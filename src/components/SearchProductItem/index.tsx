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
import { EActionStore, IRoomListResponse } from 'types';
import { calculateDaysToTargetDate, convertNumberToMoney } from 'helper/format';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from 'stores';
import { useSavedRoom } from 'services';

interface ISearchProductItem extends IRoomListResponse {
  onSuccessClickSave?: (status: boolean, item: IRoomListResponse) => void;
}
const SearchProductItem: React.FC<ISearchProductItem> = ({ title, onSuccessClickSave, ...props }) => {
  const { myContextValue, dispatch } = useMyContext();
  const navigate = useNavigate();
  const { deleteRoomInterested, saveRoomInterested } = useSavedRoom();
  const [isFavorite, setIsFavorite] = useState<boolean>(!!props?.is_interested);
  const clickTitle = (id: number) => {
    navigate(`/room/detail/${id}`);
  };

  const renderTextUpdatedAt = (date: string) => {
    const absDateDiff = Math.abs(calculateDaysToTargetDate(date));
    return absDateDiff === 0 ? 'Đăng hôm nay' : `Đăng ${absDateDiff} ngày trước`;
  };

  const renderIconName = (name: string) => {
    const splitString = name?.split(' ');
    return splitString?.[splitString?.length - 1]?.[0];
  };

  const handleAddToSavedRoom = () => {
    const oldValue = myContextValue.isChangeSavedRooms;

    const isSaved = props?.is_interested === 1;

    if (isSaved) {
      deleteRoomInterested(props?.id).then(() => {
        dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
        setIsFavorite(!isFavorite);
        onSuccessClickSave?.(!isFavorite, { ...props, title });
      });
      return;
    }

    saveRoomInterested(props?.id).then(() => {
      dispatch({ type: EActionStore.UPDATE_SAVED_ROOM, payload: !oldValue });
      setIsFavorite(!isFavorite);
      onSuccessClickSave?.(!isFavorite, { ...props, title });
    });
  };

  return (
    <WrapperSearchProductItem>
      <WrapperImages>
        <MainImage
          src="https://file4.batdongsan.com.vn/crop/846x423/2023/05/31/20230531111345-c74d_wm.jpg"
          alt="main"
        />

        <WrapperSubImages>
          <WrapperFirstSubImage>
            <img src="https://file4.batdongsan.com.vn/crop/846x423/2023/05/31/20230531111345-c74d_wm.jpg" alt="main" />
          </WrapperFirstSubImage>

          <WrapperSecondSubImage className="d-flex">
            <SubImage
              borderRadius="none"
              width="50%"
              src="https://file4.batdongsan.com.vn/crop/846x423/2023/05/31/20230531111345-c74d_wm.jpg"
              alt="main"
            />
            <SubImage
              borderRadius="none"
              width="50%"
              src="https://file4.batdongsan.com.vn/crop/846x423/2023/05/31/20230531111345-c74d_wm.jpg"
              alt="main"
            />
          </WrapperSecondSubImage>
        </WrapperSubImages>
      </WrapperImages>

      <WrapperContent>
        <TitleContent onClick={() => clickTitle(props?.id)}>{title.toLocaleUpperCase()}</TitleContent>

        <SpaceStyle padding="5px" />
        <WrapperMoney>
          <TextMoney>
            {props?.is_negotiate === 0 ? convertNumberToMoney(props?.cost) + ' triệu' : 'Giá thương lượng'}
          </TextMoney>
          <TextMoney>{props?.acreage} m²</TextMoney>

          {/* <WrapperIcon>
            <span>2</span>
            <Image height={23} width={20} preview={false} src={images.icons.BedIcon} />
          </WrapperIcon>

          <WrapperIcon>
            <span>2</span>
            <Image height={25} width={17} preview={false} src={images.icons.BathroomIcon} />
          </WrapperIcon> */}

          <AddressText>{props?.district_name + ', ' + props?.province_name}</AddressText>
        </WrapperMoney>
        <SpaceStyle padding="5px" />

        {/* <DescriptionText>

          Chào anh chị, Công ty King Land, văn phòng tại Shophouse06 - Lux6 - Vinhomes Golden River đang quản lý tất cả giỏ hàng ~300 căn hộ, biệt thự, Shophouse... Có nhu cầu bán, cho thuê tại Vinhomes Golden River.* Xin giới thiệu tới anh chị giỏ hàng cho thuê giá tốt nhất thị trường: - Căn 1 phòng ngủ: Full nội thất giá 18 triệu/tháng (diện tích 50m², view LM81). - Căn 2 phòng ngủ: Full nội thất giá 22 triệu/tháng (diện tích 69m², view sông, view Thảo c...

        </DescriptionText> */}
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
        {/* <div className="contact-btn">
          <Image height={22} width={18} preview={false} src={images.icons.PhoneIcon} />

          <span>0327440698</span>
        </div> */}
        <Image
          onClick={handleAddToSavedRoom}
          height={22}
          width={18}
          preview={false}
          src={isFavorite ? images.icons.HeartRed : images.icons.HeartOutline}
        />
      </WrapperFooter>
    </WrapperSearchProductItem>
  );
};

export default SearchProductItem;
