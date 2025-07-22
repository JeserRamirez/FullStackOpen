import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setNotification,
  useNotificationDispatch,
} from '../reducers/NotificationContextReducer';
import { deleteBlog, getAll, update } from '../services/blogs';
import CommentList from './CommentList';
import { BlogCard, Button, Paragraph, Title } from '../styles';

const Blog = ({ loggedUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const updateLikesMutation = useMutation({
    mutationFn: ({ id, newObject }) => update(id, newObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      const updatedBlogs = blogs.map((b) =>
        b.id !== updatedBlog.id ? b : updatedBlog
      );

      queryClient.setQueryData(['blogs'], updatedBlogs);
    },
  });

  const handleLike = (blog) => {
    updateLikesMutation.mutate(
      {
        id: blog.id,
        newObject: {
          ...blog,
          likes: blog.likes + 1,
        },
      },
      {
        onSuccess: () => {
          setNotification(
            notificationDispatch,
            `you voted '${blog.title}'`,
            'success'
          );
        },
      }
    );
  };

  const deleteBlogMutation = useMutation({
    mutationFn: async (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await deleteBlog(blog);
      } else {
        throw new Error('User cancelled');
      }
    },
    onSuccess: (_data, deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== deletedBlog.id)
      );
      setNotification(
        notificationDispatch,
        `blog ${deletedBlog.title} by ${deletedBlog.author} deleted`,
        'success'
      );

      navigate('/');
    },
    onError: (error) => {
      setNotification(
        notificationDispatch,
        error.response?.data?.error || error.message,
        'error'
      );
    },
  });

  const handleDelete = (blog) => {
    deleteBlogMutation.mutate(blog);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog</div>;

  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <div>Blog not found</div>;

  return (
    <BlogCard>
      <Title>
        {blog.title} {blog.author}
      </Title>
      <div>
        <Paragraph>
          <a href="">{blog.url}</a>
        </Paragraph>
        <Paragraph>
          {blog.likes} likes
          <Button onClick={() => handleLike(blog)}>like</Button>
        </Paragraph>
        <Paragraph>
          added by <strong>{blog.user.name}</strong>
        </Paragraph>
        {loggedUser.id === blog.user.id && (
          <Button variant="danger" onClick={() => handleDelete(blog)}>
            remove
          </Button>
        )}
      </div>

      <CommentList blog={blog} />
    </BlogCard>
  );
};

export default Blog;
