import React from 'react';
import Form from 'react-bootstrap/Form';
import './BootstrapCheck.scss';

const BootstrapCheck = () => {
  return (
    <Form.Check // prettier-ignore
      type="checkbox"
      label="Check me out"
    />
  );
};

export default BootstrapCheck;
