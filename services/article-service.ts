import { ArticleDto } from '../models/article.dto';
import { AuthorDto } from '../models/author.dto';
import { ResponseDto } from '../models/response.dto';
import { getUserId, getUserName, getUserTokenId } from '../utils/firebase';
import { getAuthorized, postAuthorized } from '../utils/http';

export const getArticles = async (): Promise<ResponseDto<ArticleDto[]>> => {
  const tkn = await getUserTokenId();

  return (await getAuthorized('/api/articles', { headers: { Authorization: `Bearer ${tkn}` } })) as ResponseDto<
    ArticleDto[]
  >;
};

export const createArticle = async (article: ArticleDto): Promise<ResponseDto<ArticleDto>> => {
  const tkn = await getUserTokenId();

  const dt: string = new Date().toISOString();

  article.createdAt = dt;
  article.modifiedAt = dt;
  article.author = new AuthorDto();
  article.author.id = await getUserId();
  article.author.name = await getUserName();

  return (await postAuthorized('/api/articles/create', article, {
    headers: { Authorization: `Bearer ${tkn}` },
  })) as ResponseDto<ArticleDto>;
};
