import React, { useState, useEffect } from 'react';
import { WrapperSearchRoom } from './style';
import BannerHome from 'pages/HomePage/Banner';
import MainContentSearchRoom from './MainContent';
import { ERoomStatusSort, IRoomListRequest, IRoomListResponse } from 'types';
import { useRoomService } from 'services';
import { useClientUrlHook } from 'hooks';

const SearchRoom = () => {
  const { getQueriesParams, convertObjectToQueryParam, changeUrlWithoutReload } = useClientUrlHook();
  const [params, setParams] = useState<IRoomListRequest>({
    page: 1,
    order_by_created_at: ERoomStatusSort.DESC,
    ...getQueriesParams(),
  });

  const [rooms, setRooms] = useState<IRoomListResponse[]>([]);

  const { getListRoom } = useRoomService();

  const handleGetListRoom = (params: IRoomListRequest) => {
    return getListRoom(params);
  };

  const setFirstData = async () => {
    const result = await handleGetListRoom(params);
    setRooms(result?.data?.rooms || []);
  };

  const updateParams = (value: any) => {
    setParams((prev) => ({ ...prev, ...value }));
  };

  const handleChangeQueries = (params: IRoomListRequest) => {
    const newQueries = convertObjectToQueryParam(params);
    changeUrlWithoutReload(`${window.location.pathname}?${newQueries}`);
    return;
  };

  useEffect(() => {
    setFirstData();

    handleChangeQueries(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <WrapperSearchRoom>
      <BannerHome onListenQueries={updateParams} />
      <MainContentSearchRoom rooms={rooms} onListenQueries={updateParams} />
    </WrapperSearchRoom>
  );
};

export default SearchRoom;
