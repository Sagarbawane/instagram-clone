import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Users } from "../../data/user";
import { ScrollView } from "react-native";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Users.map((ele, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image source={{ uri: ele.image }} style={styles.story} />
            <Text style={{ color: "#ffffff", textAlign: "center" }}>
              {ele.user.length > 11
                ? ele.user.slice(0, 6).toLowerCase() + "..."
                : ele.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 18,
    margin: 6,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});
