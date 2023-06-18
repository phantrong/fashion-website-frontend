import React, { useEffect, useState, useRef } from 'react';
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
import { useMyContext } from 'stores';
import WrapperLoading from 'components/WrapperLoading';

interface IRoomByDistrict {
  district_name: string;
  count_room: number;
  district_id: number;
}
const MainContentHome = () => {
  const [rooms, setRooms] = useState<IRoomListResponse[]>([]);
  const lastPageRef = useRef<number>(0);
  const [roomsByDistrict, setRoomsByDistrict] = useState<IRoomByDistrict[]>([]);
  const { getListRoom, getCountRoomByDistrict } = useRoomService();
  const { myContextValue } = useMyContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<{ isLoadingR: boolean; isLoadingP: boolean }>({
    isLoadingP: false,
    isLoadingR: true,
  });

  const handleGetListRoom = async () => {
    setLoading((prev) => ({ ...prev, isLoadingR: true }));
    const result = await getListRoom({ page: 1, per_page: 8 }).finally(() => {
      setLoading((prev) => ({ ...prev, isLoadingR: false }));
    });
    lastPageRef.current = result?.data?.last_page;
    setRooms(result?.data?.rooms || []);
  };

  const handleGetCountRoom = async () => {
    setLoading((prev) => ({ ...prev, isLoadingP: true }));
    const result = await getCountRoomByDistrict().finally(() => {
      setLoading((prev) => ({ ...prev, isLoadingP: false }));
    });

    setRoomsByDistrict(result?.data?.rooms || []);
  };

  const renderSkeletonRoom = () => {
    return new Array(8).fill(0).map((item: any, index: number) => {
      return (
        <WrapperDetailItem key={index}>
          <ProductDetail isLoading={true} {...item} />
        </WrapperDetailItem>
      );
    });
  };

  const renderSkeletonPlace = () => {
    return new Array(4).fill(0).map((item: any, index: number) => {
      return (
        <SubIntroduceItem key={index}>
          <WrapperLoading isLoading={loading.isLoadingP}></WrapperLoading>
        </SubIntroduceItem>
      );
    });
  };

  useEffect(() => {
    handleGetListRoom();
    handleGetCountRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRooms((prev) =>
      prev.map((item: IRoomListResponse) => {
        if (myContextValue.savedRoomsId.includes(item.id)) return { ...item, is_interested: 1 };
        return item;
      })
    );
  }, [myContextValue.savedRoomsId]);

  return (
    <WrapperMainContentHome>
      <SpaceStyle padding="10px" />
      <TitleStyle>Nhà trọ dành cho bạn</TitleStyle>

      <WrapperDetail>
        {loading.isLoadingR
          ? renderSkeletonRoom()
          : rooms.map((item: IRoomListResponse) => (
              <WrapperDetailItem key={item?.id}>
                <ProductDetail {...item} />
              </WrapperDetailItem>
            ))}
        {lastPageRef.current > 1 && (
          <WrapperSeeMore>
            <ButtonCustom hover={{ background: '#FAFAFA' }} onClick={() => navigate(`/room/search?page=1&per_page=8`)}>
              Xem tiếp
            </ButtonCustom>
          </WrapperSeeMore>
        )}
      </WrapperDetail>

      <SpaceStyle padding="10px" />
      <TitleStyle>Nhà trọ theo khu vực</TitleStyle>
      {/* {roomsByDistrict.length > 0 && ( */}
      <WrapperIntroduce>
        <FirstIntroduce>
          <WrapperLoading isLoading={loading.isLoadingP}>
            <IntroduceProduct
              location={roomsByDistrict?.[0]?.district_name}
              text={`${roomsByDistrict?.[0]?.count_room} phòng mới`}
              url="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-1.jpg"
              onClick={() => navigate(`/room/search?district_id=${roomsByDistrict?.[0]?.district_id}`)}
            />
          </WrapperLoading>
        </FirstIntroduce>

        <SecondIntroduce>
          {loading.isLoadingP
            ? renderSkeletonPlace()
            : roomsByDistrict.slice(1)?.map((item: IRoomByDistrict) => (
                <SubIntroduceItem key={item.district_id}>
                  <WrapperLoading isLoading={loading.isLoadingP}>
                    <IntroduceProduct
                      location={item?.district_name}
                      text={`${item?.count_room} phòng mới`}
                      url="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-1.jpg"
                      onClick={() => navigate(`/room/search?district_id=${item.district_id}`)}
                    />
                  </WrapperLoading>
                </SubIntroduceItem>
              ))}
        </SecondIntroduce>
      </WrapperIntroduce>
      {/* )} */}
    </WrapperMainContentHome>
  );
};

export default MainContentHome;
