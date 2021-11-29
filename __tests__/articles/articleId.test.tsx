import { render, screen } from '@testing-library/react';
import { ArticleDto } from '../../models/article.dto';
import ArticlePage from '../../pages/articles/[articleId]';

jest.mock('react-firebase-hooks/auth', () => {
  const originalModule = jest.requireActual('react-firebase-hooks/auth');

  return {
    __esModule: true,
    ...originalModule,
    useAuthState: jest.fn().mockReturnValue([]),
  };
});
jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');

  return {
    __esModule: true,
    ...originalModule,
    getAuth: jest.fn().mockReturnValue(null),
  };
});

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
