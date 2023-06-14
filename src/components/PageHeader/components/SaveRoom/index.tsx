import { Image } from 'antd';
import {
  WrapperContent,
  WrapperFooter,
  WrapperInfo,
  WrapperRoomSaveItem,
  WrapperSaveRoom,
  WrapperTitle,
} from './style';
import React from 'react';
import images from 'assets';
import { useNavigate } from 'react-router-dom';
import { IInterestedRoomListResponse } from 'types/interested-room';

interface ISaveRoomHeaderProps {
  rooms: IInterestedRoomListResponse[];
  onClickClose?: (room: IInterestedRoomListResponse) => void;
}
const SaveRoomHeader: React.FC<ISaveRoomHeaderProps> = ({ rooms, onClickClose }) => {
  const navigate = useNavigate();

  return (
    <WrapperSaveRoom>
      <WrapperTitle>Tin đăng đã lưu</WrapperTitle>

      <WrapperContent>
        {rooms.length > 0 ? (
          rooms.map((item: IInterestedRoomListResponse) => (
            <WrapperRoomSaveItem key={item?.item_id} onClick={() => navigate(`/room/detail/${item?.item_id}`)}>
              <Image width={64} height={48} preview={false} src={item?.room?.first_image?.[0]?.link} />

              <WrapperInfo>
                <p>{item?.room_title}</p>
                <span>Lưu hôm qua</span>
              </WrapperInfo>
              <Image
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.stopPropagation();
                  onClickClose?.(item);
                }}
                width={20}
                height={20}
                preview={false}
                src={images.icons.CloseIcon}
              />
            </WrapperRoomSaveItem>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '5px' }}>Không có dữ liệu</div>
        )}
      </WrapperContent>

      <WrapperFooter onClick={() => navigate('/room/saved')}>Xem tất cả</WrapperFooter>
    </WrapperSaveRoom>
  );
};

export default SaveRoomHeader;
