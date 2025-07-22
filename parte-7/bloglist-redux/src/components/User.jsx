import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeUsers } from '../reducers/userReducer';

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: users, loading, error } = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers());
    }
  }, [dispatch, users.length]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error loading user: {error}</div>;
  if (!user) return <div>Loading user data...</div>;

  return (
    <div>
      <h1>User</h1>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
