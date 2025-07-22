import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog, update as updateBlog } from '../services/blogs';
import {
  setNotification,
  useNotificationDispatch,
} from '../reducers/NotificationContextReducer';
import { Title, Input, Button, Form, Paragraph } from '../styles';

const BlogForm = ({ blogFormRef, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newBlogMutation = useMutation({
    mutationFn: async (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs']) || [];

      const existingBlog = blogs.find(
        (blog) =>
          blog.title.toLowerCase().trim() ===
          blogObject.title.toLowerCase().trim()
      );

      if (existingBlog) {
        if (user.id === existingBlog.user.id) {
          const confirmUpdate = window.confirm(
            `The blog "${blogObject.title}" already exists. Do you want to update it?`
          );

          if (confirmUpdate) {
            const updatedBlog = await updateBlog(existingBlog.id, blogObject);
            return { updated: true, blog: updatedBlog };
          } else {
            throw new Error('Blog update cancelled');
          }
        } else {
          throw new Error(
            `${blogObject.title} already exists and you do not have permission to update it`
          );
        }
      }

      const newBlog = await createBlog(blogObject);
      return { updated: false, blog: newBlog };
    },
    onSuccess: ({ updated, blog }) => {
      const blogs = queryClient.getQueryData(['blogs']) || [];

      const updatedBlogs = updated
        ? blogs.map((b) => (b.id === blog.id ? blog : b))
        : blogs.concat(blog);

      queryClient.setQueryData(['blogs'], updatedBlogs);

      setNotification(
        notificationDispatch,
        updated
          ? `The blog "${blog.title}" has been updated successfully`
          : `A new blog "${blog.title}" by ${blog.author} was added`,
        'success'
      );

      setTitle('');
      setAuthor('');
      setUrl('');

      blogFormRef.current?.toggleVisibility();
    },
    onError: (error) => {
      setNotification(
        notificationDispatch,
        error.message || 'An error occurred',
        'error'
      );
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({ title, author, url });
  };

  return (
    <>
      <Title>Create New Blog</Title>
      <Form onSubmit={handleSubmit}>
        <label>
          <Paragraph>Title</Paragraph>
          <Input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Write a title"
            data-testid="title"
            name="title"
          />
        </label>

        <label>
          <Paragraph>Author</Paragraph>
          <Input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author name"
            data-testid="author"
            name="author"
          />
        </label>

        <label>
          <Paragraph>URL</Paragraph>
          <Input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="https://..."
            data-testid="url"
            name="url"
          />
        </label>

        <Button type="submit">Create</Button>
      </Form>
    </>
  );
};

export default BlogForm;
