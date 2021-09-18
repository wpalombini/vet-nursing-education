import * as functions from 'firebase-functions';
import { ArticleDto } from '../models/article.dto';
import { AuthorDto } from '../models/author.dto';
import { BaseResponseDto } from '../models/base.dto';

export const createArticleFunction = functions.https.onRequest(
  (req: functions.Request, res: functions.Response<BaseResponseDto<ArticleDto>>) => {
    functions.logger.info('Start creating article', { model: JSON.parse(req.body) });
    if (req.method !== 'POST') {
      res.status(500).json(new BaseResponseDto<any>(false, 'Invalid http method', null));
      return;
    }

    const article: ArticleDto = JSON.parse(req.body);
    article.id = '123';

    res.status(200).json(new BaseResponseDto<ArticleDto>(true, '', article));
    functions.logger.info('End creating article', { authorization: req.headers.authorization, article: article });
  },
);
