import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useNavigate, useParams } from 'react-router-dom';

import CommentList from './CommentList';

import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';

const Blog = ({ loggedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: blogs, loading, error } = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlogs());
    }
  }, [dispatch, blogs.length]);

  if (loading)
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Loading blog...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error loading blog: {error}</Alert>
      </Container>
    );

  if (!blog)
    return (
      <Container className="mt-4">
        <p>Loading blog data...</p>
      </Container>
    );

  const handleRemove = async () => {
    const confirm = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`
    );
    if (!confirm) return;

    try {
      await dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`Blog "${blog.title}" deleted`, 'success', 5));
      navigate('/');
    } catch (error) {
      dispatch(
        setNotification(error.message || 'Failed to delete blog', 'error', 5)
      );
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {blog.author}
          </Card.Subtitle>
          <Card.Text>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </Card.Text>
          <Card.Text>
            {blog.likes} likes{' '}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => dispatch(likeBlog(blog))}
            >
              like
            </Button>
          </Card.Text>
          <Card.Text>added by {blog.user.name}</Card.Text>
          {loggedUser.id === blog.user.id && (
            <Button variant="danger" size="sm" onClick={handleRemove}>
              remove
            </Button>
          )}
        </Card.Body>
      </Card>

      <div className="mt-4">
        <CommentList blog={blog} />
      </div>
    </Container>
  );
};

export default Blog;
