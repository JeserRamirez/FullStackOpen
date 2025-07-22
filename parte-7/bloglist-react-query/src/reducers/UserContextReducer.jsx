import { createContext, useReducer, useContext } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './NotificationContextReducer';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => useContext(UserContext)[0];
export const useUserDispatch = () => useContext(UserContext)[1];

export const loadUserFromStorage = (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    dispatch({ type: 'SET_USER', payload: user });
  }
};

export const loginUser = async (
  userDispatch,
  credentials,
  notificationDispatch
) => {
  try {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    blogService.setToken(user.token);
    userDispatch({ type: 'SET_USER', payload: user });
  } catch (error) {
    setNotification(
      notificationDispatch,
      error.response?.data?.error || 'Login failed',
      'error',
      5
    );
  }
};

export const logoutUser = (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser');
  blogService.setToken(null);
  dispatch({ type: 'CLEAR_USER' });
};
