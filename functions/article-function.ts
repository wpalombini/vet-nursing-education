import * as functions from 'firebase-functions';
import { ArticleDto } from '../models/article.dto';
import { AuthorDto } from '../models/author.dto';
import { BaseResponseDto } from '../models/base.dto';

export const articlesFunction = functions.https.onRequest(
  (req: functions.Request, res: functions.Response<BaseResponseDto<ArticleDto[]>>) => {
    functions.logger.info('Start getting articles', { authorization: req.headers.authorization });
    const articles: ArticleDto[] = [];
    const article1: ArticleDto = new ArticleDto();
    article1.id = 'article1';
    article1.title = 'The First Article';
    article1.author = new AuthorDto();
    article1.author.id = 'author1';
    article1.author.name = 'Mr Author1';
    articles.push(article1);
    const article2: ArticleDto = new ArticleDto();
    article2.id = 'article2';
    article2.title = 'The Second Article';
    article2.author = new AuthorDto();
    article2.author.id = 'author2';
    article2.author.name = 'Mr Author2';
    articles.push(article2);

    res.status(200).json(new BaseResponseDto<ArticleDto[]>(true, '', articles));
    functions.logger.info('End getting articles', { authorization: req.headers.authorization });
  },
);
