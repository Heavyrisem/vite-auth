import React, { useCallback, useContext } from 'react';

import axios from 'axios';
import tw from 'twin.macro';

import { AuthContext, ROLE } from '@contexts/AuthContext';

const LoggedInRouter: React.FC = () => {
  const { user, updateToken, token } = useContext(AuthContext);

  const handleLogoutClick = () => {
    updateToken(null);
  };

  const handleAdminClick = useCallback(() => {
    if (user && token) {
      axios.request({
        method: 'GET',
        headers: {
          Authorization: token,
        },
        url: '/api/test/admin',
      });
    }
  }, [token, user]);

  if (!user) return null;
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
        <div css={tw`text-xl`}>Logged In Account: {user.email}</div>
        <div>
          Roles: <pre>{JSON.stringify(user.role, null, 4)}</pre>
        </div>

        {user.role.find((userRole) => userRole.name === ROLE.ADMIN) && (
          <button
            type="button"
            css={tw`block text-lg px-3.5 py-1.5 bg-red-500 border-2 rounded-lg text-white border-red-500 cursor-pointer duration-200 hover:text-red-500 hover:bg-white `}
            onClick={handleAdminClick}
          >
            Admin용 버튼
          </button>
        )}

        {user.role.find((userRole) => userRole.name === ROLE.DEFAULT) && (
          <button
            type="button"
            css={tw`block text-lg px-3.5 py-1.5 bg-green-500 border-2 rounded-lg text-white border-green-500 cursor-pointer duration-200 hover:text-green-500 hover:bg-white `}
          >
            User용 버튼
          </button>
        )}
      </div>
    </div>
  );
};

export default LoggedInRouter;
