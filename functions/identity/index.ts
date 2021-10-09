import * as admin from 'firebase-admin';
import * as serviceAccount from '../service-account.json';

export const getAuthApp: () => admin.app.App = (): admin.app.App => {
  if (!admin.apps?.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });
  }

  return admin.apps[0];
};
