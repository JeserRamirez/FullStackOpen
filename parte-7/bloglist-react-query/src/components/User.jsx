import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAllUsers } from '../services/users';
import {
  UserContainer,
  Title,
  BlogListContainer,
  BlogListItem,
} from '../styles';

const User = () => {
  const { id } = useParams();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading user...</div>;
  if (isError) return <div>Error loading user</div>;

  const user = users.find((u) => u.id === id);
  if (!user) return <div>User not found</div>;

  return (
    <UserContainer>
      <Title>{user.username}</Title>
      <h3>Added blogs</h3>
      <BlogListContainer>
        {user.blogs.map((blog) => (
          <BlogListItem key={blog.id}>{blog.title}</BlogListItem>
        ))}
      </BlogListContainer>
    </UserContainer>
  );
};

export default User;
