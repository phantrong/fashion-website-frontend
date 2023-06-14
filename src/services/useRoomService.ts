import { sendGet } from 'api/axios';
import { IRoomListRequest } from 'types';

const url = '/s2/room';

const useRoomService = () => {
  const getListRoom = (params: IRoomListRequest) => {
    return sendGet(url + '/search', params);
  };

  const getCountRoomByDistrict = () => {
    return sendGet(url + '/count/by-address', { per_page: 5, page: 1 });
  };

  const getDetailRoom = (id: number) => {
    return sendGet(url + '/detail/' + id, {});
  };

  return {
    getListRoom,
    getCountRoomByDistrict,
    getDetailRoom,
  };
};

export { useRoomService };
