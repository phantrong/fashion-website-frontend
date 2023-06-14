import React, { useEffect, useState } from 'react';
import {
  FirstIntroduce,
  SecondIntroduce,
  SubIntroduceItem,
  TitleStyle,
  WrapperDetail,
  WrapperDetailItem,
  WrapperIntroduce,
  WrapperMainContentHome,
  WrapperSeeMore,
} from './style';
import ProductDetail from 'components/ProductDetail';
import IntroduceProduct from 'components/IntroduceProduct';
import { SpaceStyle } from 'styles/styled';
import { useRoomService } from 'services';
import { IRoomListResponse } from 'types';
import ButtonCustom from 'components/Button';
import { useNavigate } from 'react-router-dom';

interface IRoomByDistrict {
  district_name: string;
  count_room: number;
}
const MainContentHome = () => {
  const [rooms, setRooms] = useState<IRoomListResponse[]>([]);
  const [roomsByDistrict, setRoomsByDistrict] = useState<IRoomByDistrict[]>([]);
  const { getListRoom, getCountRoomByDistrict } = useRoomService();
  // const { myContextValue } = useMyContext();
  const navigate = useNavigate();

  const handleGetListRoom = async () => {
    const result = await getListRoom({ page: 1, per_page: 8 });
    setRooms(result?.data?.rooms || []);
  };

  const handleGetCountRoom = async () => {
    const result = await getCountRoomByDistrict();

    setRoomsByDistrict(result?.data?.rooms || []);
  };

  useEffect(() => {
    handleGetListRoom();
    handleGetCountRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperMainContentHome>
      <SpaceStyle padding="10px" />
      <TitleStyle>Nhà trọ dành cho bạn</TitleStyle>
      <WrapperDetail>
        {rooms.map((item: IRoomListResponse) => (
          <WrapperDetailItem key={item?.id}>
            <ProductDetail {...item} />
          </WrapperDetailItem>
        ))}
        <WrapperSeeMore>
          <ButtonCustom onClick={() => navigate(`/room/search?page=1&per_page=16`)}>Xem tiếp</ButtonCustom>
        </WrapperSeeMore>
      </WrapperDetail>

      <SpaceStyle padding="10px" />
      <TitleStyle>Nhà trọ theo khu vực</TitleStyle>
      {roomsByDistrict.length > 0 && (
        <WrapperIntroduce>
          <FirstIntroduce>
            <IntroduceProduct
              location={roomsByDistrict?.[0]?.district_name}
              text={`${roomsByDistrict?.[0]?.count_room} phòng mới`}
              url="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-1.jpg"
            />
          </FirstIntroduce>

          <SecondIntroduce>
            {roomsByDistrict.slice(1)?.map((item: IRoomByDistrict) => (
              <SubIntroduceItem>
                <IntroduceProduct
                  location={item?.district_name}
                  text={`${item?.count_room} phòng mới`}
                  url="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-1.jpg"
                />
              </SubIntroduceItem>
            ))}
          </SecondIntroduce>
        </WrapperIntroduce>
      )}
    </WrapperMainContentHome>
  );
};

export default MainContentHome;
