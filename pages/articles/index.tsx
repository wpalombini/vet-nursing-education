import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Box, Grid, Link as LinkUI } from '@mui/material';
import Link from 'next/link';
import { getPublicArticlesForServer } from '../../services/article-service';
import { ArticleDto } from '../../models/article.dto';
import CardContainer from '../../components/CardContainer';

interface IArticlesPageProps {
  articles: ArticleDto[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await getPublicArticlesForServer();

    if (!response?.success) throw new Error();

    return {
      props: {
        articles: response.data,
      } as IArticlesPageProps,
    };
  } catch (error) {
    return {
      props: {
        articles: [],
      } as IArticlesPageProps,
    };
  }
};

const ArticlesPage: NextPage<IArticlesPageProps> = (props: IArticlesPageProps) => {
  const isLast = (index: number, total: number) => {
    return index === total - 1;
  };

  const sortArticles = (a: ArticleDto, b: ArticleDto) => {
    if (a.modifiedAt && b.modifiedAt) {
      const aParsed = Date.parse(a.modifiedAt);
      const bParsed = Date.parse(b.modifiedAt);
      if (aParsed > bParsed) {
        return 1;
      } else if (aParsed < bParsed) {
        return -1;
      } else {
        return 0;
      }
    }

    return 0;
  };

  return (
    <>
      <Head>
        <title>VNE - Articles</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <CardContainer
            header="Articles List"
            content={
              props.articles?.length > 0 &&
              props.articles.sort(sortArticles).map((article: ArticleDto, index: number) => (
                <Box key={article.id}>
                  <h3>
                    <Link href={`articles/${article.id}`}>
                      <LinkUI href={`articles/${article.id}`}>{article.title}</LinkUI>
                    </Link>
                  </h3>
                  {!isLast(index, props.articles.length) && <hr />}
                </Box>
              ))
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ArticlesPage;
