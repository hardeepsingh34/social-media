import React, { createContext, useState } from 'react';

// Step 1: Create the context
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  // Step 2: Create the state you want to share
  const [user, setUser] = useState({
    email: '',
    username: ''
  });

  // Step 3: Provide the context value
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
