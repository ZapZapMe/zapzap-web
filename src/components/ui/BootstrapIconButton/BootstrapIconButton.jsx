import React from 'react';
import Button from 'react-bootstrap/Button';
import './BootstrapIconButton.scss';

const BootstrapIconButton = ({ icon, onClick, children, ...props }) => {
  return (
    <Button className="zz-custom" onClick={onClick} {...props}>
      {icon}
      {children}
    </Button>
  );
};

export default BootstrapIconButton;
