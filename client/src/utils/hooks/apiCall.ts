import axios, { AxiosRequestConfig } from 'axios';
import checkTokenExistence from './checkToken';

export async function ipaCall(
  method: string,
  url: string,
  checkToken?: boolean,
  params?: any,
  data?: any
) {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (checkToken) {
    const token = checkTokenExistence(true);
    headers.Authorization = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    headers: headers,
    data: data,
    params: params,
  };

  const response: any = await axios(config);
  return response.data;
}
