import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { ArticleDto } from '../../models/article.dto';
import { getPublicArticlesForServer } from '../../services/article-service';

interface IArticlePageProps {
  article: ArticleDto;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id: string = context.params?.articleId as string;

    const response = await getPublicArticlesForServer({ id });

    if (!response?.success && response.data.length > 0) throw new Error();

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
    <Fragment>
      <Head>
        <title>VNE - {props.article.title}</title>
      </Head>
      <h1>Article: {props.article.title}</h1>
      <h5>Article Id: {props.article.id}</h5>
      {props.article.content}
    </Fragment>
  );
};

export default ArticlePage;
