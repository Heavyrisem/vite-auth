import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { Buffer } from 'buffer';
import * as jose from 'jose';

const TOKEN_KEY = 'token';

export enum ROLE {
  DEFAULT = 'default',
  ADMIN = 'admin',
}

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
  const PUBLIC_KEY = useMemo(
    async () =>
      jose.importSPKI(
        Buffer.from(
          'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyN0xvUlFOd2dDQ3AvclFFVnM2VQp1dzJINzEwZVFySTBNRkFDcHB3M2l5cGdpRDA3eXZxQ0U2VmFuK01ucWVvZzFmV3NNNnZsOHJKdHdnZ2tLdUNXCjlhTW0wV0ZDTG5IVFF4NWZESjlIWVdOWkZ5dEpCSjlwY25KeWprWHpYYU1WUVU2aGY4RlBoUmF4ajZzaXNpRXcKL2N5RE5vUXNPM3JITXlDaHZoakZDNFVaNkxrWmFLQ2duVVVLbHQ2S3I4bzBGNGRHV1NkWXpvMGZraHFBdHpPWgpuVzFuL2hjUnlFZlJsNnJBOHJtME9wWVo0d3dVUjI0RENSb1RoOHJhTWRMUXNtajB1alZLN3hkZ2NHaldobG9jClV0NzZDV3ptSUJ4VjhtNWoxS1JzMG1iQTFBcTBvdG9YSHdrVU1ReUsrTW5SVG9RM25vTjRCbTJsZFE1aGZpeSsKTlFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==',
          'base64',
        ).toString(),
        'RS256',
      ),
    [],
  );

  useEffect(() => {
    if (token) {
      PUBLIC_KEY.then((key) => {
        jose
          .jwtVerify(token, key)
          .then((res) => {
            const parsedUser = jose.decodeJwt(token) as unknown as UserType;
            setUser(parsedUser);
            console.log(res, parsedUser);
          })
          .catch((err) => {
            console.error('Cannot parse JWT token', err);
            setUser(undefined);
          });
      });
    }

    if (token === null) setUser(undefined);
  }, [PUBLIC_KEY, token]);

  const updateToken = useCallback((newToken: AuthContextState['token']) => {
    if (newToken) window.localStorage.setItem(TOKEN_KEY, newToken);
    else window.localStorage.removeItem(TOKEN_KEY);
    setToken(newToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, updateToken }}>{children}</AuthContext.Provider>
  );
};
