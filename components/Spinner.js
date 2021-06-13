import { string } from "prop-types";
import { number } from "prop-types";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner = ({ size, color }) => (
  <View style={{ borderRadius: 100, height: size, width: size }}>
    <ActivityIndicator size="large" color={color} />
  </View>
);
Spinner.propTypes = {
  size: number,
  color: string,
};
Spinner.defaultProps = {
  size: 60,
  color: "#000",
};
export default Spinner;
