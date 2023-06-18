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
import React, { useRef, useState, useEffect } from 'react';
import SearchCustom from 'components/Search';
import { Image, Select } from 'antd';
import { useAddressHook, useClientUrlHook } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from 'stores';
import { IRoomTypeResponse } from 'types';
import { AREAS_SELECT, COST_SELECT, IFilterData } from 'constants/filter';
import images from 'assets';
import SelectCustom from 'components/Select';
import ButtonCustom from 'components/Button';

interface IBannerHomeProps {
  onListenQueries?: (queries: any) => void;
}

const { Option } = Select;

const handleReturnValueAddressSelect = (obj: any) => {
  const objValue = Object.values(obj);

  if (objValue.length === 0) return undefined;

  const newObjSelect = objValue?.reduce((objSelect: any, item: any) => {
    if (!!item)
      return {
        ...objSelect,
        label: (objSelect?.label || '') + ',' + item?.label + ', ',
        value: objSelect?.value ? (objSelect?.value || '') + '-' + item?.id : item?.id,
      };
    return objSelect;
  }, {}) as { label: string; value: any };

  if (!!newObjSelect?.label) {
    const formatLabelArr = newObjSelect?.label.split(',');
    const newLabel = formatLabelArr
      .reduce((newArr: string[], value: string) => {
        if (value === ' ' || value === '') return newArr;
        return [...newArr, value];
      }, [])
      .reverse()
      .join(', ');

    return { ...newObjSelect, label: newLabel };
  }
  return newObjSelect;
};

