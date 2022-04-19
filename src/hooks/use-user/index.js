import React, { createContext, useContext, useEffect, useState } from 'react';
 
const initialState = {
  user: {},
  accessToken: undefined,
};
 
const UserContext = createContext(initialState);
 
export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
 
  function handleAccessTokenChange() {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
      setUser({});
    }
  }

  function handleUserChange() {
    if (user && user.name) {
      localStorage.setItem('user', JSON.stringify(user));
      //localStorage.setItem('user', user);
    } else {
      // Log Out
      localStorage.removeItem('user');
    }
  }
 
  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);

  useEffect(() => {
    handleUserChange();
  }, [user]);
 
  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);
