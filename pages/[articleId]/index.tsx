import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';

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
  return (
    <h1>
      {props.title}: Article Id: {props.id}
    </h1>
  );
};

export default ArticlePage;
