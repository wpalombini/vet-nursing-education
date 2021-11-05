import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { NextPage } from 'next';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { ArticleDto } from '../../models/article.dto';
import { createArticle } from '../../services/article-service';

interface INewArticleFormData {
  content: string;
  title: string;
}

const CreateArticlePage: NextPage = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<INewArticleFormData>();

  const saveHandler = (formData: INewArticleFormData) => {
    const saveArticle = async (article: ArticleDto) => {
      // save article
      const result = await createArticle(article);
      console.log(result);

      // reset form
      reset({} as INewArticleFormData, { keepDirty: false });
    };

    const data: ArticleDto = new ArticleDto();
    data.title = formData.title;
    data.content = formData.content;
    saveArticle(data);
  };

  return (
    <Fragment>
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

              <Button type="submit" variant="outlined">
                Save
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CreateArticlePage;