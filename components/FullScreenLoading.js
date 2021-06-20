import { object, string } from "prop-types";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const TranslucentLoader = ({ color, message, messageStyle }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View>
      <ActivityIndicator size="large" color={color} />
      {message && <Text style={messageStyle}>{message}</Text>}
    </View>
  </View>
);

TranslucentLoader.propTypes = {
  color: string,
  message: string,
  messageStyle: object,
};
TranslucentLoader.defaultProps = { color: "#000" };

export default TranslucentLoader;
