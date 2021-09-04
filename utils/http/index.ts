import { getUserTokenId } from '../firebase';

export const getAuthorized = async (url: string, requestInit?: RequestInit): Promise<any> => {
  const tkn = await getUserTokenId();
  const response = await fetch(url, requestInit);
  return await response.json();
};

export const getPublic = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return await response.json();
};
