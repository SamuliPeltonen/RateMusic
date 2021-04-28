import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Linking, Button } from "react-native";
import firebase from "firebase";
import Review from "./Review";
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
    <View style={styles.container}>
      <View style={styles.container}></View>
      
      
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.songName}
          renderItem={({ item }) => (
            <Text style={{color:'blue'}} onPress={() => navigation.navigate('Review', item)}>
            {item.artist} - {item.songName}
            </Text>
            
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
