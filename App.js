import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NewReview from "./components/NewReview";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="New Review" component={NewReview} />
      <Tab.Screen name="All Reviews" component={StackNav} />
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
        <TabNav>

        </TabNav>
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
