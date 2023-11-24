import { ReactNode, createContext, useContext, useState } from 'react';
import {
  // useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { firebaseAuthProvider } from "./auth";

export interface User {
  email: string;
  password: string;
  name?: string;
  terms?: boolean;
}

interface AuthContextType {
  user: User;
  signin: (user: User, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signup = (newUser: User, callback: VoidFunction) => {
    console.log(newUser)
    return firebaseAuthProvider.signup(newUser, () => {
      setUser(newUser);
      callback();
    });
  };

  const signin = (newUser: User, callback: VoidFunction) => {
    console.log(newUser)
    return firebaseAuthProvider.signin(newUser, () => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return firebaseAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signup, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
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

export function RequireAuth({ children }: { children?: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
