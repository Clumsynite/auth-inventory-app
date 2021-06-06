import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

export default function Login() {
  const navigation = useNavigation();
  const goToSignupScreen = () => navigation.navigate("Signup");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20 }}>Login Screen</Text>
      <View>
        <Button
          title="Create New Account"
          onPress={goToSignupScreen}
          type="clear"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
