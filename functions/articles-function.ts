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
  functions.logger.info('Query string:', req.query);

  const db = getDB();

  const articles: ArticleDto[] = [];

  let articlesRef = db.collection(ARTICLES);

  if (req.query.id) {
    const articleDoc = await articlesRef.doc(req.query.id.toString()).get();
    const data = articleDoc.data();
    if (data) {
      articles.push({ id: articleDoc.id, ...data } as ArticleDto);
    }
  } else {
    // skip 'content' field
    let query = articlesRef.select('id', 'title', 'createdAt', 'modifiedAt', 'author');

    if (req.query.title) {
      query = articlesRef.where('title', '==', req.query.title);
    }

    const articleDocs = await query.get();

    articleDocs.docs.map((doc) => {
      const data = doc.data();
      if (data) {
        articles.push({ id: doc.id, ...doc.data() } as ArticleDto);
      }
    });
  }

  const success = articles.length > 0;
  const message = success ? '' : 'No articles found';
  res.status(200).json(new ResponseDto<ArticleDto[]>(success, message, articles));

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

const updateArticle = async (req: functions.Request, res: functions.Response) => {
  functions.logger.info('Start updating article', { model: JSON.parse(req.body) });

  const article: ArticleDto = JSON.parse(req.body);

  const db = getDB();

  // const document = await db.collection(ARTICLES).add(article);
  // article.id = document.id;

  res.status(200).json(new ResponseDto<ArticleDto>(true, '', article));

  functions.logger.info('End updating article', { authorization: req.headers.authorization, article: article });
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
    case 'PUT':
      await updateArticle(req, res);
      break;
    default:
      throw new Error(`http method (${req.method}) not supported.`);
  }

  functions.logger.info('End articles function call');
});
