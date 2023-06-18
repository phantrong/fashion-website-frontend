import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<IRoomListResponse[]>([]);
  const paginationRef = useRef<{ currentPage: number; total: number; pageSize: number }>({
    currentPage: 1,
    pageSize: 8,
    total: 8,
  });
  const { getListRoom } = useRoomService();

  const handleGetListRoom = (params: IRoomListRequest) => {
    return getListRoom(params);
  };

  const setFirstData = async () => {
    setIsLoading(true);
    const result = await handleGetListRoom(params).finally(() => {
      setIsLoading(false);
    });
    paginationRef.current = {
      total: result?.data?.total,
      pageSize: result?.data?.per_page,
      currentPage: result?.data?.page,
    };
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
      <MainContentSearchRoom
        pagination={paginationRef.current}
        isLoading={isLoading}
        rooms={rooms}
        onListenQueries={updateParams}
      />
    </WrapperSearchRoom>
  );
};

export default SearchRoom;
