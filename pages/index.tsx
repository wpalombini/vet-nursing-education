import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { Link as LinkUI } from '@material-ui/core';
import Link from 'next/link';

interface IHomePageProps {
  title: string;
  articles: string[];
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // await for db call and populate props

  return new Promise<{ props: IHomePageProps }>((resolve) => {
    setTimeout(() => {
      resolve({
        props: {
          title: 'Home Page',
          articles: ['1', '2'],
        } as IHomePageProps,
      });
    }, 1);
  });
};

const HomePage: NextPage<IHomePageProps> = (props: IHomePageProps) => {
  return (
    <Fragment>
      <h1>{props.title}</h1>
      {props.articles.map((id: string, index: number) => (
        <div key={index}>
          <Link href={`/${id}`}>
            <LinkUI href={`/${id}`}>{`test ${[id]}`}</LinkUI>
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export default HomePage;
