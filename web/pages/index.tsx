import type { NextPage } from 'next';
import { Fragment } from 'react';
import { Link as LinkUI } from '@material-ui/core';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <h1>Home Page</h1>
      <Link href="articles">
        <LinkUI href="articles">Articles</LinkUI>
      </Link>
    </Fragment>
  );
};

export default HomePage;
