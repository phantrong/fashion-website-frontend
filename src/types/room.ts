export enum ERoomType {
  PHONG_TRO = 1,
  CCMN = 2,
}

export enum ERoomStatusSort {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IRoomListRequest {
  per_page?: number;
  page: number;
  admin_id?: string;
  room_type_id?: ERoomType;
  province_id?: string;
  district_id?: string;
  ward_id?: string;
  is_negotiate?: string;
  start_cost?: string;
  end_cost?: string;
  start_acreage?: string;
  end_acreage?: string;
  key_word?: string;
  order_by_created_at?: string;
  order_by_cost?: string;
  order_by_acreage?: ERoomStatusSort;
}

export interface IRoomHouseWare {
  id: number;
  name: string;
  pivot: {
    room_id: number;
    houseware_id: number;
    id: number;
  };
}

export interface IRoomDetailResponse extends IRoomListResponse {
  housewares: IRoomHouseWare[];
}

export interface IRoomMediaResponse {
  id: number;
  room_id: number;
  type: number;
  link: string;
}

export interface IRoomTypeResponse {
  id: number;
  name: string;
}

export interface IRoomListResponse {
  id: number;
  title: string;
  province_id: number;
  province_name: string;
  district_id: number;
  district_name: string;
  ward_id: number;
  ward_name: string;
  address_detail: string;
  room_type_id: number;
  is_negotiate: number;
  cost: number;
  acreage: number;
  status: number;
  created_at: string;
  updated_at: string;
  admin_id: number;
  admin_name: string;
  room_type: {
    id: number;
    name: string;
  };
  medias: IRoomMediaResponse[];
  is_interested: 0 | 1;
}
