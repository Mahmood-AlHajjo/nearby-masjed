import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mosques from "@screens/Mosques";
import MosquesMap from "@screens/MosquesMap";
import AppBar from "@components/layout/AppBar";

const HomeStack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Mosques"
      screenOptions={{
        header: ({ navigation, route, options, back }) => <AppBar navigation={navigation} route={route} options={options} back={back} />
      }}
    >
      <HomeStack.Screen
        name="Mosques"
        headerTitle="Nearby Mosques"
        component={Mosques}
        options={{
          headerTitle: "Nearby Mosques"
        }}
      />
      <HomeStack.Screen
        name="Mosques Map"
        component={MosquesMap}
        options={{
          headerTitle: "Map Mosques",
        }}
      />
    </HomeStack.Navigator>
  );
}
