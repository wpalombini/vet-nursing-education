import { ArticleDto } from '../models/article.dto';
import { AuthorDto } from '../models/author.dto';
import { BaseResponseDto } from '../models/base.dto';
import { getUserId, getUserName, getUserTokenId } from '../utils/firebase';
import { getAuthorized, postAuthorized } from '../utils/http';

export const getArticles = async () => {
  const tkn = await getUserTokenId();

  return (await getAuthorized('/api/articles', { headers: { Authorization: `Bearer ${tkn}` } })) as BaseResponseDto<
    ArticleDto[]
  >;
};

export const createArticle = async (article: ArticleDto) => {
  const tkn = await getUserTokenId();

  article.author = new AuthorDto();
  article.author.id = await getUserId();
  article.author.name = await getUserName();

  return (await postAuthorized('/api/articles/create', article, {
    headers: { Authorization: `Bearer ${tkn}` },
  })) as BaseResponseDto<ArticleDto>;
};
