import React from 'react';
import { LogOut } from 'lucide-react';
import useLogout from '../hooks';

import BootstrapIconButton from '../../../ui/BootstrapIconButton';

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <BootstrapIconButton variant="outline-light" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      Log Out
    </BootstrapIconButton>
  );
};

export default LogoutButton;
