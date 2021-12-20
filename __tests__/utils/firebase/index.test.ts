import { signOut } from 'firebase/auth';
import { getUserId, getUserName, getUserTokenId, login, logout } from '../../../utils/firebase';

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

describe('Utils > firebase', () => {
  describe('login', () => {
    test('should return UserCredential successfully', async () => {
      const result = await login();
      expect(result).toEqual({ id: 123 });
    });
  });

  describe('logout', () => {
    test('should call signout successfully', async () => {
      await logout();
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserTokenId', () => {
    test('should return the user token id', async () => {
      const result = await getUserTokenId();
      expect(result).toEqual('the token id');
    });
  });

  describe('getUserId', () => {
    test('should return the user token id', async () => {
      const result = await getUserId();
      expect(result).toEqual(123);
    });
  });

  describe('getUserName', () => {
    test('should return the user token id', async () => {
      const result = await getUserName();
      expect(result).toEqual('Current User');
    });
  });
});
