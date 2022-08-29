import React, { useContext } from 'react';

import { AuthContext } from '@contexts/AuthContext';
import LoggedInRouter from '@routers/logged-in-router';
import LoggedOutRouter from '@routers/logged-out-router';

const App: React.FC = () => {
  const { token: isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) return <LoggedInRouter />;
  return <LoggedOutRouter />;
};

export default App;
