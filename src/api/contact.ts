import { sendPost } from './axios';
import { IContact } from 'components/PageFooter/usePageFooter';

export const sendContact = (params: IContact) => sendPost('/s2/contact/send', params);
