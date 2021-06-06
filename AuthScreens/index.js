/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup";

const Stack = createStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default AuthScreens;
