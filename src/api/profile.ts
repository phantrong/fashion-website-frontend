import { sendGet, sendPost } from './axios';

export const getProfile = () => sendGet('/s2/profile');
export const updateProfile = (params: any) => sendPost('/s2/profile/update', params);
