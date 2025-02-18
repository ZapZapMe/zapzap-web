import React from 'react';
import { LogOut } from 'lucide-react';
import useLogout from '../hooks';

import ZZButton from '../../../ui/ZZButton';

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <ZZButton variant="outline-light" size="sm" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      Log Out
    </ZZButton>
  );
};

export default LogoutButton;
