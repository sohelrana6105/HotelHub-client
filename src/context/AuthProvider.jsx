import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";

import { auth } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  //  all state here
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user / Sign Up
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn User or Login User
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // SignIn with google
  const signInGoogleUser = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const signOutUser = () => {
    return signOut(auth);
  };

  // hold the user untill logout the user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const updateUserProfile = (updateName, updatePhotoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: updatePhotoUrl,
    });
  };

  // User info
  const userInfo = {
    createUser,
    signInUser,
    signInGoogleUser,
    signOutUser,
    user,
    setUser,
    loading,
    updateUserProfile,
  };
  return <Authcontext value={userInfo}>{children}</Authcontext>;
};

export default AuthProvider;
