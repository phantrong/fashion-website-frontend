import { ERoomStatusSort, IRoomMediaResponse } from './room';

export interface IInterestedRoomRequest {
  per_page?: number;
  page: number;
  order_by_created_at?: ERoomStatusSort;
  order_by_room_created_at?: ERoomStatusSort;
  order_by_cost?: ERoomStatusSort;
  order_by_acreage?: ERoomStatusSort;
}

export interface IInterestedRoomListResponse {
  item_id: number;
  room_id: number;
  room_title: string;
  created_at: number;
  room: {
    first_image: IRoomMediaResponse[];
  };
}
