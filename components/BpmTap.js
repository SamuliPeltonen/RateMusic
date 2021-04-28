import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
export default function BpmTap() {
  const [firstPress, setFirstPress] = React.useState(true);
  const [tapCount, setTapCount] = React.useState(0);
  const [timeArray, setTimeArray] = React.useState([]);
  const calculateTaps = () => {
    console.log("timer ended");
  };

  const calculateBPM = () => {
      timeArray.push(new Date());
      console.log(timeArray.length)
      if(timeArray.length===11){
          const firstDate = timeArray[0]
          const lastDate = timeArray[timeArray.length-1]
          const diff = (lastDate.getTime() - firstDate.getTime()) / 1000
          console.log(diff)
          Alert.alert("The BPM of the song is:", `${(60 /diff * 10)} Beats Per Minute`)
          setTimeArray([])
      }
  };
  return (
    <View style={styles.container}>
      <Button title="Tap to the Rhythm of the Song" onPress={calculateBPM} />
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
