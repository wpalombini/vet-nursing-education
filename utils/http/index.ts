export const getAuthorized = async (url: string, requestInit?: RequestInit): Promise<any> => {
  const response = await fetch(url, requestInit);
  return await response.json();
};

export const getPublic = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return await response.json();
};

export const postAuthorized = async (url: string, data: any, requestInit?: RequestInit): Promise<any> => {
  const requestInitObject: RequestInit = {
    method: 'POST',
    headers: requestInit?.headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, requestInitObject);
  return await response.json();
};

export const putAuthorized = async (url: string, data: any, requestInit?: RequestInit): Promise<any> => {
  const requestInitObject: RequestInit = {
    method: 'PUT',
    headers: requestInit?.headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, requestInitObject);
  return await response.json();
};

export const buildQueryString = (params: any) => {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
};
