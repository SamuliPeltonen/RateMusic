import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  Button,
} from "react-native";
import firebase from "firebase";
import Review from "./Review";
import { ListItem, Avatar } from "react-native-elements";
export default function Reviews({ navigation }) {
  const [reviews, setReviews] = React.useState([]);
  const firebaseConfig = {
    //CONFIG HERE
  };
  React.useEffect(() => {
    firebase
      .database()
      .ref("reviews/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const revs = Object.values(data);
        setReviews(revs);
        console.log(reviews);
      });
  }, []);
  return (
    <View>
      {reviews.map((l, i) => (
        <ListItem
          key={i}
          bottomDivider
          style={{ padding: StyleSheet.hairlineWidth }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
