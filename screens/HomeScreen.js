import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import { Posts } from "../data/post";
import BottomTab, { bottomTabIcons } from "../components/home/BottomTab";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }))
      );
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />

      <ScrollView>
        {posts.map((ele, index) => {
          return <Post post={ele} key={index} />;
        })}
      </ScrollView>
      <BottomTab icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
