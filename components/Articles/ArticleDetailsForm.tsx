import { Box, Button, TextField, Theme } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UXContext } from '../../providers/UXProvider';

export interface IArticleFormData {
  content: string | undefined;
  title: string | undefined;
}

export interface IArticleFormProps extends IArticleFormData {
  saveArticle: (articleFormData: IArticleFormData) => void;
}

export const ArticleDetailsForm: (props: IArticleFormProps) => JSX.Element = (props: IArticleFormProps) => {
  const { isLoading } = useContext(UXContext);

  useEffect(() => {
    reset({
      title: props.title,
      content: props.content,
    });
  }, [props]);

  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<IArticleFormData>();

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { marginBottom: (theme: Theme) => theme.spacing(3) },
      }}
    >
      <form onSubmit={handleSubmit(props.saveArticle)}>
        <TextField
          id="title"
          type="text"
          label="Title"
          error={!!errors.title}
          helperText={errors.title ? 'Invalid title' : ''}
          fullWidth
          variant="outlined"
          {...register('title', { required: true })}
        />

        <TextField
          id="content"
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
  );
};
