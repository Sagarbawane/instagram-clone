import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";
const INSTAGRAM_LOGO = "https://img.icons8.com/color/2x/instagram-new--v2.gifs";

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
    </View>
    <LoginForm navigation={navigation} />
  </View>
);

export default LoginScreen;

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
