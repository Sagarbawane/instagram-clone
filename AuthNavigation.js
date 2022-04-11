import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SignedInStack, SignedOutStack } from "./Navigation";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => userHandler(user));
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;

const styles = StyleSheet.create({});
