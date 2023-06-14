import { sendGet, sendPost } from 'api/axios';
import { IInterestedRoomRequest } from 'types/interested-room';

const url = '/s2/interested-room';
const useSavedRoom = () => {
  const getListDetailInterestedRoom = (params: IInterestedRoomRequest) => {
    return sendGet(url + '/list-detail', params);
  };

  const getListRoomInterest = () => {
    return sendGet(url + '/list', {});
  };

  const saveRoomInterested = (roomId: number) => {
    return sendPost(url + '/add', { room_id: roomId }, {});
  };

  const deleteRoomInterested = (roomId: number) => {
    return sendPost(url + '/remove', { item_id: roomId });
  };

  return {
    getListDetailInterestedRoom,
    saveRoomInterested,
    deleteRoomInterested,
    getListRoomInterest,
  };
};

export { useSavedRoom };
