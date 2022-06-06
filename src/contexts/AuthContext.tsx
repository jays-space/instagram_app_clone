import React, {
  createContext,
  Dispatch,
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
  setCurrentUser: Dispatch<React.SetStateAction<CurrentUserType>>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(undefined);

  useEffect(() => {
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

    checkAuthenticatedUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setCurrentUser(null);
      }
    };
    Hub.listen('auth', listener);

    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
