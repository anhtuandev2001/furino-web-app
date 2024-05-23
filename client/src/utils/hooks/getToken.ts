import * as jwtDecode from 'jwt-decode';

export const getDataFromToken = (token: any) => {
    try {
      const data: any = jwtDecode.jwtDecode(token);
      return data.data;
    } catch (error) {
      return null;
    }
  };