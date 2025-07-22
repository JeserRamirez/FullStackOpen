import { useState } from 'react';
import { loginUser, useUserDispatch } from '../reducers/UserContextReducer';
import { useNotificationDispatch } from '../reducers/NotificationContextReducer';
import Notification from './Notification';
import { Container, Title, Input, Button, Form, Paragraph } from '../styles';

const LoginForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Title>Login</Title>
    <label>
      <Paragraph>Username</Paragraph>
      <Input type="text" name="username" data-testid="username" />
    </label>
    <label>
      <Paragraph>Password</Paragraph>
      <Input type="password" name="password" data-testid="password" />
    </label>
    <Button type="submit">Login</Button>
  </Form>
);

const LoginView = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [loginVisible, setLoginVisible] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await loginUser(userDispatch, { username, password }, notificationDispatch);

    event.target.username.value = '';
    event.target.password.value = '';
  };

  return (
    <Container>
      <Notification />
      {loginVisible ? (
        <>
          <LoginForm handleSubmit={handleLogin} />
          <Button variant="danger" onClick={() => setLoginVisible(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Title>Welcome!</Title>
          <Paragraph>login to Start!</Paragraph>
          <Button onClick={() => setLoginVisible(true)}>Iniciar sesión</Button>
        </>
      )}
    </Container>
  );
};

export default LoginView;
