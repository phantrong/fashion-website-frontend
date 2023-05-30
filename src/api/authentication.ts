import { sendPost } from './axios';

export const login = (payload: any) => sendPost('/s2/login', payload);
export const signUp = (payload: any) => sendPost('/s2/register', payload);
export const loginWithGoogle = (payload: any) => sendPost('/s2/login-google', payload);
