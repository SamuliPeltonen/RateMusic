import React from 'react'
import { View, Text, Button, StyleSheet, Image, Linking } from 'react-native'
export default function Review({route, navigation}) {
  const review = route.params
  console.log(review)
    return (
    <View style={styles.container}>
      <Text>{review.artist} - {review.songName}</Text>
      <Image style={styles.albumArt} source={{ uri: `${review.thumbnailUrl}` }} />
      <Text>{review.review}</Text>
      <Text style={{color:'blue'}} onPress={() => Linking.openURL(review.url)}>
          Play on Spotify!
        </Text>
      
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
      width: 250,
      height: 250,
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
  