import { useEffect, useState } from 'react';
import { useAddress } from 'services';
interface IAddressData {
  id: number;
  name: string;
}

interface IAddressId {
  provinceId?: number;
  districtId?: number;
  wardId?: number;
}

const useAddressHook = () => {
  const [address, setAddress] = useState<{
    provinces: IAddressData[];
    districts: IAddressData[];
    wards: IAddressData[];
  }>({ districts: [], wards: [], provinces: [] });
  const [addressId, setAddressId] = useState<IAddressId>({ districtId: undefined, provinceId: undefined });
  const { getProvince, getDistrict, getWard } = useAddress();

  const handleGetProvince = async () => {
    const result = await getProvince();
    setAddress((prev) => ({ ...prev, provinces: result?.data || [] }));
  };

  const handleGetDistrict = async (provinceId?: number) => {
    if (!!provinceId) {
      const result = await getDistrict(provinceId);

      setAddress((prev) => ({ ...prev, districts: result?.data || [] }));
    }
  };

  const handleGetWard = async (districtId?: number) => {
    if (!!districtId) {
      const result = await getWard(districtId);
      setAddress((prev) => ({ ...prev, wards: result?.data || [] }));
    }
  };

  useEffect(() => {
    handleGetProvince();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetDistrict(addressId.provinceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId.provinceId]);

  useEffect(() => {
    handleGetWard(addressId.districtId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId.districtId]);

  return {
    address,
    setAddressId,
    addressId,
  };
};

export { useAddressHook };
