import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function OfflineScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, flexShrink: 1 }}>
          Your device is currently offline!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
