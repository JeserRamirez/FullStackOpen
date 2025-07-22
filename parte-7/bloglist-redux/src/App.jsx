import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginView from './components/LoginView';
import Menu from './components/Menu';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';

import { initializeBlogs } from './reducers/blogReducer';
import { loadUserFromStorage } from './reducers/authUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (!user) {
    return <LoginView />;
  }

  return (
    <>
      <Menu loggedUser={user} />
      <Container>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="mt-4 mb-3">Blog App</h1>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm
                    user={user}
                    toggleVisibility={() =>
                      blogFormRef.current.toggleVisibility()
                    }
                  />
                </Togglable>
                <hr />
                <BlogList user={user} />
              </>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <>
                <h1 className="mt-4 mb-3">Blog</h1>
                <Blog loggedUser={user} />
              </>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