const BannerHome: React.FC<IBannerHomeProps> = ({ onListenQueries }) => {
  const { convertObjectToQueryParam, getQueriesParams, changeUrlWithoutReload } = useClientUrlHook();
  const navigate = useNavigate();
  const { myContextValue } = useMyContext();
  const { address, setAddressId, setAddress } = useAddressHook();
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<{
    cost?: IFilterData & { valueApi: any };
    area?: IFilterData & { valueApi: any };
    roomType?: { value: number };
  }>({ cost: undefined, area: undefined, roomType: { value: 0 } });
  const [currentAddress, setCurrentAddress] = useState<{ provinceId?: string; districtId?: string; wardId?: string }>({
    provinceId: undefined,
    wardId: undefined,
    districtId: undefined,
  });
  const [addressSelectArr, setAddressSelectArr] = useState<{ label: string; value: any }[]>([]);
  const addressSelectArrRef = useRef([]);
  const [keyWord, setKeyWord] = useState<string>((getQueriesParams()?.key_word as string) || '');

  const handleSearch = (value: string) => {
    const queriesObj = {
      key_word: value,
      room_type_id: selectData.roomType?.value,
      ...(!!selectData.cost ? selectData.cost.valueApi : {}),
      ...(!!selectData.area ? selectData.area.valueApi : {}),
      ...{
        province_id: currentAddress?.provinceId?.split('-')?.[0],
        district_id: currentAddress?.districtId?.split('-')?.[0],
        ward_id: currentAddress?.wardId?.split('-')?.[0],
      },
    };

    const valueSearch = {
      keyWord: value,
      cost: selectData.cost,
      area: selectData.area,
      roomType: selectData.roomType,
      address,
      currentAddress,
      addressSelectArr,
      addressSelectArrRef: addressSelectArrRef.current,
    };

    localStorage.setItem('searchData', JSON.stringify(valueSearch));

    if (window.location.pathname.includes('room/search')) {
      const currentQueries = getQueriesParams();
      const newQueries = { ...currentQueries, ...queriesObj };
      changeUrlWithoutReload(`${window.location.pathname}?${convertObjectToQueryParam(newQueries)}`);

      onListenQueries?.(newQueries);
      return;
    }

    navigate(`/room/search?${convertObjectToQueryParam(queriesObj)}`);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    setKeyWord(value);
  };

  useEffect(() => {
    if (window.location.pathname.includes('room/search')) {
      const searchValue = JSON.parse(localStorage.getItem('searchData') || '{}');

      setSelectData({ cost: searchValue?.cost, area: searchValue?.area, roomType: searchValue?.roomType });
      setAddressSelectArr(searchValue?.addressSelectArr);
      addressSelectArrRef.current = searchValue?.addressSelectArrRef;
      setAddress(searchValue?.address);
      setCurrentAddress(searchValue?.currentAddress);

      setKeyWord(searchValue?.keyWord);
      return;
    }

    localStorage.setItem('searchData', '{}');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ui
  const selectBefore = (
    <Select
      value={selectData.roomType?.value}
      onChange={(value, option) => handleChangeSelect(value, option, 'roomType')}
    >
      <Option value={0}>Tất cả</Option>
      {myContextValue.roomTypes.map((item: IRoomTypeResponse) => (
        <Option key={item?.id} title={item?.name} value={item?.id}>
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
    const handleChangeSelect = (key: 'provinceId' | 'districtId' | 'wardId', id?: string, option?: any) => {
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
              [key]: !!_option?.value ? { ..._option, id: formatNumber(_option?.value) } : undefined,
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
              [key]: !!_option?.value ? { ..._option, id: formatNumber(_option?.value) } : undefined,
              wardId: undefined,
            };
        } else {
          newObj = { [key]: value };
          if (!!_option)
            addressObj = {
              [key]: !!_option?.value ? { ..._option, id: formatNumber(_option?.value) } : undefined,
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

      setAddressId((prev) => ({ ...prev, ...handleCreateObj(formatNumber(id || '0'), key) }));
    };
    return (
      <WrapperAddressSelect>
        <h3>Khu vực</h3>
        <Select
          onChange={(id: string, option: any) => handleChangeSelect('provinceId', id, option)}
          value={currentAddress?.provinceId as any}
          options={formatDataSelect(address?.provinces, 'p')}
          allowClear
          onClear={() => {
            setAddress((prev) => ({ ...prev, districts: [], wards: [] }));
            handleChangeSelect('provinceId', undefined, {});
          }}
          placeholder="Tỉnh"
        ></Select>
        <Select
          onChange={(id: string, option: any) => handleChangeSelect('districtId', id, option)}
          value={currentAddress?.districtId}
          options={formatDataSelect(address?.districts, 'd')}
          allowClear
          onClear={() => {
            setAddress((prev) => ({ ...prev, wards: [] }));
            handleChangeSelect('districtId', undefined, {});
          }}
          placeholder="Quận/huyện"
        ></Select>
        <Select
          onClear={() => handleChangeSelect('wardId', undefined, {})}
          onChange={(id: string, option: any) => handleChangeSelect('wardId', id, option)}
          value={currentAddress?.wardId}
          options={formatDataSelect(address?.wards, 'w')}
          allowClear
          placeholder="Phường/xã"
        ></Select>

        <ButtonCustom
          onClick={() => setIsOpenAddress(false)}
          hover={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
          style={{ background: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 10px' }}
        >
          Đóng
        </ButtonCustom>
      </WrapperAddressSelect>
    );
  };

  const tagRender = (props: any) => {
    return <>{props?.label ? props?.label + ', ' : ''}</>;
  };

  const formatDataSelect = (data: any, type: 'p' | 'd' | 'w') => {
    return data?.map((item: any) => ({ ...item, label: item?.name, value: [item?.id, type].join('-') }));
  };

  const handleChangeSelect = (_value: any, options: any, key: 'cost' | 'area' | 'roomType') => {
    setSelectData((prev) => ({ ...prev, [key]: options }));
  };

  const handleResetField = () => {
    setKeyWord('');
    setSelectData({ cost: undefined, area: undefined, roomType: { value: 0 } });
  };
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
            placeholder="Từ khóa, Đường, Quận, Trường học ..."
            enterButton
          />
          <WrapperSelect>
            <WrapperItem maxwidth={'calc((100% - 40px) / 3)'}>
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
                placeholder="Địa chỉ"
                dropdownRender={(menu) => {
                  return <>{renderContentAddress()}</>;
                }}
              ></SelectAddress>
            </WrapperItem>
            <WrapperItem>
              <SelectCustom
                onChange={(value, options) => handleChangeSelect(value, options, 'cost')}
                value={selectData.cost}
                options={COST_SELECT}
                allowClear
                placeholder="Mức giá"
              ></SelectCustom>
            </WrapperItem>

            <WrapperItem>
              <SelectCustom
                onChange={(value, options) => handleChangeSelect(value, options, 'area')}
                value={selectData.area}
                allowClear
                options={AREAS_SELECT}
                placeholder="Diện tích"
              ></SelectCustom>
            </WrapperItem>

            <IconSync>
              <Image
                onClick={handleResetField}
                width={20}
                height={25}
                preview={false}
                src={images.icons.SyncWhiteIcon}
              />
            </IconSync>
          </WrapperSelect>
        </WrapperOverLay>
      </WrapperSearch>
    </WrapperBannerStyle>
  );
};

export default BannerHome;
