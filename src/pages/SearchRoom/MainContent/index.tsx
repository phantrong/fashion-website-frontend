import { Image, Pagination, Select, Switch } from 'antd';
import {
  TextCountResult,
  WrapperBody,
  WrapperMainContentSearchRoom,
  WrapperSearch,
  WrapperSeeMore,
  WrapperSideBar,
} from './style';
import React from 'react';
import { SpaceStyle } from 'styles/styled';
import SearchProductItem from 'components/SearchProductItem';
import {
  TextValueFilter,
  TitleFilter,
  WrapperBell,
  WrapperEmail,
  WrapperFilter,
} from 'components/SearchProductItem/style';
import images from 'assets';
import { ERoomStatusSort, IRoomListResponse } from 'types';
import { AREAS, COSTS, IFilterData } from 'constants/filter';

const search = [
  {
    label: 'Thông thường',
    value: 0,
    valueApi: { order_by_cost: undefined, order_by_created_at: undefined, order_by_acreage: undefined },
  },
  { label: 'Đăng gần đây nhất', value: 1, valueApi: { order_by_created_at: ERoomStatusSort.DESC } },
  { label: 'Đăng trước đây', value: 2, valueApi: { order_by_created_at: ERoomStatusSort.ASC } },
  { label: 'Giá thấp đến cao', value: 3, valueApi: { order_by_cost: ERoomStatusSort.ASC } },
  {
    label: 'Giá cao đến thấp',
    value: 4,
    valueApi: { order_by_cost: ERoomStatusSort.DESC },
  },
  { label: 'Diện tích bé đến lớn', value: 5, valueApi: { order_by_acreage: ERoomStatusSort.ASC } },
  { label: 'Diện tích  lớn đến bé ', value: 6, valueApi: { order_by_acreage: ERoomStatusSort.DESC } },
];

interface IMainContentSearchPageProps {
  rooms: IRoomListResponse[];
  onListenQueries?: (value: any) => void;
  pagination: { currentPage: number; total: number; pageSize: number };
  isLoading?: boolean;
}

const MainContentSearchRoom: React.FC<IMainContentSearchPageProps> = ({
  rooms,
  onListenQueries,
  isLoading,
  pagination,
}) => {
  const renderSearch = () => {
    return (
      <WrapperSearch>
        <TextCountResult>Hiện có {pagination.total} nhà trọ.</TextCountResult>

        <Select
          onChange={(_value: any, options: any) => {
            onListenQueries?.(options?.valueApi);
          }}
          defaultValue={1}
          options={search}
        />
      </WrapperSearch>
    );
  };

  const renderEmail = () => {
    return (
      <WrapperEmail>
        <WrapperBell>
          <Image height={23} width={22} preview={false} src={images.icons.BellIcon} />
        </WrapperBell>
        <span>Email cho tôi khi có tin đăng mới tương tự</span>
        <Switch size="small" />
      </WrapperEmail>
    );
  };

  const renderFilterCost = (title: string, list: IFilterData[]) => {
    return (
      <WrapperFilter>
        <TitleFilter>{title}</TitleFilter>
        {list.map((item: IFilterData) => (
          <TextValueFilter key={item?.label} onClick={() => onListenQueries?.(item?.value)}>
            {item?.label}
          </TextValueFilter>
        ))}
      </WrapperFilter>
    );
  };

  const renderSkeleton = () => {
    return new Array(10).fill(0).map((item: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <SearchProductItem isLoading={true} {...(item || {})} />
          <SpaceStyle padding="10px" />
        </React.Fragment>
      );
    });
  };

  return (
    <WrapperMainContentSearchRoom>
      <WrapperBody>
        {renderSearch()}
        <SpaceStyle padding="5px" />

        {isLoading
          ? renderSkeleton()
          : (rooms || [])?.map((item: IRoomListResponse) => (
              <React.Fragment key={item?.id}>
                <SearchProductItem {...item} />
                <SpaceStyle padding="10px" />
              </React.Fragment>
            ))}

        <WrapperSeeMore>
          <Pagination
            onChange={(page: number) => {
              onListenQueries?.({ page });
              window.scrollTo(0, 300);
            }}
            current={pagination.currentPage}
            pageSize={pagination.pageSize}
            total={pagination.total}
          />
        </WrapperSeeMore>
      </WrapperBody>

      <WrapperSideBar>
        {renderEmail()}
        <SpaceStyle padding="5px" />
        {renderFilterCost('Lọc theo khoảng giá', COSTS)}

        <SpaceStyle padding="10px" />
        {renderFilterCost('Lọc theo diện tích', AREAS)}
      </WrapperSideBar>
    </WrapperMainContentSearchRoom>
  );
};

export default MainContentSearchRoom;
