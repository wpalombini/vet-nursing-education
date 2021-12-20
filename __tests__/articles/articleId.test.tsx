import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ArticleDto } from '../../models/article.dto';
import { AuthorDto } from '../../models/author.dto';
import { ResponseDto } from '../../models/response.dto';
import ArticlePage, { getServerSideProps } from '../../pages/articles/[articleId]';
import { UXProvider } from '../../providers/UXProvider';
import { getPublicArticlesForServer } from '../../services/article-service';

jest.mock('react-firebase-hooks/auth', () => {
  const originalModule = jest.requireActual('react-firebase-hooks/auth');

  return {
    __esModule: true,
    ...originalModule,
    useAuthState: jest.fn(),
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
jest.mock('../../services/article-service', () => ({
  getPublicArticlesForServer: jest.fn(),
}));

describe('Article page tests:', () => {
  beforeEach(() => {
    (useAuthState as jest.Mock).mockReturnValue([]);
  });

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

  test('Display form when in edit mode', async () => {
    // Arrange
    const uid = '123';
    (useAuthState as jest.Mock).mockReturnValue([{ uid }]);

    const article = new ArticleDto();
    article.id = '1';
    article.title = 'The title';
    article.content = 'The content';
    article.author = new AuthorDto();
    article.author.id = uid;

    // Act
    render(<ArticlePage article={article} />);
    const editBtn = await screen.getByTestId('ModeEditIcon');
    userEvent.click(editBtn);

    // Assert
    const titleField = await screen.getByLabelText('Title');
    const contentField = await screen.getByLabelText('Content');

    expect(titleField).toHaveValue('The title');
    expect(contentField).toHaveValue('The content');
  });

  describe('getServerSideProps', () => {
    test('should return props correctly', async () => {
      // Arrange
      const articles = [
        {
          id: '123',
        },
      ] as ArticleDto[];
      const response = new ResponseDto(true, '', articles);
      (getPublicArticlesForServer as jest.Mock).mockResolvedValue(response);
      const context = { params: { articleId: 123 } };

      // Act
      const result = await getServerSideProps(context as any);

      expect((result as any).props.article).toEqual(articles[0]);
    });

    test('should return not found when error occurs', async () => {
      // Arrange
      const articles = [
        {
          id: '123',
        },
      ] as ArticleDto[];
      const response = new ResponseDto(false, '', articles);
      (getPublicArticlesForServer as jest.Mock).mockResolvedValue(response);
      const context = { params: { articleId: 123 } };

      // Act
      const result = await getServerSideProps(context as any);

      expect(result).toEqual({ notFound: true });
    });
  });

  describe('saveHandler', () => {
    test('should save article correctly', async () => {
      // Arrange
      const uid = '123';
      (useAuthState as jest.Mock).mockReturnValue([{ uid }]);

      const article = new ArticleDto();
      article.id = '1';
      article.title = 'The title';
      article.content = 'The content';
      article.author = new AuthorDto();
      article.author.id = uid;

      render(
        <UXProvider>
          <ArticlePage article={article} />
        </UXProvider>,
      );

      const editBtn = screen.getByTestId('ModeEditIcon');
      userEvent.click(editBtn);

      const contentField = screen.getByLabelText('Content');
      expect(contentField).toHaveValue('The content');
      userEvent.type(contentField, 'The updated content');

      // Act
      const saveBtn = screen.getByText(/^Save$/);
      userEvent.click(saveBtn);

      // expect that save article api has been called
    });
  });
});
