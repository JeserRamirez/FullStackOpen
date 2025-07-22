import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Collapse, Card } from 'react-bootstrap';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Card className="my-3">
      <Card.Body>
        {!visible && (
          <Button variant="primary" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        )}

        <Collapse in={visible}>
          <div>
            {props.children}
            <Button
              variant="secondary"
              className="mt-3"
              onClick={toggleVisibility}
            >
              Cancel
            </Button>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Togglable;
