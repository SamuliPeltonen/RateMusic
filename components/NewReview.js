import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import firebase from "firebase";

export default function NewReview() {
  //States for different review-attributes
  //Using a single object would be more elegant, but there aren't too many states so this is simpler
  const [url, setUrl] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [review, setReview] = React.useState("");
  const [thumbnailUrl, setThumbnailUrl] = React.useState("");
  const [songName, setSongName] = React.useState("");
  const firebaseConfig = {
    //firebase config here

  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  firebase.database().ref("reviews/");

  //This  function fetches the thumbail-url from the spotify oembed api
  //In addition, it also pushes the review to firebase
  const fetchThumbnail = (url) => {
    const uri = url.substring(
      url.lastIndexOf("/track/") + 1,
      url.lastIndexOf("?")
    );
    fetch(`https://open.spotify.com/oembed?url=${url}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(thumbnailUrl + " " + songName);
        firebase.database().ref("reviews/").push({
          url: url,
          artist: artist,
          review: review,
          thumbnailUrl: data.thumbnail_url,
          songName: data.title,
        });
        console.log("ASLDKJASLKADJ")
        setReview("")
        setArtist("")
        setUrl("")
      })
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
          value={artist}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Type in your review"
          label="REVIEW"
          onChangeText={(review) => setReview(review)}
          value={review}
        />
      </View>

      <Button title="Leave a review!" onPress={() => fetchThumbnail(url)} />
      <View>
        <Text>
          Hint: To get the spotify-URL, click on 'Share' and 'Copy Link'
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignContent: "center",
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
