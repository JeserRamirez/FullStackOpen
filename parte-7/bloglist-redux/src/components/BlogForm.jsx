import { useDispatch, useSelector } from 'react-redux';
import { createBlog, update } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const BlogForm = ({ user, toggleVisibility }) => {
  const dispatch = useDispatch();
  const { data: blogs } = useSelector((state) => state.blogs);

  const addBlog = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    const existingBlog = blogs.find(
      (b) => b.title.toLowerCase().trim() === title.toLowerCase().trim()
    );

    try {
      if (existingBlog) {
        if (existingBlog.user.id === user.id) {
          const ok = window.confirm(
            `The blog "${title}" already exists. Do you want to update it?`
          );
          if (!ok) return;

          const updatedBlog = {
            ...existingBlog,
            title,
            author,
            url,
          };

          await dispatch(update(updatedBlog));
          dispatch(
            setNotification(
              `The blog "${title}" has been updated successfully`,
              'success',
              5
            )
          );
        } else {
          dispatch(
            setNotification(
              `Blog "${title}" already exists and you don't have permission to update it`,
              'error',
              5
            )
          );
        }
      } else {
        await dispatch(createBlog({ title, author, url }));
        dispatch(
          setNotification(
            `A new blog "${title}" by ${author} was added`,
            'success',
            5
          )
        );
      }

      event.target.title.value = '';
      event.target.author.value = '';
      event.target.url.value = '';
      toggleVisibility();
    } catch (error) {
      dispatch(
        setNotification(
          error.response?.data?.error || 'Failed to create/update blog',
          'error',
          5
        )
      );
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Create New Blog</Card.Title>
          <Form onSubmit={addBlog}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Write title here"
                data-testid="title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                name="author"
                placeholder="Write author here"
                data-testid="author"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                name="url"
                placeholder="Write URL here"
                data-testid="url"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogForm;
