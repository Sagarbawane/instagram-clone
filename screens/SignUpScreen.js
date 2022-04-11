import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
const INSTAGRAM_LOGO = "https://img.icons8.com/color/2x/instagram-new--v2.gifs";
import SignUpForm from "../components/signUpScreen/SignUpForm";
const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
      </View>
      <SignUpForm navigation={navigation} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
