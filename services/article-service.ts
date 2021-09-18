import { ArticleDto } from '../models/article.dto';
import { BaseResponseDto } from '../models/base.dto';
import { getUserTokenId } from '../utils/firebase';
import { getAuthorized } from '../utils/http';

export const getArticles = async () => {
  const tkn = await getUserTokenId();

  return (await getAuthorized('/api/articles', { headers: { Authorization: `Bearer ${tkn}` } })) as BaseResponseDto<
    ArticleDto[]
  >;
};
