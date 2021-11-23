import { render, screen } from '@testing-library/react';
import { ArticleDto } from '../../models/article.dto';
import ArticlePage from '../../pages/articles/[articleId]';

jest.mock('firebase/auth');

describe('Article page tests:', () => {
  test('Article page renders successfully', () => {
    // Arrange
    const article = new ArticleDto();
    article.id = '1';
    article.title = 'The title';
    article.content = 'The content';

    // Act
    render(<ArticlePage article={article} />);

    // Assert
    const header = screen.getByRole('heading');
    expect(header).toHaveTextContent(/^The title$/);
  });
});
