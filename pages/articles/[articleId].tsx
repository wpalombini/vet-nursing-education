import type { GetServerSidePropsContext, NextPage } from 'next';
import { Box, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import CardContainer from '../../components/CardContainer';
import { ArticleDto } from '../../models/article.dto';
import { getPublicArticlesForServer } from '../../services/article-service';

interface IArticlePageProps {
  article: ArticleDto;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id: string = context.params?.articleId as string;

    const response = await getPublicArticlesForServer({ id });

    if (!response?.success) throw new Error();

    const article = response.data[0];

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const ArticlePage: NextPage<IArticlePageProps> = (props: IArticlePageProps) => {
  return (
    <>
      <Head>
        <title>VNE - {props.article.title}</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <CardContainer header={props.article.title} content={<Box>{props.article.content}</Box>} />
        </Grid>
      </Grid>
    </>
  );
};

export default ArticlePage;
