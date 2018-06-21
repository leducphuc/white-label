const customerApi = process.env.NODE_ENV === 'production' ?
  'https://customer-api.vndirect.com.vn' : 'https://customer-api-suat.vndirect.com.vn';
export const CUSTOMER_API = customerApi;
