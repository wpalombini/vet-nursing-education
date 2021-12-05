import type { GetServerSidePropsContext, NextPage } from 'next';
import { Box, Button, Grid } from '@mui/material';
import ModeEdit from '@mui/icons-material/ModeEdit';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { CardContainer, CardTitle } from '../../components/CardContainer';
import { ArticleDto } from '../../models/article.dto';
import { getPublicArticlesForServer } from '../../services/article-service';
import { useEffect, useState } from 'react';

interface IArticlePageProps {
  article: ArticleDto;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id: string = context.params?.articleId as string;

    const response = await getPublicArticlesForServer({ id });

    if (!response?.success) throw new Error();

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
  const [user] = useAuthState(getAuth());
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    setShowEditButton(!!user && !!props.article.author && user.uid === props.article.author.id);
  }, [user]);

  const HeaderContent = () => {
    return (
      <Grid container>
        <Grid item xs={11}>
          <Box
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <CardTitle title={props.article.title} />
          </Box>
        </Grid>
        <Grid item xs={1} textAlign="right">
          {showEditButton && (
            <Button color="inherit">
              <ModeEdit />
            </Button>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Head>
        <title>VNE - {props.article.title}</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <CardContainer header={<HeaderContent />} content={<Box>{props.article.content}</Box>} />
        </Grid>
      </Grid>
    </>
  );
};

export default ArticlePage;
