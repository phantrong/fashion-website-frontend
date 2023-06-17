import { sendGet } from 'api/axios';
import { IBaseDataRequest } from 'types';

const useUser = () => {
  const getRoomsSuggest = (params: IBaseDataRequest) => {
    return sendGet('/s2/room/list-suggestion', params);
  };

  const getRoomsRelated = (roomId: number, params: IBaseDataRequest) => {
    return sendGet('/s2/room/list-related/' + roomId, params);
  };

  return {
    getRoomsSuggest,
    getRoomsRelated,
  };
};

export { useUser };
