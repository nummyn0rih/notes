import { ReactNode, createContext, useContext } from 'react';
import { useLocation, Navigate, Outlet, } from "react-router-dom";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut
} from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Center, Loader } from '@mantine/core';
import { NotFound } from '../components';

export interface User {
  email: string;
  password: string;
  name?: string;
  terms?: boolean;
}

interface AuthContextType {
  signup: (email: string, password: string, callback: VoidFunction) => void;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);
  
  const signup = (email: string, password: string, callback: VoidFunction) => {
    createUserWithEmailAndPassword(email, password);
    callback();
  };

  const signin = (email: string, password: string, callback: VoidFunction) => {
    signInWithEmailAndPassword(email, password);
    callback();
  };

  const signout = async (callback: VoidFunction) => {
    signOut();
    callback();
  };

  const value = { signup, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children?: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <Center style={{height: "100vh"}}>
        <Loader color="blue" size="xl" type="dots"/>
      </Center>);
  }

  if (error) {
    return <NotFound/>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
