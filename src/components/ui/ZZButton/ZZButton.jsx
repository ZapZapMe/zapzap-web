import React from 'react';
import Button from 'react-bootstrap/Button';
import './ZZButton.scss';

const ZZButton = ({ icon, onClick, children, className = '', ...props }) => {
  return (
    <Button className={`btn-zapzap ${className}`} onClick={onClick} {...props}>
      {icon}
      {children}
    </Button>
  );
};

export default ZZButton;
