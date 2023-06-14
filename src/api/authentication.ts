import { sendPost } from './axios';

export const login = (payload: any) => sendPost('/s2/login', payload);
export const signUp = (payload: any) => sendPost('/s2/register', payload);
export const verifySignUp = (payload: any) => sendPost('/s2/register/verify-email', payload);
export const loginWithGoogle = (payload: any) => sendPost('/s2/login-google', payload);
export const logout = () => sendPost('/s2/logout');
