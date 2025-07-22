import { useDispatch } from 'react-redux';
import { commentOnBlog } from '../reducers/blogReducer';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value.trim();
    if (!comment) return;

    dispatch(commentOnBlog(blog.id, comment));
    event.target.comment.value = '';
  };

  return (
    <Form onSubmit={handleCommentSubmit} className="mb-3">
      <Form.Group controlId="comment">
        <Form.Control
          type="text"
          name="comment"
          placeholder="Write a comment"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add comment
      </Button>
    </Form>
  );
};

const CommentList = ({ blog }) => {
  const { comments } = blog;

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Comments</Card.Title>

        <CommentForm blog={blog} />

        {comments && comments.length > 0 ? (
          <ListGroup variant="flush">
            {comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No comments yet.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentList;
