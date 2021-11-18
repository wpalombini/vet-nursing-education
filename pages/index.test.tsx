import { render, screen } from '@testing-library/react';
import HomePage from './index';

describe('Home page tests:', () => {
  test('Home page renders successfully', () => {
    render(<HomePage />);

    const link = screen.getByText('Articles');

    expect(link).toBeVisible();
  });
});
