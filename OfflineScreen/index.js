import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Offline from "./Offline";

const Stack = createStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator initialRouteName="Offline">
      <Stack.Screen name="Offline" component={Offline} />
    </Stack.Navigator>
  );
}

export default AuthScreens;
