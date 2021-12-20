import { render, screen } from '@testing-library/react';

import { ArticleDetailsForm, IArticleFormProps } from '../../../components/Articles/ArticleDetailsForm';

describe('components > ArticleDetailsForm', () => {
  test('should render form correctly', () => {
    const formData = {
      content: 'The content',
      title: 'The title',
      saveArticle: jest.fn(),
    } as IArticleFormProps;

    render(<ArticleDetailsForm {...formData} />);

    const titleField = screen.getByLabelText('Title');
    const contentField = screen.getByLabelText('Content');

    expect(titleField).toHaveValue('The title');
    expect(contentField).toHaveValue('The content');
  });
});
