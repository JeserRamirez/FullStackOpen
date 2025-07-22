import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> gets the right props and creates a new blog', async () => {
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('write title here');
  const authorInput = screen.getByPlaceholderText('write author here');
  const urlInput = screen.getByPlaceholderText('write url here');
  const submitButton = screen.getByText('create');

  const user = userEvent.setup();

  await user.type(titleInput, 'Test Blog Title');
  await user.type(authorInput, 'Test Blog Author');
  await user.type(urlInput, 'Test Blog Url');
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test Blog Title',
    author: 'Test Blog Author',
    url: 'Test Blog Url',
  });
});
