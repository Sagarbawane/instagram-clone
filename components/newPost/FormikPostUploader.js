import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { Button } from "react-native-elements";
import validUrl from "valid-url";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL IS REQUIRED"),
  caption: Yup.string().max(2200, "caption has reached max limit"),
});
const PLACEHOLDER_IMG =
  "https://img.icons8.com/glyph-neue/2x/ffffff/image-gallery.png";
const FormikPostUploader = ({ navigation }) => {
  const [thumbnailurl, setThumbnaiurl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setcurrentLoggedInUser] = useState(null);
  const getUserName = () => {
    const user = auth.currentUser;
    const unSubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setcurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unSubscribe;
  };
  useEffect(() => {
    getUserName();
  }, []);
  const uploadedPostToFirebase = (imageUrl, caption) => {
    const unSubscribe = db
      .collection("users")
      .doc(auth.currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: auth.currentUser.uid,
        owner_email: firebase.auth().currentUser.uid,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),

        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unSubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadedPostToFirebase(values.imageUrl, values.caption),
          console.log(values);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: validUrl.isUri(thumbnailurl)
                  ? `${thumbnailurl}`
                  : PLACEHOLDER_IMG,
              }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text>{thumbnailurl}</Text>
              <TextInput
                style={{ color: "#ffff", fontSize: 20 }}
                placeholder="write a caption...."
                placeholderTextColor="grey"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={1} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnaiurl(e.nativeEvent.text)}
            style={{ color: "#ffff", fontSize: 18 }}
            placeholder="Enter Image Url"
            placeholderTextColor="grey"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />

          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <View style={{ marginTop: 10, width: "100%" }}>
            <Button
              color="#f194ff"
              onPress={handleSubmit}
              title="share"
              disabled={!isValid}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
