import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ArticleDto } from '../models/article.dto';
import { ResponseDto } from '../models/response.dto';

export const articlesFunction = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response<ResponseDto<ArticleDto[]>>) => {
    functions.logger.info('Start getting articles', { authorization: req.headers.authorization });

    if (!admin.apps?.length) {
      admin.initializeApp();
    }

    const db = admin.firestore();

    const snapshot = await db.collection('articles').get();
    const articles = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as ArticleDto;
    });

    res.status(200).json(new ResponseDto<ArticleDto[]>(true, '', articles));
    functions.logger.info('End getting articles', { articles: articles });
  },
);
