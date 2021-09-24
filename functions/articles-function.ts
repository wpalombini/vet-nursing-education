import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ArticleDto } from '../models/article.dto';
import { BaseResponseDto } from '../models/base.dto';

export const articlesFunction = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response<BaseResponseDto<ArticleDto[]>>) => {
    functions.logger.info('Start getting articles', { authorization: req.headers.authorization });

    if (!admin.apps?.length) {
      admin.initializeApp();
    }

    const db = admin.firestore();

    const snapshot = await db.collection('articles').get();
    const articles = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as ArticleDto;
    });

    res.status(200).json(new BaseResponseDto<ArticleDto[]>(true, '', articles));
    functions.logger.info('End getting articles', { articles: articles });
  },
);
