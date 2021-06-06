import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function Inventory() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20 }}>Inventory Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
