import { Grid } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ArticleDetailsForm, IArticleFormData, IArticleFormProps } from '../../components/Articles/ArticleDetailsForm';
import { CardContainer, CardTitle } from '../../components/CardContainer';
import { ArticleDto } from '../../models/article.dto';
import { NotificationType, UXContext, UXNotification } from '../../providers/UXProvider';
import { createArticle } from '../../services/article-service';

const CreateArticlePage: NextPage = () => {
  const { setIsLoading, setNotification } = useContext(UXContext);
  const [articleDetailsData, setArticleDetailsData] = useState<IArticleFormProps>({} as IArticleFormProps);
  const router = useRouter();

  useEffect(() => {
    setArticleDetailsData({
      title: undefined,
      content: undefined,
      saveArticle: saveHandler,
    });
  }, []);

  const saveHandler = (formData: IArticleFormData) => {
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
          header={<CardTitle title="Article Details" />}
          content={<ArticleDetailsForm {...articleDetailsData} />}
        />
      </Grid>
    </Grid>
  );
};

export default CreateArticlePage;
