import { signInWithEmailAndPassword } from "firebase/auth";
import { User } from './AuthProvider';
import { auth } from '../firebase';

const firebaseAuthProvider = {
  isAuthenticated: false,
  signin(newUser: User, callback: VoidFunction) {
    signInWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential)
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error): void => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });



    firebaseAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // firebase async
  },
  signout(callback: VoidFunction) {
    firebaseAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { firebaseAuthProvider };
