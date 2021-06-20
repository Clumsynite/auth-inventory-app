import { object, string } from "prop-types";
import React from "react";
import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const TranslucentLoader = ({ color, message, messageStyle }) => (
  <SafeAreaView style={styles.container}>
    <ActivityIndicator size="large" color={color} />
    {message && <Text style={messageStyle}>{message}</Text>}
  </SafeAreaView>
);

TranslucentLoader.propTypes = {
  color: string,
  message: string,
  messageStyle: object,
};
TranslucentLoader.defaultProps = { color: "#000" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TranslucentLoader;
