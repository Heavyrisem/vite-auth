import React, { useContext } from 'react';

import tw from 'twin.macro';

import { AuthContext } from '@contexts/AuthContext';

const LoggedInRouter: React.FC = () => {
  const { user, updateToken } = useContext(AuthContext);

  const handleLogoutClick = () => {
    updateToken(null);
  };

  return (
    <div>
      <div css={tw`my-2`}>LoggedInRouter</div>
      <span
        onClick={handleLogoutClick}
        css={tw`text-lg px-3.5 py-1.5 bg-purple-500 border-2 rounded-lg text-white border-purple-500 cursor-pointer duration-200 hover:text-purple-500 hover:bg-white`}
      >
        Logout
      </span>
      <div css={tw`mt-4`}>
        <div css={tw`text-xl`}>Logged In Account: {user?.email}</div>
        <div>
          Roles: <pre>{JSON.stringify(user?.role, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
};

export default LoggedInRouter;
