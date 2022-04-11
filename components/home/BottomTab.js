import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/2x/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/2x/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/2x/ffffff/search-more.png",
    inactive: "https://img.icons8.com/ios-filled/2x/ffffff/search.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/2x/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/2x/ffffff/instagram-reel.png",
  },
  {
    name: "Shops",
    active:
      "https://img.icons8.com/fluency-systems-filled/2x/ffffff/shop-two.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/2x/ffffff/shop-two--v2.png",
  },
  {
    name: "Profile",
    active:
      "https://img.icons8.com/office/2x/ffffff/circled-user-male-skin-type-1-2.png",
    inactive:
      "https://img.icons8.com/office/2x/ffffff/circled-user-male-skin-type-1-2.png",
  },
];

const BottomTab = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("home");
  const Icon = ({ icon }) => (
    <TouchableOpacity
      onPress={() => {
        setActiveTab(icon.name);
      }}
    >
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={styles.icons}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icons: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "") => ({
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#ffffff",
  }),
});
