import type { NextPage } from 'next';
import { Link as LinkUI } from '@mui/material';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link href="articles">
        <LinkUI href="articles">Articles</LinkUI>
      </Link>
    </>
  );
};

export default HomePage;
