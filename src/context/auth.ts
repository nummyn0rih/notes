import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from './AuthProvider';
import { auth } from '../firebase';

const firebaseAuthProvider = {
  isAuthenticated: false,

  signup(newUser: User, callback: VoidFunction) {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        // Signed up
        console.log('userCredential === ', userCredential)

        const user = userCredential.user;
        console.log('user === ', user)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)

        // ..
      });

      firebaseAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // firebase async
  },

  signin(newUser: User, callback: VoidFunction) {
    signInWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        // Signed in 
        console.log('userCredential === ', userCredential)
        const user = userCredential.user;
        console.log('user === ', user)
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
    signOut(auth).then(() => {
      console.log('singout OK!')
      firebaseAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    }).catch((error) => {
      console.log(error)
    });
  },
};

export { firebaseAuthProvider };
