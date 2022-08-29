import React, { createContext, useCallback, useEffect, useState } from 'react';

import { Buffer } from 'buffer';

const TOKEN_KEY = 'token';

export interface UserType {
  id: number;
  email: string;
  role: { name: string; description: string }[];
}

interface AuthContextState {
  token: string | null;
  user?: UserType;
  updateToken: (token: AuthContextState['token']) => void;
}

export const AuthContext = createContext<AuthContextState>({
  token: null,
  user: undefined,
  updateToken: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(window.localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const payload = token?.split('.')[1];
    if (payload) {
      try {
        const parsedUser = JSON.parse(Buffer.from(payload, 'base64').toString());
        setUser(parsedUser);
      } catch (err) {
        console.error('Cannot parse JWT token', err);
      }
    }
  }, [token]);

  const updateToken = useCallback((newToken: AuthContextState['token']) => {
    if (newToken) window.localStorage.setItem(TOKEN_KEY, newToken);
    else window.localStorage.removeItem(TOKEN_KEY);
    setToken(newToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, updateToken }}>{children}</AuthContext.Provider>
  );
};
