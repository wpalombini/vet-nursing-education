import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { ArticleDto } from '../models/article.dto';
import { ResponseDto } from '../models/response.dto';

export const createArticleFunction = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response<ResponseDto<ArticleDto>>) => {
    functions.logger.info('Start creating article', { model: JSON.parse(req.body) });

    if (req.method !== 'POST') {
      res.status(500).json(new ResponseDto<any>(false, 'Invalid http method', null));
      return;
    }

    const article: ArticleDto = JSON.parse(req.body);

    if (!admin.apps?.length) {
      admin.initializeApp();
    }

    const db = admin.firestore();

    const document = await db.collection('articles').add(article);
    article.id = document.id;

    res.status(200).json(new ResponseDto<ArticleDto>(true, '', article));
    functions.logger.info('End creating article', { authorization: req.headers.authorization, article: article });
  },
);
