import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import AuthNavigation from "./AuthNavigation";

export default function App() {
  return <AuthNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#000000",
  },
});
