import React from "react";
import { View, Text, StyleSheet, FlatList, Linking } from "react-native";
import firebase from "firebase";
export default function Reviews() {
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
    <View style={styles.container}>
      <View style={styles.container}></View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.songName}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL(item.url)}
            >
              {item.songName} - {item.artist}
            </Text>
          </View>
        )}
      />
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
