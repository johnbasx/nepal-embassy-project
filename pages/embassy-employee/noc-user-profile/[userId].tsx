import pageTitleStore from '@store/selectUsersStore';
import React, { useEffect } from 'react';

const NocUserProfile = () => {
  const { setPageTitle } = pageTitleStore();

  useEffect(() => {
    setPageTitle('NOC User profile');
  }, []);
  return <div>NocUserProfile</div>;
};

export default NocUserProfile;
