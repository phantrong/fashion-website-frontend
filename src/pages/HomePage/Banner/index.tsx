import {
  IconSync,
  SelectAddress,
  WrapperAddressSelect,
  WrapperBannerStyle,
  WrapperItem,
  WrapperOverLay,
  WrapperSearch,
  WrapperSelect,
} from './style';
import React, { useRef, useState } from 'react';
import SearchCustom from 'components/Search';
import { Image, Select } from 'antd';
import { useAddressHook, useClientUrlHook } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from 'stores';
import { IRoomTypeResponse } from 'types';
import { AREAS_SELECT, COST_SELECT } from 'constants/filter';
import images from 'assets';
import SelectCustom from 'components/Select';

interface IBannerHomeProps {
  onListenQueries?: (queries: any) => void;
}

const { Option } = Select;

const handleReturnValueAddressSelect = (obj: any) => {
  const objValue = Object.values(obj);

  if (objValue.length === 0) return undefined;

  return objValue?.reduce((objSelect: any, item: any) => {
    if (!!item)
      return {
        ...objSelect,
        label: (objSelect?.label || '') + ',' + item?.label + ', ',
        value: (objSelect?.id || '') + ',' + item?.id + '-',
      };
    return objSelect;
  }, {}) as { label: string; value: any };
};

