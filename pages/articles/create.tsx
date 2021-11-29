import { Box, Button, Grid, TextField, Theme } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CardContainer, CardTitle } from '../../components/CardContainer';
import { ArticleDto } from '../../models/article.dto';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';
import { createArticle } from '../../services/article-service';

interface INewArticleFormData {
  content: string;
  title: string;
}

const CreateArticlePage: NextPage = () => {
  const { isLoading, setIsLoading, setNotification } = useContext(UXContext);
  const router = useRouter();

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<INewArticleFormData>();

  const saveHandler = (formData: INewArticleFormData) => {
    setIsLoading(true);

    const notification = new UXNotification();
    notification.message = 'Content successfully saved';
    notification.type = NotificationType.Success;

    const saveArticle = async (article: ArticleDto) => {
      try {
        // save article
        const result = await createArticle(article);

        // navigate to articles page
        router.push(`/articles/${result.data.id}`);
      } catch (error) {
        notification.type = NotificationType.Error;
        notification.message = 'An error occurred while saving your content.';

        setNotification(notification);
      }

      setNotification(notification);
      setIsLoading(false);
    };

    const data: ArticleDto = new ArticleDto();
    data.title = formData.title;
    data.content = formData.content;
    saveArticle(data);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <CardContainer
          header={<CardTitle title="Create a new article" />}
          content={
            <Box
              sx={{
                '& .MuiTextField-root': { marginBottom: (theme: Theme) => theme.spacing(3) },
              }}
            >
              <form onSubmit={handleSubmit(saveHandler)}>
                <TextField
                  type="text"
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title ? 'Invalid title' : ''}
                  fullWidth
                  variant="outlined"
                  {...register('title', { required: true })}
                />

                <TextField
                  multiline
                  minRows={10}
                  label="Content"
                  error={!!errors.content}
                  helperText={errors.content ? 'Invalid content' : ''}
                  fullWidth
                  variant="outlined"
                  {...register('content', { required: true })}
                />

                <Button type="submit" variant="outlined" disabled={isLoading || !isDirty}>
                  Save
                </Button>
              </form>
            </Box>
          }
        />
      </Grid>
    </Grid>
  );
};

export default CreateArticlePage;
