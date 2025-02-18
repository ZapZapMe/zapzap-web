import React from 'react';
import Button from 'react-bootstrap/Button';
import './BootstrapIconButton.scss';

const BootstrapIconButton = ({
  icon,
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <Button className={`zz-custom ${className}`} onClick={onClick} {...props}>
      {icon}
      {children}
    </Button>
  );
};

export default BootstrapIconButton;
