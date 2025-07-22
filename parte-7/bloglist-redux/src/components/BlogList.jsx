import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Link } from 'react-router-dom';

import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
            <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {loggedUser.id === blog.user.id && (
            <button
              onClick={async () => {
                const confirm = window.confirm(
                  `Remove blog "${blog.title}" by ${blog.author}?`
                );
                if (!confirm) return;

                try {
                  await dispatch(deleteBlog(blog.id));
                  dispatch(
                    setNotification(
                      `Blog "${blog.title}" deleted`,
                      'success',
                      5
                    )
                  );
                } catch (error) {
                  dispatch(
                    setNotification(
                      error.message || 'Failed to delete blog',
                      'error',
                      5
                    )
                  );
                }
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const BlogList = () => {
  const dispatch = useDispatch();
  const { data: blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (loading)
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" />
        <p>Loading blogs...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error loading blogs: {error}</Alert>
      </Container>
    );

  if (!blogs)
    return (
      <Container className="mt-4">
        <p>Loading blogs data...</p>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h2>Blogs</h2>
      <ListGroup>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListGroup.Item
              key={blog.id}
              action
              as={Link}
              to={`/blogs/${blog.id}`}
            >
              <strong>{blog.title}</strong> — {blog.author}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
};

export default BlogList;
