import { Button, Grid, Paper, Theme, TextField } from '@mui/material';
import { NextPage } from 'next';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ArticleDto } from '../../models/article.dto';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';
import { createArticle } from '../../services/article-service';

interface INewArticleFormData {
  content: string;
  title: string;
}

const CreateArticlePage: NextPage = () => {
  const { isLoading, setIsLoading, setNotification } = useContext(UXContext);

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
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
        console.log(result);

        // reset form
        reset({} as INewArticleFormData, { keepDirty: false });
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
    <>
      <h1>Create new article</h1>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              padding: (theme: Theme) => theme.spacing(3),
              '& .MuiTextField-root': { marginBottom: (theme: Theme) => theme.spacing(5) },
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
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateArticlePage;
