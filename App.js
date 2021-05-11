import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NewReview from "./components/NewReview";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BpmTap from "./components/BpmTap";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "New Review") {
            iconName = "file-document-edit-outline";
          } else if (route.name === "All Reviews") {
            iconName = "format-list-bulleted";
          } else if (route.name === "BPM Tap") {
            iconName = "metronome";
          }
          return (
            <View>
              <MaterialCommunityIcons name={iconName} size={size} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="New Review" component={NewReview} />
      <Tab.Screen name="All Reviews" component={StackNav} />
      <Tab.Screen name="BPM Tap" component={BpmTap} />
    </Tab.Navigator>
  );
}
function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TabNav></TabNav>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
