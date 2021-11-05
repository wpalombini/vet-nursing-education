import { ArticleDto } from '../models/article.dto';
import { AuthorDto } from '../models/author.dto';
import { ResponseDto } from '../models/response.dto';
import { getAuthHeader } from '../utils/auth';
import { getUserId, getUserName, getUserTokenId } from '../utils/firebase';
import { getAuthorized, getPublic, postAuthorized } from '../utils/http';

export const getPublicArticlesForServer = async (): Promise<ResponseDto<ArticleDto[]>> => {
  return (await getPublic(`${process.env.BASE_FUNCTION_URL}/articles`)) as ResponseDto<ArticleDto[]>;
};

export const getPrivateArticlesForServer = async (): Promise<ResponseDto<ArticleDto[]>> => {
  const tkn = await getUserTokenId();

  return (await getAuthorized(`${process.env.BASE_FUNCTION_URL}/articles`, {
    headers: { Authorization: getAuthHeader(tkn) },
  })) as ResponseDto<ArticleDto[]>;
};

export const getArticlesForClient = async (): Promise<ResponseDto<ArticleDto[]>> => {
  return (await getPublic('/api/articles')) as ResponseDto<ArticleDto[]>;
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
    headers: { Authorization: getAuthHeader(tkn) },
  })) as ResponseDto<ArticleDto>;
};
