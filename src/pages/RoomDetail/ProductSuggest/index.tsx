import React, { useEffect, useState } from 'react';
import { WrapperProductSuggest } from './style';
import SwiperCustomPagination from 'components/SwiperCustom';
import { useUser } from 'services';
import { IRoomListResponse } from 'types';
import ProductDetail from 'components/ProductDetail';

interface IProductSuggestProps {
  demo?: boolean;
}
const ProductSuggest: React.FC<IProductSuggestProps> = () => {
  const { getRoomsSuggest } = useUser();
  const [rooms, setRooms] = useState<IRoomListResponse[]>([]);

  const handleGetRoomsSuggest = async () => {
    const result = await getRoomsSuggest({ page: 1, per_page: 10 });
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
    handleGetRoomsSuggest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WrapperProductSuggest>
      <SwiperCustomPagination
        slidesOffsetAfter={0}
        loop={false}
        spaceBetween={20}
        slidesPerView={3}
        list={renderProductItem(rooms)}
      />
    </WrapperProductSuggest>
  );
};

export default ProductSuggest;
