import { Button } from '@material-ui/core';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import { getArticles } from '../../services/article-service';

interface IArticlePageProps {
  id: string;
  title: string;
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
  const [token, setToken] = useState('');

  const handleGetToken = async () => {
    //const tkn = await getUserTokenId();
    // setToken(tkn ?? 'token not found');
    const data = await getArticles();
    console.log(data);
  };

  return (
    <Fragment>
      <h1>
        {props.title}: Article Id: {props.id}
      </h1>
      <Button onClick={handleGetToken}>Get Token</Button>
      {`The current token is: ${token}`}
    </Fragment>
  );
};

export default ArticlePage;
