import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { NextPage } from 'next';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { ArticleDto } from '../../models/article.dto';
import { createArticle } from '../../services/article-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(5),
      },
    },
    paper: {
      padding: theme.spacing(3),
    },
  }),
);

interface INewArticleFormData {
  content: string;
  title: string;
}

const CreateArticlePage: NextPage = () => {
  const classes = useStyles();

  const {
    formState: { errors, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
  } = useForm<INewArticleFormData>();

  const saveHandler = (formData: INewArticleFormData) => {
    const saveArticle = async (article: ArticleDto) => {
      // save article
      const result = await createArticle(article);

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
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(saveHandler)} className={classes.root}>
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
