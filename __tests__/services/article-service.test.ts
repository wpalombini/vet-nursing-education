import {
  createArticle,
  getArticlesForClient,
  getPrivateArticlesForServer,
  getPublicArticlesForServer,
  updateArticle,
} from '../../services/article-service';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: 'success' }),
  }),
) as any;

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');

  return {
    __esModule: true,
    ...originalModule,
    getAuth: jest.fn().mockReturnValue({
      currentUser: {
        uid: 123,
        displayName: 'Current User',
        getIdToken: jest.fn().mockResolvedValue('the token id'),
      },
    }),
    signInWithPopup: jest.fn().mockResolvedValue({ id: 123 }),
    signOut: jest.fn(),
  };
});

describe('Services > article-service', () => {
  describe('getPublicArticlesForServer', () => {
    test('should return expected result', async () => {
      const result = await getPublicArticlesForServer();
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('getPrivateArticlesForServer', () => {
    test('should return expected result', async () => {
      const result = await getPrivateArticlesForServer();
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('getArticlesForClient', () => {
    test('should return expected result', async () => {
      const result = await getArticlesForClient();
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('createArticle', () => {
    test('should return expected result', async () => {
      const result = await createArticle({} as any);
      expect(result).toEqual({ result: 'success' });
    });
  });

  describe('updateArticle', () => {
    test('should return expected result', async () => {
      const result = await updateArticle({} as any);
      expect(result).toEqual({ result: 'success' });
    });
  });
});
