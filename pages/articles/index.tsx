import type { GetServerSidePropsContext, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Link as LinkUI } from '@material-ui/core';
import Link from 'next/link';
import { getArticles } from '../../services/article-service';
import { ArticleDto } from '../../models/article.dto';
import { UXContext } from '../../providers/UXProvider';

interface IArticlesPageProps {
  title: string;
  articles: string[];
}

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   // await for db call and populate props

//   return new Promise<{ props: IArticlesPageProps }>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         props: {
//           title: 'Articles Page',
//           articles: ['1', '2'],
//         } as IArticlesPageProps,
//       });
//     }, 1);
//   });
// };

const ArticlesPage: NextPage<IArticlesPageProps> = (props: IArticlesPageProps) => {
  const [articles, setArticles] = useState<ArticleDto[] | null>(null);
  const { isLoading, setIsLoading } = useContext(UXContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchArticles = async () => {
      const result = await getArticles();
      setArticles(result.data);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <Fragment>
      <h1>{props.title}</h1>
      {!isLoading &&
        articles &&
        articles.length > 0 &&
        articles.map((article: ArticleDto, index: number) => (
          <div key={index}>
            <Link href={`articles/${article.id}`}>
              <LinkUI href={`articles/${article.id}`}>{article.title}</LinkUI>
            </Link>
          </div>
        ))}
    </Fragment>
  );
};

export default ArticlesPage;
