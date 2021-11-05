import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { Link as LinkUI } from '@mui/material';
import Link from 'next/link';
import { getArticlesForClient, getPublicArticlesForServer } from '../../services/article-service';
import { ArticleDto } from '../../models/article.dto';

interface IArticlesPageProps {
  articles: ArticleDto[];
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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
  return (
    <>
      <Head>
        <title>VNE - Articles</title>
      </Head>
      <h1>Articles Page</h1>
      {props.articles &&
        props.articles.length > 0 &&
        props.articles.map((article: ArticleDto, index: number) => (
          <div key={index}>
            <Link href={`articles/${article.id}`}>
              <LinkUI href={`articles/${article.id}`}>{article.title}</LinkUI>
            </Link>
          </div>
        ))}
    </>
  );
};

export default ArticlesPage;
