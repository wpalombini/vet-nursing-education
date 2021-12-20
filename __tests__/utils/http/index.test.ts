import { getAuthorized, getPublic, postAuthorized, buildQueryString } from '../../../utils/http';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: 'success' }),
  }),
) as any;

describe('Utils > Http', () => {
  describe('getAuthorized', () => {
    test('should return expected response', async () => {
      const result = await getAuthorized('url', {} as any);
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('getPublic', () => {
    test('should return expected response', async () => {
      const result = await getPublic('url');
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('postAuthorized', () => {
    test('should return expected response', async () => {
      const result = await postAuthorized('url', {} as any);
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('buildQueryString', () => {
    const data = {
      prop1: 'val1',
      prop2: 'val2',
    };
    const result = buildQueryString(data);
    expect(result).toEqual('prop1=val1&prop2=val2');
  });
});
