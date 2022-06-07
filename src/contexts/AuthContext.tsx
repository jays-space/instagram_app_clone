import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth, Hub} from 'aws-amplify';
import {HubCallback} from '@aws-amplify/core';

type CurrentUserType = CognitoUser | null | undefined;

type AuthContextType = {
  currentUser: CurrentUserType;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
});

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(undefined);

  const checkAuthenticatedUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setCurrentUser({...authUser});
    } catch (e) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkAuthenticatedUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setCurrentUser(null);
      }

      if (event === 'signIn') {
        checkAuthenticatedUser();
      }
    };
    Hub.listen('auth', listener);

    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
