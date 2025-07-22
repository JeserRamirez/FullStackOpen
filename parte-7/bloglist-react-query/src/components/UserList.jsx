import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../services/users';
import {
  Table,
  TableHeader,
  TableRow,
  TableData,
  StyledLink,
  Title,
} from '../styles';

const UserList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Service unavailable</div>;

  const users = data;

  return (
    <div>
      <Title>Users</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>User</TableHeader>
            <TableHeader>Blogs Created</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableData>
                <StyledLink to={`/users/${user.id}`}>
                  {user.username}
                </StyledLink>
              </TableData>
              <TableData>{user.blogs.length}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
