import type { NextApiRequest, NextApiResponse } from 'next';
import { ArticleDto } from '../../../models/article.dto';
import { ResponseDto } from '../../../models/response.dto';
import { getPublicArticlesForServer } from '../../../services/article-service';

const articlesHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseDto<ArticleDto[]>>): Promise<void> => {
  res.status(200).json(await getPublicArticlesForServer(req.query));
};

export default articlesHandler;
