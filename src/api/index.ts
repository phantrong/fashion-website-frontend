import { sendGet } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getAccessNumber = () => sendGet('/s2/homepage/access-times/total');
