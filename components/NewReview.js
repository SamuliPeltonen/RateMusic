import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  processColor,
  Linking,
} from "react-native";
import { Input } from "react-native-elements";
import firebase from "firebase";
import Constants from "expo-constants";

export default function NewReview() {
  const [url, setUrl] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [review, setReview] = React.useState("");
  const [thumbnailUrl, setThumbnailUrl] = React.useState("");
  const [songName, setSongName] = React.useState("");
  const firebaseConfig = {
    //CONFIG HERE
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  firebase.database().ref("reviews/");
  const fetchThumbnail = (url) => {
    const uri = url.substring(
      url.lastIndexOf("/track/") + 1,
      url.lastIndexOf("?")
    );
    console.log(uri);
    fetch(`https://open.spotify.com/oembed?url=${url}`)
      .then((data) => data.json())
      .then((data) => {
        setThumbnailUrl(data.thumbnail_url);
        setSongName(data.title);
        console.log(thumbnailUrl + " " + songName);
        firebase.database().ref("reviews/").push({
          url: url,
          artist: artist,
          review: review,
          thumbnailUrl: data.thumbnail_url,
          songName: data.title,
        });
        console.log("pushed to db");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Paste the Spotify URL"
          label="SPOTIFY URL"
          onChangeText={(url) => setUrl(url)}
          value={url}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Type in the artist's name"
          label="ARTIST"
          onChangeText={(artist) => setArtist(artist)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Type in your review"
          label="REVIEW"
          onChangeText={(review) => setReview(review)}
        />
      </View>

      <Button title="Leave a review!" onPress={() => fetchThumbnail(url)} />
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex:1,
    alignContent:'center'
  },
  textinput: {
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  reviewInput: {
    width: 200,
    height: 75,
    borderColor: "black",
    borderWidth: 1,
  },
  albumArt: {
    width: 200,
    height: 200,
  },
  textwidth: {
    maxWidth: 225,
    paddingBottom: 25,
    paddingTop: 25,
  },
  inputContainer: {
    paddingBottom: 8,
  },
});
