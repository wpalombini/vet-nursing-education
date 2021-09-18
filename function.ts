import { https } from 'firebase-functions';
const { default: next } = require('next');
import { articlesFunction } from './functions/articles-function';
import { createArticleFunction } from './functions/create-article-function';

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
export const nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});

export const articles = articlesFunction;
export const createarticle = createArticleFunction;
