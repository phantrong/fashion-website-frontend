import React, { useEffect, useState } from 'react';
import { WrapperProductRelated } from './style';
import SwiperCustomPagination from 'components/SwiperCustom';
import { useUser } from 'services';
import { IRoomListResponse } from 'types';
import ProductDetail from 'components/ProductDetail';

interface IProductRelatedProps {
  roomId: number;
}
const ProductRelated: React.FC<IProductRelatedProps> = ({ roomId }) => {
  const { getRoomsRelated } = useUser();
  const [rooms, setRooms] = useState<IRoomListResponse[]>([]);

  const handleGetRoomsRelated = async () => {
    const result = await getRoomsRelated(roomId, { page: 1, per_page: 10 });
    setRooms(result?.data?.rooms || rooms);
  };

  const renderProductItem = (data: IRoomListResponse[]) => {
    return data.map((room: IRoomListResponse) => (
      <React.Fragment key={room.id}>
        <ProductDetail {...room} />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    handleGetRoomsRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);
  return (
    <WrapperProductRelated>
      {renderProductItem(rooms).length > 0 ? (
        <SwiperCustomPagination
          slidesOffsetAfter={0}
          loop={false}
          spaceBetween={20}
          slidesPerView={3}
          list={renderProductItem(rooms)}
        />
      ) : (
        <></>
      )}
    </WrapperProductRelated>
  );
};

export default ProductRelated;
