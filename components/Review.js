import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  Share,
  TouchableHighlight,
} from "react-native";
export default function Review({ route, navigation }) {
  //A single review is given as a parameter via navigation. 
  const review = route.params;
  
  //This function is for sharing the song (e.g. whatsapp, sms...)
  const onShare = async () => {
    const results = await Share.share({
      message: `I reviewed ${review.songName} by ${review.artist}. This is what I thought: ${review.review} 
      
I really think you would like the song as well!`,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>
          {review.artist} - {review.songName}
        </Text>
        <Image
          style={styles.albumArt}
          source={{ uri: `${review.thumbnailUrl}` }}
        />
        <Text style={styles.textwidth}>{review.review}</Text>
        <View></View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => Linking.openURL(review.url)}>
            <Image
              style={styles.playButton}
              source={require("../assets/spotifyPlay.png")}
            />
          </TouchableHighlight>
        </View>
        <Button title="Share the Review" onPress={onShare} />
      </ScrollView>
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
  header: {
    fontSize: 25,
  },
  playButton: {
    width: 180,
    height: 60,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
