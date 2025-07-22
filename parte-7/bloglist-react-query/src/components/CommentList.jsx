import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../services/blogs';
import {
  Button,
  Comment,
  CommentListContainer,
  Form,
  Input,
  Title,
} from '../styles';

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient();
  const { id } = blog;

  const newCommentMutation = useMutation({
    mutationFn: (comment) => createComment(id, comment),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);

      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );

      queryClient.setQueryData(['blogs'], updatedBlogs);
    },
  });

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    newCommentMutation.mutate(comment);
    event.target.comment.value = '';
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Input type="text" name="comment" />
      <Button>add comment</Button>
    </Form>
  );
};

const CommentList = ({ blog }) => {
  const { comments } = blog;

  return (
    <CommentListContainer>
      <Title>Comments</Title>

      <CommentForm blog={blog} />

      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <Comment key={index}>{comment}</Comment>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </CommentListContainer>
  );
};

export default CommentList;
