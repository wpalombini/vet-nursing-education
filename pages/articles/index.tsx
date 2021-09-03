import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { Link as LinkUI } from '@material-ui/core';
import Link from 'next/link';

interface IArticlesPageProps {
  title: string;
  articles: string[];
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // await for db call and populate props

  return new Promise<{ props: IArticlesPageProps }>((resolve) => {
    setTimeout(() => {
      resolve({
        props: {
          title: 'Articles Page',
          articles: ['1', '2'],
        } as IArticlesPageProps,
      });
    }, 1);
  });
};

const ArticlesPage: NextPage<IArticlesPageProps> = (props: IArticlesPageProps) => {
  return (
    <Fragment>
      <h1>{props.title}</h1>
      {props.articles.map((id: string, index: number) => (
        <div key={index}>
          <Link href={`articles/${id}`}>
            <LinkUI href={`articles/${id}`}>{`test ${[id]}`}</LinkUI>
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export default ArticlesPage;
