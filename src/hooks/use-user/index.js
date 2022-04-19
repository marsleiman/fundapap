import React, { createContext, useContext, useEffect, useState } from 'react';
 
const initialState = {
  user: {},
  accessToken: undefined,
};
 
const UserContext = createContext(initialState);
 
export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(localStorage.getItem('user'));
 
  function handleAccessTokenChange() {
    if (!user && accessToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user', user);
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('access_token');
      setUser({});
    }
  }
 
  useEffect(() => {
    handleAccessTokenChange();
  }, [user, accessToken]);
 
  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);
