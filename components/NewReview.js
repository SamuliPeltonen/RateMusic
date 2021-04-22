import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Image } from "react-native";

export default function NewReview() {
  const [url, setUrl] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [review, setReview] = React.useState("");
  const [thumbnailUrl, setThumbnailUrl] = React.useState("");
  const [songName, setSongName] = React.useState("");

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
        console.log(thumbnailUrl + " " + songName)   
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.textinput}
        placeholder="Spotify url"
        onChangeText={(url) => setUrl(url)}
      /></View>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.textinput}
        placeholder="Artist Name"
        onChangeText={(artist) => setArtist(artist)}
      /></View>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.textinput}
        placeholder="Review"
        onChangeText={(review) => setReview(review)}
      /></View>
      
      <Button title="Leave a review!" onPress={() => fetchThumbnail(url)} />
      <View>
        <Image
        style={styles.albumArt}
          source={{ uri: `${thumbnailUrl}` }}
        />
        <Text>{`${artist} - ${songName}`}</Text>
        <Text style={styles.textwidth}>{review}</Text>
      </View>
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
  textinput: {
    maxWidth: 110,
    borderColor: "black",
    borderWidth: 1,
  },
  albumArt: {
      width:200,
      height:200
  },
  textwidth: {
      maxWidth: 225,
      paddingBottom: 25,
      paddingTop:25
  },
  inputContainer: {
    paddingBottom: 8
  }
});
