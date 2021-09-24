import { Button } from '@material-ui/core';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import { getArticles } from '../../services/article-service';

interface IArticlePageProps {
  id: string;
  title: string;
  content: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // await for db call and populate props

  const id: string = context.params?.articleId as string;

  return new Promise<{ props: IArticlePageProps }>((resolve) => {
    setTimeout(() => {
      resolve({
        props: {
          id: id,
          title: 'Article Page',
        } as IArticlePageProps,
      });
    }, 1);
  });
};

const ArticlePage: NextPage<IArticlePageProps> = (props: IArticlePageProps) => {
  return (
    <Fragment>
      <h1>Article: {props.title}</h1>
      {props.content}
    </Fragment>
  );
};

export default ArticlePage;
