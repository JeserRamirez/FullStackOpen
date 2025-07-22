import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  setNotification,
  useNotificationDispatch,
} from '../reducers/NotificationContextReducer';
import { update, deleteBlog, getAll } from '../services/blogs';
import { Link } from 'react-router-dom';
import { BlogLink, BlogListContainer, BlogListItem } from '../styles';

const Blog = ({ blog, loggedUser }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateLikesMutation = useMutation({
    mutationFn: update,
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
        ...blog,
        likes: blog.likes + 1,
      },
      {
        onSuccess: () => {
          setNotification(
            notificationDispatch,
            `you voted '${blog.title}`,
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {loggedUser.id === blog.user.id && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

const BlogList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = data;

  return (
    <BlogListContainer>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogListItem key={blog.id}>
            <BlogLink to={`/blogs/${blog.id}`}>
              {blog.title} — {blog.author}
            </BlogLink>
          </BlogListItem>
        ))}
    </BlogListContainer>
  );
};

export default BlogList;
