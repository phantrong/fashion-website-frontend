import { sendGet } from 'api/axios';

const useAddress = () => {
  const getProvince = () => {
    const isExistProvinces = JSON.parse(localStorage.getItem('provinces') || '[]');

    if (isExistProvinces?.length > 0) return { data: isExistProvinces };

    return sendGet('/api/provinces', {}).then((res) => {
      localStorage.setItem('provinces', JSON.stringify(res?.data));
      return res;
    });
  };

  const getDistrict = (provinceId: number) => {
    return sendGet('/api/districts', { province_id: provinceId });
  };

  const getWard = (districtId: number) => {
    return sendGet('/api/wards', { district_id: districtId });
  };

  return {
    getProvince,
    getDistrict,
    getWard,
  };
};

export { useAddress };
