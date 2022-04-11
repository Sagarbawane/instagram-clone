import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat/app";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/2x/ffffff/hearts.png",
    likeImageUrl: "https://img.icons8.com/ios-glyphs/2x/fa314a/like.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/glyph-neue/2x/ffffff/speech-bubble.png",
  },
  {
    name: "share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/2x/ffffff/paper-plane.png",
  },
  {
    name: "save",
    imageUrl: "https://img.icons8.com/ios/2x/ffffff/bookmark-ribbon.png",
  },
];

const Post = ({ post }) => {
  const handlelike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth.currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
          : firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        console.log("document updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ marginBottom: 10 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handlelike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,

        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={styles.story} source={{ uri: post.profile_picture }} />
        <Text style={{ color: "#ffffff", marginLeft: 5, fontWeight: "700" }}>
          {post.user}
        </Text>
      </View>
      <Text style={{ color: "#ffffff", fontWeight: "900" }}>. . .</Text>
    </View>
  );
};
const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity
        onPress={() => {
          handleLike(post);
        }}
      >
        <Image
          style={styles.footerIcons}
          source={{
            uri: post.likes_by_users.includes(auth.currentUser.email)
              ? "https://img.icons8.com/color/2x/melting-hert.png"
              : postFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>

      <Icon
        imgStyle={styles.footerIcons}
        imgurl={postFooterIcons[1].imageUrl}
      />
      <Icon
        imgStyle={styles.footerIcons}
        imgurl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View style={{ alignItems: "flex-end", flex: 1 }}>
      <Icon
        imgStyle={styles.footerIcons}
        imgurl={postFooterIcons[3].imageUrl}
      />
    </View>
  </View>
);
const Icon = ({ imgStyle, imgurl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgurl }} />
  </TouchableOpacity>
);
const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 6 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);
const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: "bold", color: "#ffffff" }}>{post.user}</Text>
      <Text style={{ color: "rgba(255,255,255,0.7)" }}> {post.caption}</Text>
    </Text>
  </View>
);
const CommentSection = ({ post, index }) => (
  <View
    style={{
      marginTop: 5,
      marginBottom: 10,
    }}
  >
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comments"}
      </Text>
    )}
  </View>
);
const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "#ffffff" }}>
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
            {comment.user}
          </Text>{" "}
          <Text style={{ color: "rgba(255,255,255,0.7)" }}>
            {" "}
            {comment.comment}
          </Text>
        </Text>
      </View>
    ))}
  </>
);
export default Post;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    margin: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  footerIcons: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
