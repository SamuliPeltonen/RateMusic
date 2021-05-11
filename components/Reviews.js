import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  Button,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import { ListItem, Avatar } from "react-native-elements";
export default function Reviews({ navigation }) {
  const [reviews, setReviews] = React.useState([]);
  const firebaseConfig = {
    //firebase config here

  };

  //useEffect populates a list of reviews by getting all reviews from firebase

  React.useEffect(() => {
    firebase
      .database()
      .ref("reviews/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const revs = Object.values(data);
        setReviews(revs);
      });
  }, []);
  return (
    <ScrollView>
      {reviews.map((l, i) => (
        <ListItem
          key={i}
          bottomDivider
          style={{ padding: StyleSheet.hairlineWidth }}
          //We send a single review (in  this case l) to Review.js if the user navigates to a review-page
          onPress={() => navigation.navigate("Review", l)}
        >
          <Avatar source={{ uri: l.thumbnailUrl }} />
          <ListItem.Content>
            <ListItem.Title>
              {l.artist} - {l.songName}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textwidth: {
    maxWidth: 225,
    paddingBottom: 25,
    paddingTop: 25,
  },
});
