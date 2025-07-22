import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/authUserReducer';
import Notification from './Notification';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const LoginForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        name="username"
        data-testid="username"
        placeholder="Enter username"
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        name="password"
        data-testid="password"
        placeholder="Enter password"
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Login
    </Button>
  </Form>
);

const LoginView = () => {
  const dispatch = useDispatch();
  const [loginVisible, setLoginVisible] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    dispatch(loginUser({ username, password }));

    event.target.username.value = '';
    event.target.password.value = '';
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h2 className="mb-4 text-center">Log in to application</h2>
              <Notification />
              {loginVisible ? (
                <>
                  <LoginForm handleSubmit={handleLogin} />
                  <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={() => setLoginVisible(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setLoginVisible(true)} variant="primary">
                  Log in
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
