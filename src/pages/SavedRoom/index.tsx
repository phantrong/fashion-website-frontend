import React, { useEffect, useState } from 'react';
import BannerHome from 'pages/HomePage/Banner';
import { TitleStyle, WrapperBody, WrapperMainContent, WrapperSavedRoom, WrapperSearch } from './styled';
import { ERoomStatusSort, IInterestedRoomListResponse } from 'types';
import { SpaceStyle } from 'styles/styled';
import { useSavedRoom } from 'services';
import { IInterestedRoomRequest } from 'types/interested-room';
import { Select } from 'antd';
import InterestedRoomItem from 'components/InterestedRoomItem';

const search = [
  {
    label: 'Thông thường',
    value: 0,
    valueApi: { order_by_cost: undefined, order_by_created_at: undefined, order_by_acreage: undefined },
  },
  { label: 'Lưu mới nhất', value: 1, valueApi: { order_by_created_at: ERoomStatusSort.DESC } },
  { label: 'Lưu cũ nhất', value: 2, valueApi: { order_by_created_at: ERoomStatusSort.ASC } },
  { label: 'Đăng gần đây nhất', value: 3, valueApi: { order_by_room_created_at: ERoomStatusSort.DESC } },
  { label: 'Đăng trước đây', value: 4, valueApi: { order_by_room_created_at: ERoomStatusSort.ASC } },
  { label: 'Giá thấp đến cao', value: 5, valueApi: { order_by_cost: ERoomStatusSort.ASC } },
  {
    label: 'Giá cao đến thấp',
    value: 6,
    valueApi: { order_by_cost: ERoomStatusSort.DESC },
  },
  { label: 'Diện tích bé đến lớn', value: 7, valueApi: { order_by_acreage: ERoomStatusSort.ASC } },
  { label: 'Diện tích  lớn đến bé ', value: 8, valueApi: { order_by_acreage: ERoomStatusSort.DESC } },
];

const SavedRoom = () => {
  const [params, setParams] = useState<IInterestedRoomRequest>({
    page: 1,
    per_page: 10,
    order_by_created_at: ERoomStatusSort.DESC,
  });
  const [rooms, setRooms] = useState<IInterestedRoomListResponse[]>([]);

  const { getListDetailInterestedRoom } = useSavedRoom();

  const handleGetRooms = async (params: IInterestedRoomRequest) => {
    const result = await getListDetailInterestedRoom(params);
    setRooms(result?.data?.items || []);
  };

  const updateParams = (value: any) => {
    setParams((prev) => ({ ...prev, ...value }));
  };

  const renderSearch = () => {
    return (
      <WrapperSearch>
        <Select
          onChange={(_value: any, options: any) => {
            updateParams?.(options?.valueApi);
          }}
          defaultValue={1}
          options={search}
        />
      </WrapperSearch>
    );
  };

  const handleRemoveRoom = (_status: boolean, room: IInterestedRoomListResponse) => {
    setRooms((prev) => prev.filter((item: IInterestedRoomListResponse) => item?.room_id !== room?.room_id));
  };

  useEffect(() => {
    handleGetRooms(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <WrapperSavedRoom>
      <BannerHome />

      <WrapperMainContent>
        <WrapperBody>
          <TitleStyle>Nhà trọ đang quan tâm</TitleStyle>
          {renderSearch()}
          {(rooms || [])?.map((item: IInterestedRoomListResponse) => (
            <React.Fragment key={item?.room_id}>
              <InterestedRoomItem {...item} onSuccessClickSave={handleRemoveRoom} />
              <SpaceStyle padding="10px" />
            </React.Fragment>
          ))}
        </WrapperBody>
      </WrapperMainContent>
    </WrapperSavedRoom>
  );
};

export default SavedRoom;