const BannerHome: React.FC<IBannerHomeProps> = ({ onListenQueries }) => {
  const { convertObjectToQueryParam, getQueriesParams, changeUrlWithoutReload } = useClientUrlHook();
  const navigate = useNavigate();
  const { myContextValue } = useMyContext();
  const { address, setAddressId } = useAddressHook();
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);

  const [currentAddress, setCurrentAddress] = useState<{ provinceId?: string; districtId?: string; wardId?: string }>({
    provinceId: undefined,
    wardId: undefined,
    districtId: undefined,
  });
  const [addressSelectArr, setAddressSelectArr] = useState<{ label: string; value: any }[]>([]);
  const addressSelectArrRef = useRef([]);
  const [keyWord, setKeyWord] = useState<string>((getQueriesParams()?.key_word as string) || '');

  const handleSearch = (value: string) => {
    const queries = convertObjectToQueryParam({ key_word: value });

    if (window.location.pathname.includes('room/search')) {
      const currentQueries = getQueriesParams();
      const newQueries = { ...currentQueries, key_word: value };
      changeUrlWithoutReload(`${window.location.pathname}?${convertObjectToQueryParam(newQueries)}`);

      onListenQueries?.(newQueries);
      return;
    }

    navigate(`/room/search?${queries}`);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    setKeyWord(value);
  };

  // ui
  const selectBefore = (
    <Select defaultValue={0}>
      <Option value={0}>Tất cả</Option>
      {myContextValue.roomTypes.map((item: IRoomTypeResponse) => (
        <Option title={item?.name} value={item?.id}>
          {item?.name}
        </Option>
      ))}
    </Select>
  );

  // const renderFooterSelect = () => {
  //   return (
  //     <WrapperFooterSelect>
  //       <WrapperSync>
  //         <Image width={20} height={25} preview={false} src={images.icons.SyncIcon} />

  //         <span>Đặt lại</span>
  //       </WrapperSync>

  //       <ButtonCustom hover={{ background: '#FF837A', color: 'white' }} style={{ background: '#E03C31', color: 'white' }}>Áp dụng</ButtonCustom>
  //     </WrapperFooterSelect>
  //   )
  // }

  const renderContentAddress = () => {
    const handleChangeSelect = (id: string, key: 'provinceId' | 'districtId' | 'wardId', option: any) => {
      const formatNumber = (_id: string) => {
        return _id?.split('-')?.[0] ? Number(_id?.split('-')?.[0]) : 0;
      };
      const handleCreateObj = (value: any, key: 'provinceId' | 'districtId' | 'wardId', _option?: any) => {
        let newObj = {};
        let addressObj = {};
        if (key === 'provinceId') {
          newObj = {
            [key]: value,
            districtId: undefined,
            wardId: undefined,
          };
          if (!!_option)
            addressObj = {
              [key]: { ..._option, id: formatNumber(_option?.value) },
              districtId: undefined,
              wardId: undefined,
            };
        } else if (key === 'districtId') {
          newObj = {
            [key]: value,
            wardId: undefined,
          };
          if (!!_option)
            addressObj = {
              [key]: { ..._option, id: formatNumber(_option?.value) },
              wardId: undefined,
            };
        } else {
          newObj = { [key]: value };
          if (!!_option)
            addressObj = {
              [key]: { ..._option, id: formatNumber(_option?.value) },
            };
        }

        if (!!_option) return [newObj, addressObj];
        return newObj;
      };

      const result = handleCreateObj(id, key, option) as any;

      addressSelectArrRef.current = { ...addressSelectArrRef.current, ...result?.[1] };

      const _result = handleReturnValueAddressSelect(addressSelectArrRef.current || {});

      setAddressSelectArr(_result ? [_result] : []);

      setCurrentAddress((prev) => ({ ...prev, ...result[0] }));

      setAddressId((prev) => ({ ...prev, ...handleCreateObj(formatNumber(id), key) }));
    };
    return (
      <WrapperAddressSelect>
        <h3>Khu vực</h3>
        <Select
          onChange={(id: string, option: any) => handleChangeSelect(id, 'provinceId', option)}
          value={currentAddress.provinceId as any}
          options={formatDataSelect(address?.provinces, 'p')}
          allowClear
          placeholder="Tỉnh"
        ></Select>
        <Select
          onChange={(id: string, option: any) => handleChangeSelect(id, 'districtId', option)}
          value={currentAddress.districtId}
          options={formatDataSelect(address?.districts, 'd')}
          allowClear
          placeholder="Quận/huyện"
        ></Select>
        <Select
          onChange={(id: string, option: any) => handleChangeSelect(id, 'wardId', option)}
          value={currentAddress.wardId}
          options={formatDataSelect(address?.wards, 'w')}
          allowClear
          placeholder="Phường/xã"
        ></Select>
      </WrapperAddressSelect>
    );
  };

  const tagRender = (props: any) => {
    return <>{props?.label ? props?.label + ', ' : ''}</>;
  };

  const formatDataSelect = (data: any, type: 'p' | 'd' | 'w') => {
    return data?.map((item: any) => ({ ...item, label: item?.name, value: [item?.id, type].join('-') }));
  };

  // useEffect(() => {
  //   const isFullEmpty = [currentAddress.wardId, currentAddress.districtId, currentAddress.provinceId].filter((item) => !item);
  //   setAddressSelectValue(isFullEmpty.length === 3 ? [] : [currentAddress.wardId, currentAddress.districtId, currentAddress.provinceId])
  // }, [currentAddress])

  return (
    <WrapperBannerStyle className="d-flex">
      <WrapperSearch className="d-flex flex-column">
        <WrapperOverLay>
          <SearchCustom
            height={'50px'}
            addonBefore={selectBefore}
            onChange={handleChangeSearch}
            value={keyWord}
            onSearch={handleSearch}
            placeholder="Từ khóa, Đường, Quận, Dự án hoặc địa danh ..."
            enterButton
          />
          <WrapperSelect>
            <WrapperItem maxWidth="calc((100% - 40px) / 3)">
              <SelectAddress
                className="address-select"
                open={isOpenAddress}
                allowClear
                showSearch={false}
                onFocus={() => setIsOpenAddress(!isOpenAddress)}
                onClear={() => {
                  setAddressSelectArr([]);
                  setCurrentAddress({ provinceId: undefined, districtId: undefined, wardId: undefined });
                }}
                value={addressSelectArr?.[0]?.value}
                options={addressSelectArr}
                tagRender={tagRender}
                mode="multiple"
                placeholder="Trên toàn quốc"
                dropdownRender={(menu) => {
                  return <>{renderContentAddress()}</>;
                }}
              ></SelectAddress>
            </WrapperItem>
            <WrapperItem>
              <SelectCustom options={COST_SELECT} allowClear placeholder="Mức giá"></SelectCustom>
            </WrapperItem>

            <WrapperItem>
              <SelectCustom allowClear options={AREAS_SELECT} placeholder="Diện tích"></SelectCustom>
            </WrapperItem>

            <IconSync>
              <Image width={20} height={25} preview={false} src={images.icons.SyncWhiteIcon} />
            </IconSync>
          </WrapperSelect>
        </WrapperOverLay>
      </WrapperSearch>
    </WrapperBannerStyle>
  );
};

export default BannerHome;
