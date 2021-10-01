import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ArticleDto } from '../models/article.dto';
import { ResponseDto } from '../models/response.dto';

const ARTICLES = 'articles';

const getDB = (): FirebaseFirestore.Firestore => {
  if (!admin.apps?.length) {
    admin.initializeApp();
  }

  return admin.firestore();
};

const getArticles = async (req: functions.Request, res: functions.Response) => {
  functions.logger.info('Start articles function get articles');

  const db = getDB();

  // skip 'content' field
  const snapshot = await db.collection(ARTICLES).select('id', 'title', 'createdAt', 'modifiedAt', 'author').get();

  const articles = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as ArticleDto;
  });

  res.status(200).json(new ResponseDto<ArticleDto[]>(true, '', articles));

  functions.logger.info('End articles function get articles', { articles: articles });
};

const createArticle = async (req: functions.Request, res: functions.Response) => {
  functions.logger.info('Start creating article', { model: JSON.parse(req.body) });

  const article: ArticleDto = JSON.parse(req.body);

  const db = getDB();

  const document = await db.collection(ARTICLES).add(article);
  article.id = document.id;

  res.status(200).json(new ResponseDto<ArticleDto>(true, '', article));

  functions.logger.info('End creating article', { authorization: req.headers.authorization, article: article });
};

export const articlesFunction = functions.https.onRequest(async (req: functions.Request, res: functions.Response) => {
  functions.logger.info('Start articles function call', { http_method: req.method });

  switch (req.method) {
    case 'GET':
      await getArticles(req, res);
      break;
    case 'POST':
      await createArticle(req, res);
      break;
    default:
      throw new Error(`http method (${req.method}) not supported.`);
  }

  functions.logger.info('End articles function call');
});
