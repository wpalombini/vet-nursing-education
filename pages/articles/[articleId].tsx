import type { GetServerSidePropsContext, NextPage } from 'next';
import { Box, Button, Grid } from '@mui/material';
import ModeEdit from '@mui/icons-material/ModeEdit';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { CardContainer, CardTitle } from '../../components/CardContainer';
import { ArticleDto } from '../../models/article.dto';
import { getPublicArticlesForServer, updateArticle } from '../../services/article-service';
import { useContext, useEffect, useState } from 'react';
import { ArticleDetailsForm, IArticleFormData, IArticleFormProps } from '../../components/Articles/ArticleDetailsForm';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';

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
  const { setIsLoading, setNotification } = useContext(UXContext);
  const [user] = useAuthState(getAuth());
  const [article, setArticle] = useState({ ...props.article });
  const [showEditButton, setShowEditButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [articleDetailsFormData, setArticleDetailsFormData] = useState<IArticleFormProps>({} as IArticleFormProps);

  useEffect(() => {
    setShowEditButton(!!user && !!article.author && user.uid === article.author.id);
  }, [user]);

  const handleEditIconClick = () => {
    setArticleDetailsFormData({
      title: article.title,
      content: article.content,
      saveArticle: saveHandler,
    });

    setIsEditing(true);
  };

  const saveHandler = (formData: IArticleFormData) => {
    setIsLoading(true);

    const notification = new UXNotification();
    notification.message = 'Content successfully saved';
    notification.type = NotificationType.Success;

    const saveArticle = async (formData: ArticleDto) => {
      try {
        // save article
        await updateArticle(formData);

        setArticle((previousState) => ({
          ...previousState,
          title: formData.title,
          content: formData.content,
        }));

        setIsEditing(false);
      } catch (error) {
        notification.type = NotificationType.Error;
        notification.message = 'An error occurred while saving the article.';
      }

      setNotification(notification);
      setIsLoading(false);
    };

    const data: ArticleDto = new ArticleDto();
    data.title = formData.title;
    data.content = formData.content;
    saveArticle(data);
  };

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
            <CardTitle title={article.title} />
          </Box>
        </Grid>
        <Grid item xs={1} textAlign="right">
          {showEditButton && (
            <Button color="inherit" onClick={handleEditIconClick}>
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
        <title>VNE - {article.title}</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {!isEditing && <CardContainer header={<HeaderContent />} content={<Box>{article.content}</Box>} />}
          {isEditing && (
            <CardContainer
              header={<CardTitle title="Article Details" />}
              content={<ArticleDetailsForm {...articleDetailsFormData} />}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ArticlePage;
