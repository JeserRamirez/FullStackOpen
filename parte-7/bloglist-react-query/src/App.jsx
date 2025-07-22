import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  loadUserFromStorage,
  useUserDispatch,
  useUserValue,
} from './reducers/UserContextReducer';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import LoginView from './components/LoginView';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import Menu from './components/Menu';
import { Title } from './styles';

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  const blogFormRef = useRef();

  useEffect(() => {
    loadUserFromStorage(userDispatch);
  }, []);

  if (!user) {
    return (
      <>
        <LoginView />
      </>
    );
  }

  return (
    <div>
      <Menu loggedUser={user} />
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Title>Blog App</Title>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} user={user} />
              </Togglable>
              <BlogList user={user} />
            </>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <>
              <Title>Blog App</Title>
              <Blog loggedUser={user} />
            </>
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
