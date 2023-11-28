import { ReactNode, createContext, useContext, useState } from 'react';
import {
  // useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from '../firebase';

export interface User {
  email: string;
  password: string;
  name?: string;
  terms?: boolean;
}

interface AuthContextType {
  user: FirebaseUser;
  signup: (email: string, password: string, callback: VoidFunction) => void;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const signup = (email: string, password: string, callback: VoidFunction) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user === ', user);
        setUser(user)
        callback();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };

  const signin = (email: string, password: string, callback: VoidFunction) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user === ', user)
        setUser(user);
        callback();
      })
      .catch((error): void => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };

  const signout = (callback: VoidFunction) => {
    return signOut(auth)
      .then(() => {
        console.log('singout OK!')
        setUser(null);
        callback();
      }).catch((error) => {
        console.log(error)
      });
  };

  const value = { user, signup, signin, signout };

  // @ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children?: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}

// function AuthStatus() {
//   const auth = useAuth();
//   const navigate = useNavigate();

//   if (!auth.user) {
//     return <p>You are not logged in.</p>;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button
//         onClick={() => {
//           auth.signout(() => navigate("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// }
