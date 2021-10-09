if (process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development') {
  require('dotenv').config();
}
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getDbContainer } from '../database';
import { getAuthApp } from '../identity';

const isAuthorized: (context: Context, req: HttpRequest) => Promise<boolean> = async (
  context: Context,
  req: HttpRequest,
): Promise<boolean> => {
  context.log('req.headers.authorization', req.headers.authorization);

  const token: string = req.headers.authorization?.split(' ')[1];
  if (!token) {
    context.res = {
      status: 401,
      body: 'unauthorized',
    };
    return false;
  }

  const authApp = getAuthApp();

  try {
    await authApp.auth().verifyIdToken(token, true);
    return true;
  } catch (error) {
    context.log('invalid token', { error });

    context.res = {
      status: 401,
      body: error,
    };
    return false;
  }
};

const getArticles = async (context: Context, req: HttpRequest) => {
  const db = await getDbContainer();

  const articles = await db.container('articles').items.readAll().fetchAll();

  const data = await new Promise<any>((resolve) => {
    resolve(
      articles.resources.map((item) => {
        return {
          id: item.id,
          title: item.title,
          content: item.content,
          createdAt: item.createdAt,
        };
      }),
    );
  });

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: data,
  };
};

const createArticle = async (context: Context, req: HttpRequest) => {
  const db = await getDbContainer();

  const article: any = {
    id: new Date().getTime().toString(),
    createdAt: new Date(),
  };

  article.title = req.body.title;
  article.content = req.body.content;

  await db.container('articles').items.create(article);

  context.res = {
    status: 201,
    body: article,
  };
};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('Start article function request.');

  if (!(await isAuthorized(context, req))) {
    return;
  }

  switch (req.method) {
    case 'GET':
      await getArticles(context, req);
      break;
    case 'POST':
      await createArticle(context, req);
      break;

    default:
      break;
  }

  context.log('End article function request.');
};

export default httpTrigger;
