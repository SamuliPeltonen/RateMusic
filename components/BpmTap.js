import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
export default function BpmTap() {
  const [timeArray, setTimeArray] = React.useState([]);

  //This function is just used to reset the calculation with a button
  const resetBPM = () => {
    setTimeArray([]);
  };

  //BPM calculation consists of appending dates to an array
  //The first and last items of the array are then used to calculate 
  const calculateBPM = () => {
    timeArray.push(new Date());
    console.log(timeArray.length);
    if (timeArray.length === 11) {
      const firstDate = timeArray[0];
      const lastDate = timeArray[timeArray.length - 1];
      const diff = (lastDate.getTime() - firstDate.getTime()) / 1000;
      Alert.alert(
        "The BPM of the song is:",
        `${(60 / diff) * 10} Beats Per Minute`
      );
      //After alerting the user of the song's BPM, we can reset the array
      setTimeArray([]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tap the button to get a song's tempo</Text>
      <View style={styles.buttonContainer}>
        <Button title="Tap to the Rhythm of the Song" onPress={calculateBPM} />
      </View>
      <Button
        title="Reset taps"
        buttonStyle={{
          backgroundColor: "#CD5C5C",
        }}
        onPress={resetBPM}
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonContainer: {
    paddingBottom: 25,
  },
});
